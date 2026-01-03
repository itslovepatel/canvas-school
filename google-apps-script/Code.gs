/**
 * Canwas Public School - Google Apps Script
 * Handles form submissions and automatic email confirmations
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets where you want to store submissions
 * 2. Go to Extensions > Apps Script
 * 3. Copy this entire code into the script editor
 * 4. Update the SCHOOL_CONFIG below with your details
 * 5. Deploy as Web App (Execute as: Me, Who has access: Anyone)
 * 6. Copy the Web App URL and use it in your frontend
 */

// ============================================
// CONFIGURATION - Update these values
// ============================================
const SCHOOL_CONFIG = {
  name: "Canwas Public School",
  phone: "+91 82099 09098",
  email: "Canvasdausa1377@gmail.com",
  address: "New Mandi Road, Behind Durga Mandir, Dausa",
  website: "www.canvasinternationalschool.com"
};

// Sheet names for different form types
const SHEET_NAMES = {
  VISIT_REQUEST: "Visit Requests",
  ADMISSION_INQUIRY: "Admission Inquiries",
  EMAIL_LOG: "Email Log"
};

// ============================================
// MAIN WEB APP HANDLERS
// ============================================

/**
 * Handles GET requests - for testing
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Canvas Pre-School Form API is running"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles POST requests from the website forms
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    let result;
    
    if (formType === "visit_request") {
      result = handleVisitRequest(data);
    } else if (formType === "admission_inquiry") {
      result = handleAdmissionInquiry(data);
    } else {
      throw new Error("Invalid form type: " + formType);
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    logError(error.message, e.postData ? e.postData.contents : "No data");
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// VISIT REQUEST HANDLER
// ============================================

function handleVisitRequest(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.VISIT_REQUEST);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.VISIT_REQUEST);
    // Add headers
    sheet.appendRow([
      "Timestamp",
      "Parent Name",
      "Phone",
      "Email",
      "Child Name",
      "Program",
      "Visit Date",
      "Visit Time",
      "Email Sent",
      "Submission ID"
    ]);
    // Format header row
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#4A90D9");
  }
  
  // Generate unique submission ID
  const submissionId = generateSubmissionId("VR");
  
  // Check for duplicate (same email + date within 1 minute)
  if (isDuplicateSubmission(sheet, data.email, data.phone)) {
    return {
      status: "duplicate",
      message: "This request was already submitted"
    };
  }
  
  // Add data to sheet
  const timestamp = new Date();
  sheet.appendRow([
    timestamp,
    data.parentName,
    data.phone,
    data.email || "",
    data.childName || "",
    data.program || "",
    data.visitDate,
    data.visitTime,
    "Pending",
    submissionId
  ]);
  
  // Send confirmation email if email provided
  let emailSent = false;
  if (data.email && data.email.trim() !== "") {
    emailSent = sendVisitConfirmationEmail(data, submissionId);
    
    // Update email status in sheet
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 9).setValue(emailSent ? "Sent" : "Failed");
  } else {
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 9).setValue("No Email");
  }
  
  return {
    status: "success",
    message: "Visit request submitted successfully",
    submissionId: submissionId,
    emailSent: emailSent
  };
}

// ============================================
// ADMISSION INQUIRY HANDLER
// ============================================

function handleAdmissionInquiry(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.ADMISSION_INQUIRY);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.ADMISSION_INQUIRY);
    // Add headers
    sheet.appendRow([
      "Timestamp",
      "Parent Name",
      "Phone",
      "Email",
      "Child Name",
      "Child Age",
      "Program",
      "Message",
      "Email Sent",
      "Submission ID"
    ]);
    // Format header row
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#E91E63");
  }
  
  // Generate unique submission ID
  const submissionId = generateSubmissionId("AI");
  
  // Check for duplicate
  if (isDuplicateSubmission(sheet, data.email, data.phone)) {
    return {
      status: "duplicate",
      message: "This inquiry was already submitted"
    };
  }
  
  // Add data to sheet
  const timestamp = new Date();
  sheet.appendRow([
    timestamp,
    data.parentName,
    data.phone,
    data.email || "",
    data.childName,
    data.childAge,
    data.program,
    data.message || "",
    "Pending",
    submissionId
  ]);
  
  // Send confirmation email if email provided
  let emailSent = false;
  if (data.email && data.email.trim() !== "") {
    emailSent = sendAdmissionConfirmationEmail(data, submissionId);
    
    // Update email status in sheet
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 9).setValue(emailSent ? "Sent" : "Failed");
  } else {
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 9).setValue("No Email");
  }
  
  return {
    status: "success",
    message: "Admission inquiry submitted successfully",
    submissionId: submissionId,
    emailSent: emailSent
  };
}

// ============================================
// EMAIL FUNCTIONS
// ============================================

/**
 * Send confirmation email for Visit Request
 */
