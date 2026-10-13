/* ============================================================
   Aura Dental - Google Apps Script (ALL FORMS + PAYMENTS + FEEDBACK)
   Version: overall-v6

   Tabs:
     Implant Leads              -> implant page form
     General Dental Leads       -> /general-dental
     Invisible Aligners Leads   -> /invisible-aligners
     Overall                    -> home page form   (formName 'dental-overall')
     VSL Leads                  -> /vsl             (paid - Razorpay)
     Overall-Paid               -> /overall         (paid - Razorpay, formName 'dental-overall-paid')
     Feedback                   -> /client-feedback

   Overall + Overall-Paid treatment concerns (v6) and their Treatment Type:
     Teeth Scaling          -> General Dental
     Root Canal Treatment   -> General Dental
     Dental Implants        -> Dental Implants
     Braces & Aligners      -> Invisible Aligners
     General Consultation   -> General Dental
   The site sends treatmentType with each lead; if a payload lacks it (older
   deploy), the script derives it from the concern using OVERALL_TREATMENTS.
   Keep this list in sync with lib/overallTreatments.ts.

   Routing (first match wins):
     1. sheetTab 'Client Feedback'|'Feedback', or 'feedback' in source/pageUrl -> Feedback
     2. sheetTab is a payment tab ('VSL Leads' | 'Overall-Paid') -> that tab
     3. formName 'dental-overall-paid' or '/overall' in source              -> Overall-Paid
     4. 'vsl' in source/pageUrl (older deploys)                              -> VSL Leads
     5. sheetTab is a lead tab                                               -> that tab
     6. formName 'dental-overall'                                            -> Overall
     7. everything else                                                      -> Implant Leads

   Lead payload (app/api/submit-lead/route.ts):
     { timestamp, name, email, phone, location, treatment, treatmentType,
       situation, priority, source, sheetTab, formName, landingPage, paymentStatus? }

   Payment payload (app/api/razorpay/webhook/route.ts) adds:
     { paymentStatus: 'Paid'|'Failed', amount, paymentId, orderId, paymentMethod }

   A paid form writes a 'Pending' row when the form is submitted (before
   checkout), then the webhook adds a 'Paid' or 'Failed' row for the same lead.

   Feedback payload (app/api/feedback/route.ts):
     { timestamp, name, phone, requestCallback, message, branch, pageUrl,
       source, sheetTab: 'Client Feedback' }

   Rows are written BY HEADER NAME, not by position, so an existing tab with an
   older column set keeps working; missing columns are appended automatically
   (lead, payment and feedback tabs alike).

   AFTER PASTING THIS FILE:
     1. Run setupSheets() once (creates the new tabs, adds missing columns -
        existing Overall / Overall-Paid tabs get 'Treatment Type' at the end).
     2. Deploy > Manage deployments > edit the existing Web app > Version: New
        version > Deploy. Keep the same /exec URL (GOOGLE_SHEETS_WEBHOOK_URL).
     3. Open the /exec URL in a browser - it should report version overall-v6.
   ============================================================ */

var VERSION = 'overall-v6';

/* ---------------------------
   Tab definitions
---------------------------- */

var IMPLANT_TAB = 'Implant Leads';
var GENERAL_TAB = 'General Dental Leads';
var ALIGNERS_TAB = 'Invisible Aligners Leads';
var OVERALL_TAB = 'Overall';
var VSL_TAB = 'VSL Leads';
var OVERALL_PAID_TAB = 'Overall-Paid';
var FEEDBACK_TAB = 'Feedback';

var FORM_OVERALL = 'dental-overall';
var FORM_OVERALL_PAID = 'dental-overall-paid';

// Concerns offered on the home page and /overall forms -> TeleCRM Treatment Type.
var OVERALL_TREATMENTS = {
  'Teeth Scaling': 'General Dental',
  'Root Canal Treatment': 'General Dental',
  'Dental Implants': 'Dental Implants',
  'Braces & Aligners': 'Invisible Aligners',
  'General Consultation': 'General Dental'
};

function _treatmentTypeOf(data) {
  if (data.treatmentType) return data.treatmentType;
  var concern = String(data.treatment || '').trim();
  return _has(OVERALL_TREATMENTS, concern) ? OVERALL_TREATMENTS[concern] : '';
}

var LEAD_HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Location', 'Treatment Concern', 'Source'];
var LEAD_WIDTHS = [170, 170, 220, 130, 150, 220, 260];

