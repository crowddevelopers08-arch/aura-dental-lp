/* ============================================================
   Aura Dental - Google Apps Script (ALL 3 FORMS + FEEDBACK)
   Routing:
     sheetTab === 'Implant Leads'             -> Implant Leads tab
     sheetTab === 'General Dental Leads'      -> General Dental Leads tab
     sheetTab === 'Invisible Aligners Leads'  -> Invisible Aligners Leads tab
     source includes 'feedback'               -> Feedback tab
     everything else                          -> Implant Leads tab

   Feedback payload shape (app/api/feedback/route.ts):
     { timestamp, name, phone, requestCallback: 'Yes'|'No', message, source, sheetTab }
   ============================================================ */

function authorize() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Aura Dental API is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _styleHeader(sheet, colCount, bgColor) {
  sheet.getRange(1, 1, 1, colCount)
    .setBackground(bgColor || '#1D4231')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
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

function createLeadSheet(ss, tabName, headerColor) {
  var s = ss.insertSheet(tabName);
  s.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Location', 'Treatment Concern', 'Source']);
  _styleHeader(s, 7, headerColor || '#1D4231');
  [170, 170, 220, 130, 150, 220, 260].forEach(function(w, i) { s.setColumnWidth(i + 1, w); });
  s.setRowHeight(1, 42);
  s.setFrozenRows(1);
  s.getRange(1, 1, 1, 7).createFilter();
  return s;
}

function createFeedbackSheet(ss) {
  var s = ss.insertSheet('Feedback');
  s.appendRow(['Timestamp', 'Name', 'Phone', 'Request Callback', 'Message', 'Source']);
  _styleHeader(s, 6, '#1D4231');
  [170, 170, 130, 150, 300, 260].forEach(function(w, i) { s.setColumnWidth(i + 1, w); });
  s.setRowHeight(1, 42);
  s.setFrozenRows(1);
  s.getRange(1, 1, 1, 6).createFilter();
  return s;
}

function getOrCreateLeadSheet(ss, tabName) {
  var colors = {
    'Implant Leads': '#1D4231',
    'General Dental Leads': '#2E5A45',
    'Invisible Aligners Leads': '#7A6840'
  };
  return ss.getSheetByName(tabName) || createLeadSheet(ss, tabName, colors[tabName] || '#1D4231');
}

function appendLeadRow(sheet, data, ts) {
  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow([
    ts,
    data.name || '',
    data.email || '',
    data.phone || '',
    data.location || '',
    data.treatment || '',
    data.source || ''
  ]);
  styleRow(sheet, nextRow, 7);
  sheet.getRange(nextRow, 4).setHorizontalAlignment('center');
  return nextRow;
}

function appendFeedbackRow(sheet, data, ts) {
  var nextRow = sheet.getLastRow() + 1;
  sheet.appendRow([
    ts,
    data.name || '',
    data.phone || '',
    data.requestCallback || '',
    data.message || '',
    data.source || ''
  ]);
  styleRow(sheet, nextRow, 6);
  sheet.getRange(nextRow, 3).setHorizontalAlignment('center');
  sheet.getRange(nextRow, 4).setHorizontalAlignment('center');
  return nextRow;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ts = data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var source = (data.source || '').toLowerCase();
    var sheetTab = data.sheetTab || 'Implant Leads';

    if (source.indexOf('feedback') !== -1) {
      var feedbackSheet = ss.getSheetByName('Feedback') || createFeedbackSheet(ss);
      var feedbackRow = appendFeedbackRow(feedbackSheet, data, ts);
      return _json({ success: true, tab: 'Feedback', row: feedbackRow });
    }

    if (
      sheetTab !== 'Implant Leads' &&
      sheetTab !== 'General Dental Leads' &&
      sheetTab !== 'Invisible Aligners Leads'
    ) {
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
   NOTE: if 'Feedback' already exists with the old
   [Timestamp, Name, Email, Phone, Suggestions, Source] header row,
   this will NOT rewrite it. Either delete the old header row before
   running setupSheets(), or manually fix row 1 to:
   [Timestamp, Name, Phone, Request Callback, Message, Source]
---------------------------- */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss.getSheetByName('Implant Leads')) {
    createLeadSheet(ss, 'Implant Leads', '#1D4231');
    Logger.log('Created: Implant Leads');
  } else {
    Logger.log('OK: Implant Leads');
  }

  if (!ss.getSheetByName('General Dental Leads')) {
    createLeadSheet(ss, 'General Dental Leads', '#2E5A45');
    Logger.log('Created: General Dental Leads');
  } else {
    Logger.log('OK: General Dental Leads');
  }

  if (!ss.getSheetByName('Invisible Aligners Leads')) {
    createLeadSheet(ss, 'Invisible Aligners Leads', '#7A6840');
    Logger.log('Created: Invisible Aligners Leads');
  } else {
    Logger.log('OK: Invisible Aligners Leads');
  }

  if (!ss.getSheetByName('Feedback')) {
    createFeedbackSheet(ss);
    Logger.log('Created: Feedback');
  } else {
    Logger.log('OK: Feedback (verify header row matches new Request Callback / Message columns)');
  }

  Logger.log('setupSheets complete.');
}

/* ---------------------------
   TEST HELPERS
---------------------------- */
function testImplantLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test Implant',
        email: 'implant@test.com',
        phone: '9876543210',
        location: 'Hyderabad',
        treatment: 'Single Tooth Implant',
        source: 'Aura Dental - Dental Implant LP',
        sheetTab: 'Implant Leads',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}

function testGeneralDentalLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test General',
        email: 'general@test.com',
        phone: '9876543210',
        location: 'Hyderabad',
        treatment: 'Root Canal Treatment',
        source: 'Aura Dental - General Dental LP',
        sheetTab: 'General Dental Leads',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}

function testAlignerLead() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test Aligner',
        email: 'aligner@test.com',
        phone: '9876543210',
        location: 'Hyderabad',
        treatment: 'Crowded Teeth',
        source: 'Aura Dental - Invisible Aligners LP',
        sheetTab: 'Invisible Aligners Leads',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}

function testFeedback() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test Feedback',
        phone: '9876543210',
        requestCallback: 'Yes',
        message: 'The wait time was too long.',
        source: 'Aura Dental – Client Feedback',
        sheetTab: 'Client Feedback',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }
  });
  Logger.log(result.getContent());
}
