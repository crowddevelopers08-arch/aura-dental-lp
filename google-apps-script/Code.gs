/* ============================================================
   Aura Dental - Google Apps Script (ALL 4 FORMS + FEEDBACK)

   Routing:
     sheetTab === 'Implant Leads'              -> Implant Leads tab
     sheetTab === 'General Dental Leads'       -> General Dental Leads tab
     sheetTab === 'Invisible Aligners Leads'   -> Invisible Aligners Leads tab
     sheetTab === 'VSL Leads'                  -> VSL Leads tab
     source contains '/vsl'                    -> VSL Leads tab  (fallback)
     sheetTab === 'Client Feedback'|'Feedback' -> Feedback tab
     source/pageUrl contains 'feedback'        -> Feedback tab   (fallback)
     everything else                           -> Implant Leads tab

   Lead payload shape (app/api/submit-lead/route.ts):
     { timestamp, name, email, phone, location, treatment, source, sheetTab }

   VSL payload adds (submit-lead + app/api/razorpay/webhook/route.ts):
     { situation, priority, paymentStatus, amount, paymentId, orderId,
       paymentMethod }
   The form submit has no payment fields yet, so its row shows
   'Pending'; the webhook then adds a 'Paid' / 'Failed' row.
   Missing VSL columns are added to an existing tab automatically.

   Feedback payload shape (app/api/feedback/route.ts):
     { timestamp, name, phone, requestCallback: 'Yes'|'No', message,
       branch, pageUrl, source, sheetTab: 'Client Feedback' }

   `source` is now the LIVE PAGE URL (e.g. https://.../client-feedback/kondapur)
   and falls back to a static label only when the browser could not report one.
   `pageUrl` is always the raw live URL or blank - never a label.
   `branch` is 'Kondapur' | 'Madeenaguda' | 'Not specified'.

   Rows are written BY HEADER NAME, not by position, so an existing tab with
   the old column set keeps working and simply leaves new columns blank.
   Run migrateFeedbackSheet() once to add the new columns in place.
   ============================================================ */

var FEEDBACK_TAB = 'Feedback';

var LEAD_HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Location', 'Treatment Concern', 'Source'];
var LEAD_WIDTHS = [170, 170, 220, 130, 150, 220, 260];

var FEEDBACK_HEADERS = ['Timestamp', 'Name', 'Phone', 'Branch', 'Request Callback', 'Message', 'Source', 'Page URL'];
var FEEDBACK_WIDTHS = [170, 170, 130, 140, 150, 300, 260, 260];

var LEAD_TABS = {
  'Implant Leads': '#1D4231',
  'General Dental Leads': '#2E5A45',
  'Invisible Aligners Leads': '#7A6840',
  'VSL Leads': '#8C6D1F'
};

var VSL_TAB = 'VSL Leads';

var VSL_HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone', 'Your Situation', 'Your Priority',
  'Payment Status', 'Amount', 'Payment ID', 'Order ID', 'Payment Method', 'Source'
];
var VSL_WIDTHS = [170, 170, 220, 130, 260, 260, 140, 120, 200, 200, 140, 260];

function authorize() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  // Open the /exec URL in a browser to confirm which version is deployed.
  return _json({ status: 'Aura Dental API is live', version: 'vsl-tab-v2', tabs: Object.keys(LEAD_TABS) });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---------------------------
   Styling
---------------------------- */

function _styleHeader(sheet, colCount, bgColor) {
  sheet.getRange(1, 1, 1, colCount)
    .setBackground(bgColor || '#1D4231')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42);
}

function styleRow(sheet, rowIndex, colCount) {
  var row = sheet.getRange(rowIndex, 1, 1, colCount);
  row.setBackground(rowIndex % 2 === 0 ? '#f8f6f2' : '#ffffff')
    .setFontColor('#1a1c1b')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(rowIndex, 36);
  row.setBorder(false, false, true, false, false, false, '#e5dfd6', SpreadsheetApp.BorderStyle.SOLID);
}