var OVERALL_HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Treatment Concern', 'Treatment Type', 'Form Name', 'Landing Page', 'Source'];
var OVERALL_WIDTHS = [170, 170, 220, 130, 220, 170, 170, 240, 260];

var VSL_HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone', 'Your Situation', 'Your Priority',
  'Payment Status', 'Amount', 'Payment ID', 'Order ID', 'Payment Method', 'Source'
];
var VSL_WIDTHS = [170, 170, 220, 130, 260, 260, 140, 120, 200, 200, 140, 260];

var OVERALL_PAID_HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone', 'Treatment Concern', 'Treatment Type',
  'Payment Status', 'Amount', 'Payment ID', 'Order ID', 'Payment Method',
  'Form Name', 'Landing Page', 'Source'
];
var OVERALL_PAID_WIDTHS = [170, 170, 220, 130, 220, 170, 140, 120, 200, 200, 140, 170, 240, 260];

var FEEDBACK_HEADERS = ['Timestamp', 'Name', 'Phone', 'Branch', 'Request Callback', 'Message', 'Source', 'Page URL'];
var FEEDBACK_WIDTHS = [170, 170, 130, 140, 150, 300, 260, 260];

// Plain lead tabs (no payment columns).
var LEAD_TABS = {};
LEAD_TABS[IMPLANT_TAB] = { color: '#1D4231', headers: LEAD_HEADERS, widths: LEAD_WIDTHS };
LEAD_TABS[GENERAL_TAB] = { color: '#2E5A45', headers: LEAD_HEADERS, widths: LEAD_WIDTHS };
LEAD_TABS[ALIGNERS_TAB] = { color: '#7A6840', headers: LEAD_HEADERS, widths: LEAD_WIDTHS };
LEAD_TABS[OVERALL_TAB] = { color: '#3B6B55', headers: OVERALL_HEADERS, widths: OVERALL_WIDTHS };

// Tabs fed by a Razorpay checkout (Pending row from the form, Paid/Failed from the webhook).
var PAYMENT_TABS = {};
PAYMENT_TABS[VSL_TAB] = { color: '#8C6D1F', headers: VSL_HEADERS, widths: VSL_WIDTHS };
PAYMENT_TABS[OVERALL_PAID_TAB] = { color: '#A07A2C', headers: OVERALL_PAID_HEADERS, widths: OVERALL_PAID_WIDTHS };

function authorize() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  // Open the /exec URL in a browser to confirm which version is deployed.
  return _json({
    status: 'Aura Dental API is live',
    version: VERSION,
    leadTabs: Object.keys(LEAD_TABS),
    paymentTabs: Object.keys(PAYMENT_TABS),
    feedbackTab: FEEDBACK_TAB
  });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
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

function _headersOf(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(function (h) {
    return String(h).trim();
  });
}

/**
 * Append a row by matching valueMap keys against the sheet's actual header
 * row. Unknown headers get '', missing headers are ignored - so the script
 * survives both an out-of-date tab and a tab with extra manual columns.
 */
function _appendByHeaders(sheet, valueMap, defaultHeaders, headerColor) {
  _ensureHeaders(sheet, defaultHeaders, headerColor);

  var headers = _headersOf(sheet);
  var row = headers.map(function (h) {
    return _has(valueMap, h) ? valueMap[h] : '';
  });

  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow(row);
  styleRow(sheet, nextRow, headers.length);

  return { row: nextRow, headers: headers };
}

/**
 * Make sure row 1 is a header row. An empty tab gets one written; a tab whose
 * row 1 is data (header deleted, or a lead written before headers existed)
 * gets one inserted above it, so no lead is ever used as a header.
 */
function _ensureHeaderRow(sheet, defaultHeaders, headerColor) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, defaultHeaders.length).setValues([defaultHeaders]);
  } else if (String(sheet.getRange(1, 1).getValue()).trim() !== 'Timestamp') {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, defaultHeaders.length).setValues([defaultHeaders]);
    Logger.log('Inserted missing header row on ' + sheet.getName());
  } else {
    return;
  }
  _styleHeader(sheet, defaultHeaders.length, headerColor);
  sheet.setFrozenRows(1);
}

/**
 * Append any of `wanted` that the header row is missing, at the end, so an
 * older tab picks up new columns without its existing rows shifting.
 */