function sendVisitConfirmationEmail(data, submissionId) {
  try {
    const subject = "Your School Visit Request Has Been Received";
    
    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4A90D9, #E91E63); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details li { margin: 10px 0; list-style: none; padding-left: 0; }
        .details li strong { color: #4A90D9; }
        .footer { background: #f1f1f1; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
        .highlight { color: #E91E63; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎨 ${SCHOOL_CONFIG.name}</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${data.parentName}</strong>,</p>
          
          <p>Thank you for showing interest in our preschool! 🌟</p>
          
          <p>We have received your request to visit our school${data.program ? ' for <span class="highlight">' + data.program + '</span>' : ''}.</p>
          
          <div class="details">
            <h3 style="margin-top: 0; color: #4A90D9;">📋 Visit Details:</h3>
            <ul style="padding-left: 0;">
              ${data.childName ? '<li>👶 <strong>Child Name:</strong> ' + data.childName + '</li>' : ''}
              <li>📅 <strong>Preferred Visit Date:</strong> ${formatDate(data.visitDate)}</li>
              <li>⏰ <strong>Preferred Time:</strong> ${data.visitTime}</li>
              <li>📞 <strong>Contact Number:</strong> ${data.phone}</li>
            </ul>
          </div>
          
          <p>Our admissions team will contact you shortly to confirm your visit. We look forward to welcoming you!</p>
          
          <p style="margin-top: 30px;">Warm regards,<br>
          <strong>${SCHOOL_CONFIG.name} Admissions Team</strong><br>
          📞 ${SCHOOL_CONFIG.phone}</p>
        </div>
        <div class="footer">
          <p>${SCHOOL_CONFIG.address}</p>
          <p>Reference ID: ${submissionId}</p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    const plainTextBody = `
Hello ${data.parentName},

Thank you for showing interest in our preschool.

We have received your request to visit our school${data.program ? ' for ' + data.program : ''}.

Visit Details:
${data.childName ? '• Child Name: ' + data.childName : ''}
• Preferred Visit Date: ${formatDate(data.visitDate)}
• Preferred Time: ${data.visitTime}
• Contact Number: ${data.phone}

Our admissions team will contact you shortly to confirm your visit.

Warm regards,
${SCHOOL_CONFIG.name} Admissions Team
📞 ${SCHOOL_CONFIG.phone}

Reference ID: ${submissionId}
    `;
    
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody,
      name: SCHOOL_CONFIG.name + " Admissions"
    });
    
    // Log successful email
    logEmail(data.email, "Visit Request Confirmation", "Success", submissionId);
    
    return true;
    
  } catch (error) {
    logEmail(data.email, "Visit Request Confirmation", "Failed: " + error.message, submissionId);
    logError("Email Send Failed", error.message);
    return false;
  }
}

/**
 * Send confirmation email for Admission Inquiry
 */
function sendAdmissionConfirmationEmail(data, submissionId) {
  try {
    const subject = `Admission Inquiry Received – ${SCHOOL_CONFIG.name}`;
    
    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #E91E63, #FF9800); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .details { background: #fff8f0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #E91E63; }
        .details li { margin: 10px 0; list-style: none; }
        .footer { background: #f1f1f1; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
        .highlight { color: #E91E63; font-weight: bold; }
        .badge { display: inline-block; background: #E91E63; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎨 ${SCHOOL_CONFIG.name}</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${data.parentName}</strong>,</p>
          
          <p>Thank you for your admission inquiry at <span class="highlight">${SCHOOL_CONFIG.name}</span>! 🌈</p>
          
          <p>We have successfully received the details for <strong>${data.childName}</strong> applying for <span class="badge">${data.program}</span>.</p>
          
          <div class="details">
            <h3 style="margin-top: 0; color: #E91E63;">📋 Inquiry Summary:</h3>
            <ul style="padding-left: 0;">
              <li>👶 <strong>Child's Name:</strong> ${data.childName}</li>
              <li>🎂 <strong>Child's Age:</strong> ${data.childAge} years</li>
              <li>📚 <strong>Program:</strong> ${data.program}</li>
              <li>📞 <strong>Contact:</strong> ${data.phone}</li>
              ${data.message ? '<li>💬 <strong>Your Query:</strong> ' + data.message + '</li>' : ''}
            </ul>
          </div>
          
          <p>Our team will connect with you shortly to guide you through the next steps of the admission process.</p>
          
          <p style="margin-top: 30px;">Warm regards,<br>
          <strong>${SCHOOL_CONFIG.name} Admissions Team</strong><br>
          📞 ${SCHOOL_CONFIG.phone}<br>
          ✉️ ${SCHOOL_CONFIG.email}</p>
        </div>
        <div class="footer">
          <p>${SCHOOL_CONFIG.address}</p>
          <p>Reference ID: ${submissionId}</p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    const plainTextBody = `
Hello ${data.parentName},

Thank you for your admission inquiry at ${SCHOOL_CONFIG.name}.

We have successfully received the details for ${data.childName} applying for ${data.program}.

Inquiry Summary:
• Child's Name: ${data.childName}
• Child's Age: ${data.childAge} years
• Program: ${data.program}
• Contact: ${data.phone}
${data.message ? '• Your Query: ' + data.message : ''}

Our team will connect with you shortly to guide you through the next steps.

Warm regards,
${SCHOOL_CONFIG.name} Admissions Team
📞 ${SCHOOL_CONFIG.phone}
✉️ ${SCHOOL_CONFIG.email}

Reference ID: ${submissionId}
    `;
    
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody,
      name: SCHOOL_CONFIG.name + " Admissions"
    });
    
    // Log successful email
    logEmail(data.email, "Admission Inquiry Confirmation", "Success", submissionId);
    
    return true;
    
  } catch (error) {
    logEmail(data.email, "Admission Inquiry Confirmation", "Failed: " + error.message, submissionId);
    logError("Email Send Failed", error.message);
    return false;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate unique submission ID
 */
function generateSubmissionId(prefix) {
  const timestamp = new Date().getTime().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Check for duplicate submissions (within last 2 minutes)
 */
function isDuplicateSubmission(sheet, email, phone) {
  const data = sheet.getDataRange().getValues();
  const now = new Date().getTime();
  const twoMinutes = 2 * 60 * 1000;
  
  for (let i = data.length - 1; i >= 1; i--) {
    const rowTimestamp = new Date(data[i][0]).getTime();
    const rowEmail = data[i][3];
    const rowPhone = data[i][2];
    
    // Only check recent entries (last 2 minutes)
    if (now - rowTimestamp > twoMinutes) {
      break;
    }
    
    // Check if same email or phone in recent submissions
    if ((email && rowEmail === email) || (phone && rowPhone === phone)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  if (!dateString) return "Not specified";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
}

/**
 * Log email activity
 */
function logEmail(email, type, status, submissionId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let logSheet = ss.getSheetByName(SHEET_NAMES.EMAIL_LOG);
    
    if (!logSheet) {
      logSheet = ss.insertSheet(SHEET_NAMES.EMAIL_LOG);
      logSheet.appendRow(["Timestamp", "Email", "Type", "Status", "Submission ID"]);
      logSheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#9C27B0");
    }
    
    logSheet.appendRow([new Date(), email, type, status, submissionId]);
  } catch (e) {
    console.error("Failed to log email:", e);
  }
}

/**
 * Log errors for debugging
 */
function logError(errorType, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let errorSheet = ss.getSheetByName("Error Log");
    
    if (!errorSheet) {
      errorSheet = ss.insertSheet("Error Log");
      errorSheet.appendRow(["Timestamp", "Error Type", "Details"]);
      errorSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#F44336");
    }
    
    errorSheet.appendRow([new Date(), errorType, details]);
  } catch (e) {
    console.error("Failed to log error:", e);
  }
}

// ============================================
// TEST FUNCTIONS (Run manually for testing)
// ============================================

/**
 * Test Visit Request email
 */
function testVisitEmail() {
  const testData = {
    parentName: "Test Parent",
    phone: "+91 98765 43210",
    email: "test@example.com", // Change to your email for testing
    childName: "Test Child",
    program: "Infant Community (Playgroup)",
    visitDate: "2025-01-15",
    visitTime: "Morning (9-11)"
  };
  
  const result = sendVisitConfirmationEmail(testData, "VR-TEST-123");
  Logger.log("Test result: " + result);
}

/**
 * Test Admission Inquiry email
 */
function testAdmissionEmail() {
  const testData = {
    parentName: "Test Parent",
    phone: "+91 98765 43210",
    email: "test@example.com", // Change to your email for testing
    childName: "Test Child",
    childAge: "3",
    program: "Inquirers (Nursery)",
    message: "I would like to know about the fee structure."
  };
  
  const result = sendAdmissionConfirmationEmail(testData, "AI-TEST-123");
  Logger.log("Test result: " + result);
}

/**
 * Initialize sheets (run once after setup)
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create Visit Requests sheet
  if (!ss.getSheetByName(SHEET_NAMES.VISIT_REQUEST)) {
    const sheet = ss.insertSheet(SHEET_NAMES.VISIT_REQUEST);
    sheet.appendRow([
      "Timestamp", "Parent Name", "Phone", "Email", "Child Name", 
      "Program", "Visit Date", "Visit Time", "Email Sent", "Submission ID"
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#4A90D9").setFontColor("white");
    sheet.setFrozenRows(1);
  }
  
  // Create Admission Inquiries sheet
  if (!ss.getSheetByName(SHEET_NAMES.ADMISSION_INQUIRY)) {
    const sheet = ss.insertSheet(SHEET_NAMES.ADMISSION_INQUIRY);
    sheet.appendRow([
      "Timestamp", "Parent Name", "Phone", "Email", "Child Name", 
      "Child Age", "Program", "Message", "Email Sent", "Submission ID"
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#E91E63").setFontColor("white");
    sheet.setFrozenRows(1);
  }
  
  // Create Email Log sheet
  if (!ss.getSheetByName(SHEET_NAMES.EMAIL_LOG)) {
    const sheet = ss.insertSheet(SHEET_NAMES.EMAIL_LOG);
    sheet.appendRow(["Timestamp", "Email", "Type", "Status", "Submission ID"]);
    sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#9C27B0").setFontColor("white");
    sheet.setFrozenRows(1);
  }
  
  Logger.log("All sheets initialized successfully!");
}