function _setWidths(sheet, widths) {
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
}

function _addFilter(sheet, colCount) {
  // createFilter() throws if one already exists - harmless either way.
  try {
    if (!sheet.getFilter()) sheet.getRange(1, 1, 1, colCount).createFilter();
  } catch (err) {
    Logger.log('Filter skipped on ' + sheet.getName() + ': ' + err);
  }
}

/* ---------------------------
   Header-driven row writing
---------------------------- */

/**
 * Append a row by matching valueMap keys against the sheet's actual header
 * row. Unknown headers get '', missing headers are ignored - so the script
 * survives both an out-of-date tab and a tab with extra manual columns.
 */
function _appendByHeaders(sheet, valueMap, defaultHeaders, headerColor) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(defaultHeaders);
    _styleHeader(sheet, defaultHeaders.length, headerColor);
    sheet.setFrozenRows(1);
  }

  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
    return String(h).trim();
  });

  var row = headers.map(function (h) {
    return Object.prototype.hasOwnProperty.call(valueMap, h) ? valueMap[h] : '';
  });

  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow(row);
  styleRow(sheet, nextRow, lastCol);

  return { row: nextRow, headers: headers };
}

/**
 * Append any of `wanted` that the header row is missing, at the end, so an
 * older tab picks up new columns without its existing rows shifting.
 */
function _ensureHeaders(sheet, wanted, headerColor) {
  if (sheet.getLastRow() === 0) return;

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(function (h) {
    return String(h).trim();
  });
  var missing = wanted.filter(function (h) { return headers.indexOf(h) === -1; });
  if (!missing.length) return;

  var start = sheet.getLastColumn() + 1;
  sheet.getRange(1, start, 1, missing.length).setValues([missing]);
  _styleHeader(sheet, sheet.getLastColumn(), headerColor);
  missing.forEach(function (h, i) { sheet.setColumnWidth(start + i, 200); });
}

function _centerColumns(sheet, headers, rowIndex, names) {
  names.forEach(function (name) {
    var idx = headers.indexOf(name);
    if (idx !== -1) sheet.getRange(rowIndex, idx + 1).setHorizontalAlignment('center');
  });
}

/* ---------------------------
   Sheet creation
---------------------------- */

function createLeadSheet(ss, tabName, headerColor) {
  var s = ss.insertSheet(tabName);
  s.appendRow(LEAD_HEADERS);
  _styleHeader(s, LEAD_HEADERS.length, headerColor || '#1D4231');
  _setWidths(s, LEAD_WIDTHS);
  s.setFrozenRows(1);
  _addFilter(s, LEAD_HEADERS.length);
  return s;
}

function createVslSheet(ss) {
  var s = ss.insertSheet(VSL_TAB);
  s.appendRow(VSL_HEADERS);
  _styleHeader(s, VSL_HEADERS.length, LEAD_TABS[VSL_TAB]);
  _setWidths(s, VSL_WIDTHS);
  s.setFrozenRows(1);
  _addFilter(s, VSL_HEADERS.length);
  return s;
}

function getOrCreateVslSheet(ss) {
  var s = ss.getSheetByName(VSL_TAB);
  if (!s) return createVslSheet(ss);
  _ensureHeaders(s, VSL_HEADERS, LEAD_TABS[VSL_TAB]);
  return s;
}

function createFeedbackSheet(ss) {
  var s = ss.insertSheet(FEEDBACK_TAB);
  s.appendRow(FEEDBACK_HEADERS);
  _styleHeader(s, FEEDBACK_HEADERS.length, '#1D4231');
  _setWidths(s, FEEDBACK_WIDTHS);
  s.setFrozenRows(1);
  _addFilter(s, FEEDBACK_HEADERS.length);
  return s;
}

function getOrCreateLeadSheet(ss, tabName) {
  return ss.getSheetByName(tabName) || createLeadSheet(ss, tabName, LEAD_TABS[tabName] || '#1D4231');
}