function _ensureHeaders(sheet, wanted, headerColor) {
  _ensureHeaderRow(sheet, wanted, headerColor);

  var headers = _headersOf(sheet);
  var missing = wanted.filter(function (h) { return headers.indexOf(h) === -1; });
  if (!missing.length) return;

  var start = sheet.getLastColumn() + 1;
  sheet.getRange(1, start, 1, missing.length).setValues([missing]);
  _styleHeader(sheet, sheet.getLastColumn(), headerColor);
  missing.forEach(function (h, i) { sheet.setColumnWidth(start + i, 200); });
  Logger.log('Added columns to ' + sheet.getName() + ': ' + missing.join(', '));
}

function _centerColumns(sheet, headers, rowIndex, names) {
  names.forEach(function (name) {
    var idx = headers.indexOf(name);
    if (idx !== -1) sheet.getRange(rowIndex, idx + 1).setHorizontalAlignment('center');
  });
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

/* ---------------------------
   Sheet creation
---------------------------- */

function _createTab(ss, tabName, def) {
  var s = ss.insertSheet(tabName);
  s.getRange(1, 1, 1, def.headers.length).setValues([def.headers]);
  _styleHeader(s, def.headers.length, def.color);
  _setWidths(s, def.widths);
  s.setFrozenRows(1);
  _addFilter(s, def.headers.length);
  return s;
}

function _getOrCreateTab(ss, tabName, def) {
  var s = ss.getSheetByName(tabName);
  if (!s) return _createTab(ss, tabName, def);
  _ensureHeaders(s, def.headers, def.color);
  return s;
}

function getOrCreateLeadSheet(ss, tabName) {
  return _getOrCreateTab(ss, tabName, LEAD_TABS[tabName] || LEAD_TABS[IMPLANT_TAB]);
}

function getOrCreatePaymentSheet(ss, tabName) {
  return _getOrCreateTab(ss, tabName, PAYMENT_TABS[tabName]);
}

function getOrCreateFeedbackSheet(ss) {
  return _getOrCreateTab(ss, FEEDBACK_TAB, { color: '#1D4231', headers: FEEDBACK_HEADERS, widths: FEEDBACK_WIDTHS });
}

/* ---------------------------
   Appenders
---------------------------- */

function appendLeadRow(sheet, data, ts) {
  var def = LEAD_TABS[sheet.getName()] || LEAD_TABS[IMPLANT_TAB];
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': data.name || '',
    'Email': data.email || '',
    'Phone': data.phone || '',
    'Location': data.location || '',
    'Treatment Concern': data.treatment || '',
    // Only lands on tabs that have the column (Overall).
    'Treatment Type': _treatmentTypeOf(data),
    'Form Name': data.formName || '',
    'Landing Page': data.landingPage || '',
    'Source': data.source || ''
  }, def.headers, def.color);

  _centerColumns(sheet, result.headers, result.row, ['Phone', 'Form Name']);
  return result.row;
}

function appendPaymentRow(sheet, data, ts) {
  var def = PAYMENT_TABS[sheet.getName()];
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': data.name || '',
    'Email': data.email || '',
    'Phone': data.phone || '',
    'Treatment Concern': data.treatment || '',
    // Only lands on tabs that have the column (Overall-Paid).
    'Treatment Type': _treatmentTypeOf(data),
    'Your Situation': data.situation || 'Not selected',
    'Your Priority': data.priority || 'Not selected',
    'Payment Status': data.paymentStatus || 'Pending',
    'Amount': data.amount || '',
    'Payment ID': data.paymentId || '',
    'Order ID': data.orderId || '',
    'Payment Method': data.paymentMethod || '',
    'Form Name': data.formName || '',
    'Landing Page': data.landingPage || '',
    'Source': data.source || '',
    // Filled only if an older tab still has this column.
    'Location': data.location || ''
  }, def.headers, def.color);

  _centerColumns(sheet, result.headers, result.row, ['Phone', 'Payment Status', 'Amount', 'Form Name']);
  _colorPaymentStatus(sheet, result.headers, result.row);
  return result.row;
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

function _haystack(data) {
  return (String(data.source || '') + ' ' + String(data.pageUrl || '')).toLowerCase();
}

function _isFeedback(sheetTab, data) {
  var tab = String(sheetTab || '').toLowerCase();
  if (tab === 'client feedback' || tab === 'feedback') return true;
  return _haystack(data).indexOf('feedback') !== -1;
}

