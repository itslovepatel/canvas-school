# Google Apps Script - Email Confirmation Setup

This folder contains the Google Apps Script code for handling form submissions and sending automatic email confirmations.

## 📋 Setup Instructions

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named: **"Canwas Public School Submissions"**
3. Keep this sheet open

### Step 2: Open Apps Script Editor

1. In the Google Sheet, go to **Extensions > Apps Script**
2. Delete any default code in the editor
3. Copy the entire content from `Code.gs` and paste it
4. Click the save icon (💾) or press `Ctrl+S`
5. Name the project: **"Canwas Form Handler"**

### Step 3: Initialize Sheets

1. In the Apps Script editor, find the function dropdown (top toolbar)
2. Select `initializeSheets`
3. Click **Run** (▶️)
4. Grant necessary permissions when prompted:
   - Allow access to Google Sheets
   - Allow sending emails on your behalf

### Step 4: Test Email Sending

1. Open `Code.gs` in the Apps Script editor
2. Find `testVisitEmail()` function
3. Change the email address to your personal email
4. Select `testVisitEmail` from the dropdown
5. Click **Run** to test
6. Check your email for the confirmation
7. Repeat with `testAdmissionEmail()` if needed

### Step 5: Deploy as Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type" > Choose **Web app**
3. Configure:
   - **Description**: "Canwas Form API v1.0"
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. **Copy the Web App URL** - You'll need this for the frontend!

### Step 6: Update Frontend

Add the Web App URL to your `.env.local` file:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## 🔧 Configuration

Edit these values in `Code.gs` to match your school:

```javascript
const SCHOOL_CONFIG = {
  name: "Canwas Public School",
  phone: "+91 82099 09098",
  email: "Canvasdausa1377@gmail.com",
  address: "New Mandi Road, Behind Durga Mandir, Dausa",
  website: "www.canwaspublicschool.com"
};
```

## 📊 Sheet Structure

The script automatically creates these sheets:

### 1. Visit Requests
| Timestamp | Parent Name | Phone | Email | Child Name | Program | Visit Date | Visit Time | Email Sent | Submission ID |

### 2. Admission Inquiries  
| Timestamp | Parent Name | Phone | Email | Child Name | Child Age | Program | Message | Email Sent | Submission ID |

### 3. Email Log
| Timestamp | Email | Type | Status | Submission ID |

### 4. Error Log (auto-created if errors occur)
| Timestamp | Error Type | Details |

## 🔒 Security Notes

- The Web App runs with YOUR Google account credentials
- Emails are sent from YOUR Gmail account
- Only form submission data is exposed, not the script logic
- Duplicate submissions within 2 minutes are blocked

## 📧 Email Features

### Visit Request Confirmation
- **Subject**: "Your School Visit Request Has Been Received"
- Includes visit date, time, and child details
- Professional HTML design with plain-text fallback

### Admission Inquiry Confirmation
- **Subject**: "Admission Inquiry Received – Canwas Public School"
- Includes program and child details
- Professional HTML design with plain-text fallback

## 🐛 Troubleshooting

### Emails not sending?
1. Check Google Apps Script daily email quota (100/day for free accounts)
2. Verify the parent email address is valid
3. Check the "Email Log" sheet for error messages

### Form submission fails?
1. Check the "Error Log" sheet
2. Verify Web App is deployed correctly
3. Test with the GET request: Visit the Web App URL in browser

### Duplicate submissions?
The script blocks duplicate submissions within 2 minutes based on email or phone number.

## 🔄 Updating the Script

After making changes to `Code.gs`:
1. Save the file in Apps Script editor
2. Go to **Deploy** > **Manage deployments**
3. Click the edit icon (✏️)
4. Select "New version" under Version
5. Click **Deploy**

The same URL will now serve the updated code.

## 📞 Support

If you encounter issues, check:
1. Apps Script execution logs (View > Execution logs)
2. Error Log sheet in your Google Spreadsheet
3. Browser console for frontend errors