function getOrCreateFeedbackSheet(ss) {
  return ss.getSheetByName(FEEDBACK_TAB) || createFeedbackSheet(ss);
}

/* ---------------------------
   Appenders
---------------------------- */

function appendLeadRow(sheet, data, ts) {
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': data.name || '',
    'Email': data.email || '',
    'Phone': data.phone || '',
    'Location': data.location || '',
    'Treatment Concern': data.treatment || '',
    'Source': data.source || ''
  }, LEAD_HEADERS, LEAD_TABS[sheet.getName()]);

  _centerColumns(sheet, result.headers, result.row, ['Phone']);
  return result.row;
}

function appendVslRow(sheet, data, ts) {
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': data.name || '',
    'Email': data.email || '',
    'Phone': data.phone || '',
    'Your Situation': data.situation || 'Not selected',
    'Your Priority': data.priority || 'Not selected',
    'Payment Status': data.paymentStatus || 'Pending',
    'Amount': data.amount || '',
    'Payment ID': data.paymentId || '',
    'Order ID': data.orderId || '',
    'Payment Method': data.paymentMethod || '',
    'Source': data.source || '',
    // Filled only if an older tab still has these columns.
    'Location': data.location || '',
    'Treatment Concern': data.treatment || ''
  }, VSL_HEADERS, LEAD_TABS[VSL_TAB]);

  _centerColumns(sheet, result.headers, result.row, ['Phone', 'Payment Status', 'Amount']);
  _colorPaymentStatus(sheet, result.headers, result.row);
  return result.row;
}

function _colorPaymentStatus(sheet, headers, rowIndex) {
  var idx = headers.indexOf('Payment Status');
  if (idx === -1) return;
  var cell = sheet.getRange(rowIndex, idx + 1);
  var status = String(cell.getValue()).toLowerCase();
  if (status === 'paid') cell.setBackground('#d9ead3').setFontColor('#1D4231').setFontWeight('bold');
  else if (status === 'failed') cell.setBackground('#f4cccc').setFontColor('#990000').setFontWeight('bold');
  else cell.setBackground('#fff2cc').setFontColor('#7f6000');
}

function appendFeedbackRow(sheet, data, ts) {
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': data.name || '',
    'Phone': data.phone || '',
    'Branch': data.branch || 'Not specified',
    'Request Callback': data.requestCallback || '',
    'Message': data.message || '',
    'Source': data.source || '',
    'Page URL': data.pageUrl || ''
  }, FEEDBACK_HEADERS, '#1D4231');

  _centerColumns(sheet, result.headers, result.row, ['Phone', 'Branch', 'Request Callback']);
  return result.row;
}

/* ---------------------------
   Routing
---------------------------- */

function _isFeedback(sheetTab, source, pageUrl) {
  var tab = String(sheetTab || '').toLowerCase();
  if (tab === 'client feedback' || tab === 'feedback') return true;

  // Fallback: `source` is now the live URL, so /client-feedback/kondapur
  // still resolves correctly even if sheetTab is missing.
  var haystack = (String(source || '') + ' ' + String(pageUrl || '')).toLowerCase();
  return haystack.indexOf('feedback') !== -1;
}

function _isVsl(source, pageUrl) {
  // Catches VSL leads even if an older deploy still sends sheetTab
  // 'Implant Leads' - the live URL (e.g. https://.../vsl) gives it away.
  var haystack = (String(source || '') + ' ' + String(pageUrl || '')).toLowerCase();
  return /(^|[^a-z0-9])vsl([^a-z0-9]|$)/.test(haystack);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ts = data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var sheetTab = data.sheetTab || 'Implant Leads';

    if (_isFeedback(sheetTab, data.source, data.pageUrl)) {
      var feedbackSheet = getOrCreateFeedbackSheet(ss);
      var feedbackRow = appendFeedbackRow(feedbackSheet, data, ts);
      return _json({
        success: true,
        tab: FEEDBACK_TAB,
        row: feedbackRow,
        branch: data.branch || 'Not specified'
      });
    }

    if (sheetTab === VSL_TAB || _isVsl(data.source, data.pageUrl)) {
      var vslSheet = getOrCreateVslSheet(ss);
      var vslRow = appendVslRow(vslSheet, data, ts);
      return _json({ success: true, tab: VSL_TAB, row: vslRow });
    }

    if (!Object.prototype.hasOwnProperty.call(LEAD_TABS, sheetTab)) {
      sheetTab = 'Implant Leads';
    }

    var leadSheet = getOrCreateLeadSheet(ss, sheetTab);
    var leadRow = appendLeadRow(leadSheet, data, ts);
    return _json({ success: true, tab: sheetTab, row: leadRow });

  } catch (err) {
    return _json({ error: err.toString() });
  }
}