function _isVsl(data) {
  // Catches VSL leads even if an older deploy still sends sheetTab
  // 'Implant Leads' - the live URL (e.g. https://.../vsl) gives it away.
  return /(^|[^a-z0-9])vsl([^a-z0-9]|$)/.test(_haystack(data));
}

function _isOverallPaid(data) {
  if (String(data.formName || '').toLowerCase() === FORM_OVERALL_PAID) return true;
  return /\/overall([\/?#\s]|$)/.test(_haystack(data));
}

/** Returns { kind: 'feedback'|'payment'|'lead', tab } for a payload. */
function resolveTab(data) {
  var sheetTab = String(data.sheetTab || '').trim();
  var formName = String(data.formName || '').toLowerCase();

  if (_isFeedback(sheetTab, data)) return { kind: 'feedback', tab: FEEDBACK_TAB };
  if (_has(PAYMENT_TABS, sheetTab)) return { kind: 'payment', tab: sheetTab };
  if (_isOverallPaid(data)) return { kind: 'payment', tab: OVERALL_PAID_TAB };
  if (_isVsl(data)) return { kind: 'payment', tab: VSL_TAB };
  if (_has(LEAD_TABS, sheetTab)) return { kind: 'lead', tab: sheetTab };
  if (formName === FORM_OVERALL) return { kind: 'lead', tab: OVERALL_TAB };
  return { kind: 'lead', tab: IMPLANT_TAB };
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ts = data.timestamp || _now();
    var target = resolveTab(data);

    // Two submits landing at once must not write to the same row.
    lock.waitLock(20000);

    var row;
    if (target.kind === 'feedback') {
      row = appendFeedbackRow(getOrCreateFeedbackSheet(ss), data, ts);
      return _json({ success: true, tab: FEEDBACK_TAB, row: row, branch: data.branch || 'Not specified' });
    }

    if (target.kind === 'payment') {
      row = appendPaymentRow(getOrCreatePaymentSheet(ss, target.tab), data, ts);
      return _json({ success: true, tab: target.tab, row: row, paymentStatus: data.paymentStatus || 'Pending' });
    }

    row = appendLeadRow(getOrCreateLeadSheet(ss, target.tab), data, ts);
    return _json({ success: true, tab: target.tab, row: row });

  } catch (err) {
    return _json({ error: err.toString() });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

/* ---------------------------
   RUN ONCE: create / upgrade all tabs
   Creates any missing tab and appends any missing column to existing tabs.
   Safe to re-run - existing rows are never moved or deleted.
---------------------------- */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(LEAD_TABS).forEach(function (tabName) {
    var existed = !!ss.getSheetByName(tabName);
    getOrCreateLeadSheet(ss, tabName);
    Logger.log((existed ? 'OK (columns checked): ' : 'Created: ') + tabName);
  });

  Object.keys(PAYMENT_TABS).forEach(function (tabName) {
    var existed = !!ss.getSheetByName(tabName);
    getOrCreatePaymentSheet(ss, tabName);
    Logger.log((existed ? 'OK (columns checked): ' : 'Created: ') + tabName);
  });

  var feedbackExisted = !!ss.getSheetByName(FEEDBACK_TAB);
  getOrCreateFeedbackSheet(ss);
  Logger.log((feedbackExisted ? 'OK (columns checked): ' : 'Created: ') + FEEDBACK_TAB);

  Logger.log('setupSheets complete (' + VERSION + ').');
}

/* ---------------------------
   RUN ONCE (legacy): upgrade an existing Feedback tab
   Adds 'Branch' right after 'Phone' (instead of at the end) and 'Page URL'.
   Inserting a column shifts the old headers AND their data together, so
   historical rows stay aligned with their own labels. Safe to re-run.
---------------------------- */
function migrateFeedbackSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(FEEDBACK_TAB);

  if (!sheet || sheet.getLastRow() === 0) {
    if (sheet) ss.deleteSheet(sheet);
    getOrCreateFeedbackSheet(ss);
    Logger.log('Created a fresh ' + FEEDBACK_TAB + ' tab.');
    return;
  }

  var headers = _headersOf(sheet);
  var changed = false;

  if (headers.indexOf('Branch') === -1) {
    var phoneIdx = headers.indexOf('Phone');
    var insertAt = phoneIdx === -1 ? sheet.getLastColumn() + 1 : phoneIdx + 2;
    sheet.insertColumnBefore(insertAt);
    sheet.getRange(1, insertAt).setValue('Branch');
    changed = true;
    Logger.log('Added "Branch" at column ' + insertAt + '.');
  }

  headers = _headersOf(sheet);
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
   Run any of these from the editor; each writes one test row and logs the
   tab it landed in. Delete the test rows afterwards.
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
    name: 'Test Implant', email: 'implant@test.com', phone: '9876543210',
    location: 'Hyderabad', treatment: 'Single Tooth Implant',
    source: 'https://auradental.in/implant', sheetTab: IMPLANT_TAB, timestamp: _now()
  });
}

