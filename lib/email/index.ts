import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM || 'CampusHire <onboarding@resend.dev>';

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface OfferLetterEmailParams {
  studentName: string;
  studentEmail: string;
  companyName: string;
  companyLogoUrl?: string | null;
  jobTitle: string;
  salaryPackage: string;
  location: string;
  joiningDate?: string | null;
  offerLetterUrl?: string | null;
  notes?: string | null;
}

interface OfferDecisionEmailParams {
  recruiterName: string;
  recruiterEmail: string;
  studentName: string;
  studentEmail: string;
  companyName: string;
  jobTitle: string;
  decision: 'ACCEPTED' | 'DECLINED';
  notes?: string | null;
}

interface OfferConfirmationEmailParams {
  studentName: string;
  studentEmail: string;
  companyName: string;
  jobTitle: string;
  salaryPackage: string;
  location: string;
}

/**
 * Dispatches an official Job Offer email to the student with offer details and PDF link.
 */
export async function sendOfferLetterEmail(params: OfferLetterEmailParams) {
  const {
    studentName,
    studentEmail,
    companyName,
    companyLogoUrl,
    jobTitle,
    salaryPackage,
    location,
    joiningDate,
    offerLetterUrl,
    notes,
  } = params;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Official Placement Offer Letter</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #0f172a; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0A2540 0%, #1e40af 50%, #2563eb 100%); padding: 36px 24px; text-align: center; color: #ffffff; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); padding: 4px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.3); }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { padding: 32px 24px; }
        .salutation { font-size: 16px; font-weight: 700; color: #0A2540; margin-bottom: 12px; }
        .offer-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin: 24px 0; }
        .offer-row { padding: 10px 0; border-bottom: 1px solid #edf2f7; }
        .offer-row:last-child { border-bottom: none; }
        .label { color: #64748b; font-size: 13px; font-weight: 600; width: 40%; }
        .value { color: #0f172a; font-size: 13px; font-weight: 700; }
        .highlight-ctc { color: #16a34a; font-size: 18px; font-weight: 800; }
        .cta-container { text-align: center; margin: 32px 0 16px 0; }
        .btn-primary { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px; text-align: center; box-shadow: 0 4px 12px rgba(37,99,235,0.3); margin: 6px; }
        .btn-secondary { display: inline-block; padding: 14px 24px; background: #f8fafc; color: #1e293b !important; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 13px; text-align: center; border: 1px solid #cbd5e1; margin: 6px; }
        .footer { padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; }
        @media only screen and (max-width: 600px) {
          body { padding: 8px; }
          .content { padding: 24px 16px; }
          .header { padding: 28px 16px; }
          .header h1 { font-size: 22px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">🎓 Institutional Campus Placement</div>
          <h1>🎉 Congratulations, ${studentName}!</h1>
          <p>Official employment offer extended by <strong>${companyName}</strong></p>
        </div>
        
        <div class="content">
          <p class="salutation">Dear ${studentName},</p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Following the on-campus recruitment drive, <strong>${companyName}</strong> is delighted to extend an official offer of employment for the role of <strong>${jobTitle}</strong>.
          </p>
          
          <div class="offer-card">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr class="offer-row">
                <td class="label">Hiring Company</td>
                <td class="value">${companyName}</td>
              </tr>
              <tr class="offer-row">
                <td class="label">Designation / Role</td>
                <td class="value">${jobTitle}</td>
              </tr>
              <tr class="offer-row">
                <td class="label">Annual Package (CTC)</td>
                <td class="value highlight-ctc">${salaryPackage}</td>
              </tr>
              <tr class="offer-row">
                <td class="label">Job Location</td>
                <td class="value">${location}</td>
              </tr>
              ${joiningDate ? `
              <tr class="offer-row">
                <td class="label">Joining Date</td>
                <td class="value">${new Date(joiningDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
              </tr>` : ''}
              ${notes ? `
              <tr class="offer-row">
                <td class="label">Recruiter Notes</td>
                <td class="value" style="font-weight: 500; color: #475569;">${notes}</td>
              </tr>` : ''}
            </table>
          </div>

          <p style="font-size: 13.5px; line-height: 1.6; color: #475569;">
            📎 Your official signed Offer Letter PDF has been attached to this email. Please review the terms and submit your digital acceptance on the CampusHire student portal.
          </p>

          <div class="cta-container">
            <a href="${appUrl}/student/offers" class="btn-primary">🚀 Review & Accept Offer</a>
            ${offerLetterUrl ? `<a href="${offerLetterUrl}" class="btn-secondary" target="_blank">📄 View PDF Online</a>` : ''}
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0 0 6px 0; font-weight: 600; color: #64748b;">CampusHire Placement Automation System</p>
          <p style="margin: 0;">This email was securely delivered to ${studentEmail}.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!resend) {
    console.log(`[EMAIL_DEV_MODE] Offer email simulated for ${studentEmail}:`, {
      studentName,
      companyName,
      jobTitle,
      salaryPackage,
      offerLetterUrl,
    });
    return { success: true, mode: 'simulated' };
  }

  try {
    const attachments: any[] = [];
    if (offerLetterUrl) {
      try {
        const response = await fetch(offerLetterUrl);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9_-]/g, '_');
          attachments.push({
            filename: `${sanitizedCompanyName}_Offer_Letter.pdf`,
            content: buffer,
          });
        }
      } catch (attachErr) {
        console.warn('[OFFER_LETTER_PDF_FETCH_FAILED]', attachErr);
      }
    }

    const result = await resend.emails.send({
      from: emailFrom,
      to: [studentEmail],
      subject: `🎉 Placement Offer: ${jobTitle} at ${companyName}`,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('[RESEND_OFFER_EMAIL_ERROR]', error);
    return { success: false, error };
  }
}

/**
 * Notifies the recruiter when a student accepts or declines an offer.
 */
export async function sendOfferDecisionToRecruiterEmail(params: OfferDecisionEmailParams) {
  const {
    recruiterName,
    recruiterEmail,
    studentName,
    studentEmail,
    companyName,
    jobTitle,
    decision,
    notes,
  } = params;

  const isAccepted = decision === 'ACCEPTED';
  const headerColor = isAccepted ? '#16a34a' : '#dc2626';
  const badgeText = isAccepted ? 'OFFER ACCEPTED' : 'OFFER DECLINED';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: ${headerColor}; padding: 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
        .content { padding: 28px 24px; }
        .badge { display: inline-block; padding: 6px 14px; background-color: ${isAccepted ? '#dcfce7' : '#fee2e2'}; color: ${isAccepted ? '#15803d' : '#b91c1c'}; border-radius: 9999px; font-weight: 700; font-size: 13px; }
        .footer { padding: 16px 24px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Candidate Response: ${badgeText}</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${recruiterName || 'Recruiter'}</strong>,</p>
          <p>Candidate <strong>${studentName}</strong> (${studentEmail}) has submitted their formal decision for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>:</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <span class="badge">${badgeText}</span>
          </div>

          ${notes ? `<p><strong>Student Remarks:</strong> ${notes}</p>` : ''}
          <p>You can view updated applicant status and recruitment metrics on your CampusHire recruiter dashboard.</p>
        </div>
        <div class="footer">
          <p>CampusHire Automated Recruiter Notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!resend) {
    console.log(`[EMAIL_DEV_MODE] Recruiter decision notification simulated for ${recruiterEmail}:`, {
      studentName,
      decision,
      jobTitle,
    });
    return { success: true, mode: 'simulated' };
  }

  try {
    const result = await resend.emails.send({
      from: emailFrom,
      to: [recruiterEmail],
      subject: `Candidate ${studentName} has ${decision} your offer for ${jobTitle}`,
      html,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('[RESEND_RECRUITER_NOTIFICATION_ERROR]', error);
    return { success: false, error };
  }
}

/**
 * Sends a congratulations confirmation email to the student upon accepting an offer.
 */
export async function sendOfferConfirmationToStudentEmail(params: OfferConfirmationEmailParams) {
  const { studentName, studentEmail, companyName, jobTitle, salaryPackage, location } = params;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: #16a34a; padding: 28px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
        .content { padding: 28px 24px; }
        .footer { padding: 16px 24px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🎓 Placement Confirmed!</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${studentName}</strong>,</p>
          <p>Congratulations! You have successfully accepted the placement offer for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> (${salaryPackage}, ${location}).</p>
          <p>Your college TPO Cell and the recruitment team at ${companyName} have been notified. In accordance with the institutional placement guidelines, your profile is now marked as <strong>Placed</strong>.</p>
          <p>We wish you immense success in your professional career!</p>
        </div>
        <div class="footer">
          <p>CampusHire Placement Cell</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!resend) {
    console.log(`[EMAIL_DEV_MODE] Student confirmation email simulated for ${studentEmail}:`, {
      companyName,
      jobTitle,
    });
    return { success: true, mode: 'simulated' };
  }

  try {
    const result = await resend.emails.send({
      from: emailFrom,
      to: [studentEmail],
      subject: `🎓 Placement Confirmation: Congratulations on joining ${companyName}!`,
      html,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('[RESEND_STUDENT_CONFIRMATION_ERROR]', error);
    return { success: false, error };
  }
}