/* ---------------------------
   RUN ONCE: create all tabs
---------------------------- */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(LEAD_TABS).forEach(function (tabName) {
    if (tabName === VSL_TAB) {
      var existed = !!ss.getSheetByName(VSL_TAB);
      getOrCreateVslSheet(ss);
      Logger.log((existed ? 'OK (columns checked): ' : 'Created: ') + VSL_TAB);
    } else if (!ss.getSheetByName(tabName)) {
      createLeadSheet(ss, tabName, LEAD_TABS[tabName]);
      Logger.log('Created: ' + tabName);
    } else {
      Logger.log('OK: ' + tabName);
    }
  });

  if (!ss.getSheetByName(FEEDBACK_TAB)) {
    createFeedbackSheet(ss);
    Logger.log('Created: ' + FEEDBACK_TAB);
  } else {
    Logger.log('OK: ' + FEEDBACK_TAB + ' (run migrateFeedbackSheet() to add Branch / Page URL)');
  }

  Logger.log('setupSheets complete.');
}

/* ---------------------------
   RUN ONCE: upgrade an existing Feedback tab

   Adds the 'Branch' and 'Page URL' columns without disturbing existing rows.
   Inserting a column shifts the old headers AND their data together, so
   historical rows stay aligned with their own labels. Safe to re-run.
---------------------------- */
function migrateFeedbackSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(FEEDBACK_TAB);

  if (!sheet) {
    createFeedbackSheet(ss);
    Logger.log('No existing tab - created a fresh ' + FEEDBACK_TAB + '.');
    return;
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FEEDBACK_HEADERS);
    _styleHeader(sheet, FEEDBACK_HEADERS.length, '#1D4231');
    _setWidths(sheet, FEEDBACK_WIDTHS);
    sheet.setFrozenRows(1);
    Logger.log('Tab was empty - wrote the new header row.');
    return;
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(function (h) {
    return String(h).trim();
  });
  var changed = false;

  // 'Branch' goes right after 'Phone' so the tab reads naturally.
  if (headers.indexOf('Branch') === -1) {
    var phoneIdx = headers.indexOf('Phone');
    var insertAt = phoneIdx === -1 ? sheet.getLastColumn() + 1 : phoneIdx + 2;
    sheet.insertColumnBefore(insertAt);
    sheet.getRange(1, insertAt).setValue('Branch');
    changed = true;
    Logger.log('Added "Branch" at column ' + insertAt + '.');
  }

  headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(function (h) {
    return String(h).trim();
  });

  if (headers.indexOf('Page URL') === -1) {
    var appendAt = sheet.getLastColumn() + 1;
    sheet.getRange(1, appendAt).setValue('Page URL');
    changed = true;
    Logger.log('Added "Page URL" at column ' + appendAt + '.');
  }

  var colCount = sheet.getLastColumn();
  _styleHeader(sheet, colCount, '#1D4231');
  _setWidths(sheet, FEEDBACK_WIDTHS.slice(0, colCount));
  sheet.setFrozenRows(1);

  Logger.log(changed ? 'migrateFeedbackSheet complete.' : 'Already up to date - nothing to change.');
}

/* ---------------------------
   TEST HELPERS
---------------------------- */

function _runTest(payload) {
  var result = doPost({ postData: { contents: JSON.stringify(payload) } });
  Logger.log(result.getContent());
}