function testGeneralDentalLead() {
  _runTest({
    name: 'Test General', email: 'general@test.com', phone: '9876543210',
    location: 'Hyderabad', treatment: 'Root Canal Treatment',
    source: 'https://auradental.in/general-dental', sheetTab: GENERAL_TAB, timestamp: _now()
  });
}

function testAlignerLead() {
  _runTest({
    name: 'Test Aligner', email: 'aligner@test.com', phone: '9876543210',
    location: 'Hyderabad', treatment: 'Crowded Teeth',
    source: 'https://auradental.in/invisible-aligners', sheetTab: ALIGNERS_TAB, timestamp: _now()
  });
}

function testDentalOverallLead() {
  // Home page form (formName 'dental-overall').
  _runTest({
    name: 'Test Overall', email: 'overall@test.com', phone: '9876543210',
    location: 'Not specified', treatment: 'Teeth Scaling', treatmentType: 'General Dental',
    formName: FORM_OVERALL, landingPage: 'Aura Dental - Dental Overall LP',
    source: 'https://auradental.in/', sheetTab: OVERALL_TAB, timestamp: _now()
  });
}

function testDentalOverallPaidLead() {
  // /overall form submit - before checkout opens.
  _runTest({
    name: 'Test Overall Paid', email: 'overallpaid@test.com', phone: '9876543210',
    location: 'Not specified', treatment: 'Braces & Aligners', treatmentType: 'Invisible Aligners',
    formName: FORM_OVERALL_PAID, landingPage: 'Aura Dental - Dental Overall Paid LP',
    paymentStatus: 'Pending',
    source: 'https://auradental.in/overall', sheetTab: OVERALL_PAID_TAB, timestamp: _now()
  });
}

function testDentalOverallPaidPayment() {
  // What the Razorpay webhook sends after a captured /overall payment.
  _runTest({
    name: 'Test Overall Paid', email: 'overallpaid@test.com', phone: '9876543210',
    location: 'Not specified', treatment: 'Braces & Aligners', treatmentType: 'Invisible Aligners',
    formName: FORM_OVERALL_PAID, landingPage: 'Aura Dental - Dental Overall Paid LP',
    paymentStatus: 'Paid', amount: 'INR 499.00',
    paymentId: 'pay_TESTOVERALL', orderId: 'order_TESTOVERALL', paymentMethod: 'upi',
    source: 'https://auradental.in/overall', sheetTab: OVERALL_PAID_TAB, timestamp: _now()
  });
}

function testVslLead() {
  _runTest({
    name: 'Test VSL', email: 'vsl@test.com', phone: '9876543210',
    location: 'Not specified', treatment: 'One missing tooth, A natural-looking smile',
    situation: 'One missing tooth, Difficulty chewing',
    priority: 'A natural-looking smile, Better chewing',
    source: 'https://www.consultauradental.in/vsl', sheetTab: VSL_TAB, timestamp: _now()
  });
}

function testVslPayment() {
  _runTest({
    name: 'Test VSL', email: 'vsl@test.com', phone: '9876543210',
    location: 'Not specified', treatment: 'One missing tooth, A natural-looking smile',
    situation: 'One missing tooth, Difficulty chewing',
    priority: 'A natural-looking smile, Better chewing',
    paymentStatus: 'Paid', amount: 'INR 499.00',
    paymentId: 'pay_TEST123', orderId: 'order_TEST123', paymentMethod: 'upi',
    source: 'https://www.consultauradental.in/vsl', sheetTab: VSL_TAB, timestamp: _now()
  });
}

function testFeedbackKondapur() {
  _runTest({
    name: 'Test Kondapur', phone: '9876543210', requestCallback: 'Yes',
    message: 'The wait time was too long.', branch: 'Kondapur',
    pageUrl: 'https://auradental.in/client-feedback/kondapur',
    source: 'https://auradental.in/client-feedback/kondapur',
    sheetTab: 'Client Feedback', timestamp: _now()
  });
}

