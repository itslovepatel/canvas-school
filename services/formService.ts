/**
 * Google Sheets Form Submission Service
 * Handles form submissions to Google Apps Script Web App
 */

// Get the Google Script URL from environment variables
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export interface VisitRequestData {
  parentName: string;
  phone: string;
  email?: string;
  childName?: string;
  program?: string;
  visitDate: string;
  visitTime: string;
}

export interface AdmissionInquiryData {
  parentName: string;
  phone: string;
  email?: string;
  childName: string;
  childAge: string;
  program: string;
  message?: string;
}

export interface FormSubmissionResponse {
  status: 'success' | 'error' | 'duplicate';
  message: string;
  submissionId?: string;
  emailSent?: boolean;
}

/**
 * Submit a school visit request
 */
export async function submitVisitRequest(data: VisitRequestData): Promise<FormSubmissionResponse> {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn('Google Script URL not configured. Form data logged to console.');
      console.log('Visit Request Data:', data);
      return {
        status: 'success',
        message: 'Form submitted (demo mode - configure VITE_GOOGLE_SCRIPT_URL for actual submission)',
        submissionId: `DEMO-${Date.now()}`
      };
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: 'visit_request',
        ...data
      })
    });

    // With no-cors, we can't read the response, so we assume success
    // The actual response handling is done via the success callback
    return {
      status: 'success',
      message: 'Your visit request has been submitted successfully!',
      emailSent: !!data.email
    };

  } catch (error) {
    console.error('Visit request submission error:', error);
    return {
      status: 'error',
      message: 'Failed to submit. Please try again or call us directly.'
    };
  }
}

/**
 * Submit an admission inquiry
 */
export async function submitAdmissionInquiry(data: AdmissionInquiryData): Promise<FormSubmissionResponse> {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn('Google Script URL not configured. Form data logged to console.');
      console.log('Admission Inquiry Data:', data);
      return {
        status: 'success',
        message: 'Form submitted (demo mode - configure VITE_GOOGLE_SCRIPT_URL for actual submission)',
        submissionId: `DEMO-${Date.now()}`
      };
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: 'admission_inquiry',
        ...data
      })
    });

    // With no-cors, we can't read the response, so we assume success
    return {
      status: 'success',
      message: 'Your admission inquiry has been submitted successfully!',
      emailSent: !!data.email
    };

  } catch (error) {
    console.error('Admission inquiry submission error:', error);
    return {
      status: 'error',
      message: 'Failed to submit. Please try again or call us directly.'
    };
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}