function _now() {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

function testImplantLead() {
  _runTest({
    name: 'Test Implant',
    email: 'implant@test.com',
    phone: '9876543210',
    location: 'Hyderabad',
    treatment: 'Single Tooth Implant',
    source: 'https://auradental.in/implant',
    sheetTab: 'Implant Leads',
    timestamp: _now()
  });
}

function testGeneralDentalLead() {
  _runTest({
    name: 'Test General',
    email: 'general@test.com',
    phone: '9876543210',
    location: 'Hyderabad',
    treatment: 'Root Canal Treatment',
    source: 'https://auradental.in/general-dental',
    sheetTab: 'General Dental Leads',
    timestamp: _now()
  });
}

function testAlignerLead() {
  _runTest({
    name: 'Test Aligner',
    email: 'aligner@test.com',
    phone: '9876543210',
    location: 'Hyderabad',
    treatment: 'Crowded Teeth',
    source: 'https://auradental.in/invisible-aligners',
    sheetTab: 'Invisible Aligners Leads',
    timestamp: _now()
  });
}

function testVslLead() {
  // What the form submit sends - before payment.
  _runTest({
    name: 'Test VSL',
    email: 'vsl@test.com',
    phone: '9876543210',
    location: 'Not specified',
    treatment: 'One missing tooth, A natural-looking smile',
    situation: 'One missing tooth, Difficulty chewing',
    priority: 'A natural-looking smile, Better chewing',
    source: 'https://www.consultauradental.in/vsl',
    sheetTab: 'VSL Leads',
    timestamp: _now()
  });
}

function testVslPayment() {
  // What the Razorpay webhook sends after a captured payment.
  _runTest({
    name: 'Test VSL',
    email: 'vsl@test.com',
    phone: '9876543210',
    location: 'Not specified',
    treatment: 'One missing tooth, A natural-looking smile',
    situation: 'One missing tooth, Difficulty chewing',
    priority: 'A natural-looking smile, Better chewing',
    paymentStatus: 'Paid',
    amount: 'INR 499.00',
    paymentId: 'pay_TEST123',
    orderId: 'order_TEST123',
    paymentMethod: 'upi',
    source: 'https://www.consultauradental.in/vsl',
    sheetTab: 'VSL Leads',
    timestamp: _now()
  });
}

function testFeedbackKondapur() {
  _runTest({
    name: 'Test Kondapur',
    phone: '9876543210',
    requestCallback: 'Yes',
    message: 'The wait time was too long.',
    branch: 'Kondapur',
    pageUrl: 'https://auradental.in/client-feedback/kondapur',
    source: 'https://auradental.in/client-feedback/kondapur',
    sheetTab: 'Client Feedback',
    timestamp: _now()
  });
}

function testFeedbackMadeenaguda() {
  _runTest({
    name: 'Test Madeenaguda',
    phone: '9876543210',
    requestCallback: 'No',
    message: 'Reception was hard to reach on the phone.',
    branch: 'Madeenaguda',
    pageUrl: 'https://auradental.in/client-feedback/madeenaguda',
    source: 'https://auradental.in/client-feedback/madeenaguda',
    sheetTab: 'Client Feedback',
    timestamp: _now()
  });
}

function testFeedbackUnbranded() {
  // The original /client-feedback page - no branch in the URL.
  _runTest({
    name: 'Test Unbranded',
    phone: '9876543210',
    requestCallback: 'No',
    message: 'Billing was confusing.',
    branch: 'Not specified',
    pageUrl: 'https://auradental.in/client-feedback',
    source: 'https://auradental.in/client-feedback',
    sheetTab: 'Client Feedback',
    timestamp: _now()
  });
}

function testAll() {
  testImplantLead();
  testGeneralDentalLead();
  testAlignerLead();
  testVslLead();
  testVslPayment();
  testFeedbackKondapur();
  testFeedbackMadeenaguda();
  testFeedbackUnbranded();
}