function testFeedbackMadeenaguda() {
  _runTest({
    name: 'Test Madeenaguda', phone: '9876543210', requestCallback: 'No',
    message: 'Reception was hard to reach on the phone.', branch: 'Madeenaguda',
    pageUrl: 'https://auradental.in/client-feedback/madeenaguda',
    source: 'https://auradental.in/client-feedback/madeenaguda',
    sheetTab: 'Client Feedback', timestamp: _now()
  });
}

function testFeedbackUnbranded() {
  _runTest({
    name: 'Test Unbranded', phone: '9876543210', requestCallback: 'No',
    message: 'Billing was confusing.', branch: 'Not specified',
    pageUrl: 'https://auradental.in/client-feedback',
    source: 'https://auradental.in/client-feedback',
    sheetTab: 'Client Feedback', timestamp: _now()
  });
}

/** Checks routing only - writes nothing. Run this first after pasting. */
function testRouting() {
  var cases = [
    [{ sheetTab: IMPLANT_TAB, source: 'https://x.in/implant' }, IMPLANT_TAB],
    [{ sheetTab: GENERAL_TAB, source: 'https://x.in/general-dental' }, GENERAL_TAB],
    [{ sheetTab: ALIGNERS_TAB, source: 'https://x.in/invisible-aligners' }, ALIGNERS_TAB],
    [{ sheetTab: OVERALL_TAB, formName: FORM_OVERALL, source: 'https://x.in/' }, OVERALL_TAB],
    [{ formName: FORM_OVERALL, source: 'https://x.in/' }, OVERALL_TAB],
    [{ sheetTab: OVERALL_PAID_TAB, formName: FORM_OVERALL_PAID, source: 'https://x.in/overall' }, OVERALL_PAID_TAB],
    [{ formName: FORM_OVERALL_PAID }, OVERALL_PAID_TAB],
    [{ source: 'https://x.in/overall?utm_source=fb' }, OVERALL_PAID_TAB],
    [{ sheetTab: VSL_TAB, source: 'https://x.in/vsl' }, VSL_TAB],
    [{ sheetTab: IMPLANT_TAB, source: 'https://x.in/vsl' }, VSL_TAB],
    [{ sheetTab: 'Client Feedback', source: 'https://x.in/client-feedback' }, FEEDBACK_TAB],
    [{ source: 'https://x.in/somewhere' }, IMPLANT_TAB]
  ];
  var failures = 0;
  cases.forEach(function (c) {
    var got = resolveTab(c[0]).tab;
    if (got !== c[1]) {
      failures++;
      Logger.log('FAIL ' + JSON.stringify(c[0]) + ' -> ' + got + ' (expected ' + c[1] + ')');
    }
  });
  Logger.log(failures ? failures + ' routing case(s) failed.' : 'All ' + cases.length + ' routing cases passed.');
}

/** Checks the concern -> Treatment Type fallback only - writes nothing. */
function testTreatmentTypes() {
  var cases = [
    [{ treatment: 'Teeth Scaling' }, 'General Dental'],
    [{ treatment: 'Root Canal Treatment' }, 'General Dental'],
    [{ treatment: 'Dental Implants' }, 'Dental Implants'],
    [{ treatment: 'Braces & Aligners' }, 'Invisible Aligners'],
    [{ treatment: 'General Consultation' }, 'General Dental'],
    [{ treatment: 'Dental Implants', treatmentType: 'Sent By Site' }, 'Sent By Site'],
    [{ treatment: 'Something else' }, '']
  ];
  var failures = 0;
  cases.forEach(function (c) {
    var got = _treatmentTypeOf(c[0]);
    if (got !== c[1]) {
      failures++;
      Logger.log('FAIL ' + JSON.stringify(c[0]) + ' -> "' + got + '" (expected "' + c[1] + '")');
    }
  });
  Logger.log(failures ? failures + ' treatment case(s) failed.' : 'All ' + cases.length + ' treatment cases passed.');
}

function testAll() {
  testImplantLead();
  testGeneralDentalLead();
  testAlignerLead();
  testDentalOverallLead();
  testDentalOverallPaidLead();
  testDentalOverallPaidPayment();
  testVslLead();
  testVslPayment();
  testFeedbackKondapur();
  testFeedbackMadeenaguda();
  testFeedbackUnbranded();
}