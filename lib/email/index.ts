import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM || 'CampusHire <onboarding@resend.dev>';

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface OfferLetterEmailParams {
  offerId?: string | null;
  applicationId?: string | null;
  studentName: string;
  studentEmail: string;
  companyName: string;
  companyLogoUrl?: string | null;
  jobTitle: string;
  salaryPackage: string;
  location: string;
  employmentType?: string | null;
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
 * Dispatches a premium, branded Job Offer email to the student matching institutional and tech-giant standards.
 */
export async function sendOfferLetterEmail(params: OfferLetterEmailParams) {
  const {
    offerId,
    applicationId,
    studentName,
    studentEmail,
    companyName,
    companyLogoUrl,
    jobTitle,
    salaryPackage,
    location,
    employmentType,
    joiningDate,
    offerLetterUrl,
    notes,
  } = params;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const currentYear = new Date().getFullYear();

  // Action URLs for the student portal
  const offerQueryParam = offerId ? `offerId=${encodeURIComponent(offerId)}` : '';
  const portalAcceptUrl = offerId
    ? `${appUrl}/student/offers?${offerQueryParam}&action=accept`
    : `${appUrl}/student/offers?action=accept`;
  const portalDeclineUrl = offerId
    ? `${appUrl}/student/offers?${offerQueryParam}&action=decline`
    : `${appUrl}/student/offers?action=decline`;
  const portalReviewUrl = offerId
    ? `${appUrl}/student/offers?${offerQueryParam}&action=review`
    : `${appUrl}/student/offers`;

  // Format Salary Package cleanly with currency symbol
  const salaryDisplay = salaryPackage
    ? salaryPackage.startsWith('₹') || salaryPackage.startsWith('$')
      ? salaryPackage
      : `₹ ${salaryPackage}`
    : 'Competitive Package';

  // Format Joining Date gracefully
  const joiningDateDisplay = joiningDate
    ? new Date(joiningDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'To be confirmed';

  // Format Employment Type gracefully
  const employmentTypeDisplay =
    employmentType === 'FULL_TIME' || employmentType === 'Full Time'
      ? 'Full Time'
      : employmentType === 'INTERNSHIP' || employmentType === 'Internship'
      ? 'Internship'
      : employmentType === 'INTERN_PLUS_FTE' || employmentType === 'Intern + FTE'
      ? 'Intern + FTE'
      : employmentType || 'Full Time';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Congratulations! You've received a job offer from ${companyName}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f1f3f4;
          margin: 0;
          padding: 24px 12px;
          color: #202124;
          -webkit-font-smoothing: antialiased;
        }
        .email-wrapper {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid #e2e8f0;
        }
        .inner-content {
          padding: 36px 32px 28px 32px;
        }
        @media only screen and (max-width: 600px) {
          body { padding: 8px 4px; }
          .inner-content { padding: 24px 16px 20px 16px; }
          .hero-col-left { width: 100% !important; display: block !important; }
          .hero-col-right { width: 100% !important; display: block !important; margin-top: 16px !important; }
          .offer-grid-cell { width: 100% !important; display: block !important; padding-right: 0 !important; padding-left: 0 !important; margin-bottom: 12px !important; }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="inner-content">
          <!-- Top Brand Bar -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
            <tr>
              <td valign="middle" align="left">
                ${
                  companyLogoUrl
                    ? `<img src="${companyLogoUrl}" alt="${companyName}" style="max-height: 38px; max-width: 160px; object-fit: contain; vertical-align: middle;" />`
                    : `<span style="font-size: 24px; font-weight: 800; color: #1a73e8; letter-spacing: -0.5px;">${companyName}</span>`
                }
              </td>
              <td valign="middle" align="right">
                <span style="font-size: 13px; color: #5f6368; font-weight: 500;">Build for everyone</span>
              </td>
            </tr>
          </table>

          <!-- Hero Section: Two-Column Responsive Layout -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="hero-col-left" valign="top" style="width: 62%; padding-right: 12px;">
                <div style="font-size: 11px; font-weight: 700; color: #5f6368; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 8px;">
                  CAMPUS RECRUITMENT
                </div>
                <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #202124; line-height: 1.15; letter-spacing: -0.5px;">
                  Congratulations!
                </h1>
                <div style="margin-top: 6px; font-size: 16.5px; font-weight: 700; color: #3c4043;">
                  You've been selected. &#127881;
                </div>
                <p style="margin: 12px 0 0 0; font-size: 13.5px; line-height: 1.55; color: #5f6368;">
                  We're excited to offer you the opportunity to be a part of <strong style="color: #202124;">${companyName}</strong>. Your hard work, talent, and dedication have truly stood out.
                </p>
              </td>
              <td class="hero-col-right" valign="middle" align="center" style="width: 38%;">
                <!-- Dynamic Visual Graphic -->
                <div style="text-align: center;">
                  <svg width="140" height="110" viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Celebration bursts -->
                    <line x1="16" y1="28" x2="28" y2="38" stroke="#34A853" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="12" y1="55" x2="24" y2="55" stroke="#FBBC04" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="18" y1="82" x2="30" y2="74" stroke="#4285F4" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="70" y1="8" x2="70" y2="20" stroke="#EA4335" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="122" y1="28" x2="110" y2="38" stroke="#4285F4" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="128" y1="55" x2="116" y2="55" stroke="#34A853" stroke-width="3.5" stroke-linecap="round"/>
                    <line x1="122" y1="82" x2="110" y2="74" stroke="#EA4335" stroke-width="3.5" stroke-linecap="round"/>
                    
                    <!-- Inner Verified Card -->
                    <rect x="38" y="16" width="64" height="82" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
                    <rect x="48" y="76" width="44" height="4" rx="2" fill="#E2E8F0"/>
                    <rect x="52" y="84" width="36" height="3" rx="1.5" fill="#F1F5F9"/>

                    <!-- Blue Check Icon -->
                    <circle cx="70" cy="48" r="17" fill="#1A73E8"/>
                    <path d="M63 48L68 53L77 43" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div style="font-family: 'Brush Script MT', 'Caveat', 'Segoe Script', cursive, sans-serif; font-size: 19px; color: #1a73e8; font-weight: 700; transform: rotate(-5deg); margin-top: -2px;">
                    Better Together
                  </div>
                </div>
              </td>
            </tr>
          </table>

          <!-- Salutation & Body Text -->
          <div style="margin-top: 28px; font-size: 15px; font-weight: 800; color: #202124;">
            Hi ${studentName},
          </div>
          <p style="margin: 10px 0 20px 0; font-size: 14px; line-height: 1.6; color: #3c4043;">
            We are pleased to inform you that you have been selected for the role of <strong style="color: #202124;">${jobTitle}</strong> at <strong style="color: #202124;">${companyName}</strong> through our campus recruitment program. Please find the offer details below.
          </p>

          <!-- Offer Details Card -->
          <div style="background-color: #f0f7ff; border: 1px solid #d0e2ff; border-radius: 16px; padding: 20px 22px; margin-bottom: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
              <tr>
                <td valign="middle" style="width: 22px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="#1A73E8"/>
                  </svg>
                </td>
                <td valign="middle" style="padding-left: 8px;">
                  <span style="font-size: 15px; font-weight: 800; color: #1a73e8;">Offer Details</span>
                </td>
              </tr>
            </table>

            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <!-- Row 1: Company & CTC -->
              <tr>
                <td class="offer-grid-cell" valign="top" style="width: 50%; padding-bottom: 14px; padding-right: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="width: 26px;">
                        <span style="font-size: 16px;">🏢</span>
                      </td>
                      <td valign="middle" style="padding-left: 6px;">
                        <div style="font-size: 11.5px; font-weight: 600; color: #5f6368;">Company</div>
                        <div style="font-size: 13.5px; font-weight: 800; color: #202124; margin-top: 1px;">${companyName}</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="offer-grid-cell" valign="top" style="width: 50%; padding-bottom: 14px; padding-left: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="width: 26px;">
                        <span style="font-size: 16px;">💰</span>
                      </td>
                      <td valign="middle" style="padding-left: 6px;">
                        <div style="font-size: 11.5px; font-weight: 600; color: #5f6368;">CTC (Annual)</div>
                        <div style="font-size: 13.5px; font-weight: 800; color: #202124; margin-top: 1px;">${salaryDisplay}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Row 2: Role & Location -->
              <tr>
                <td class="offer-grid-cell" valign="top" style="width: 50%; padding-bottom: 14px; padding-right: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="width: 26px;">
                        <span style="font-size: 16px;">💼</span>
                      </td>
                      <td valign="middle" style="padding-left: 6px;">
                        <div style="font-size: 11.5px; font-weight: 600; color: #5f6368;">Role</div>
                        <div style="font-size: 13.5px; font-weight: 800; color: #202124; margin-top: 1px;">${jobTitle}</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="offer-grid-cell" valign="top" style="width: 50%; padding-bottom: 14px; padding-left: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="width: 26px;">
                        <span style="font-size: 16px;">📍</span>
                      </td>
                      <td valign="middle" style="padding-left: 6px;">
                        <div style="font-size: 11.5px; font-weight: 600; color: #5f6368;">Location</div>
                        <div style="font-size: 13.5px; font-weight: 800; color: #202124; margin-top: 1px;">${location}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Row 3: Employment Type & Joining Date -->
              <tr>
                <td class="offer-grid-cell" valign="top" style="width: 50%; padding-right: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="width: 26px;">
                        <span style="font-size: 16px;">📄</span>
                      </td>
                      <td valign="middle" style="padding-left: 6px;">
                        <div style="font-size: 11.5px; font-weight: 600; color: #5f6368;">Employment Type</div>
                        <div style="font-size: 13.5px; font-weight: 800; color: #202124; margin-top: 1px;">${employmentTypeDisplay}</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="offer-grid-cell" valign="top" style="width: 50%; padding-left: 10px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="width: 26px;">
                        <span style="font-size: 16px;">📅</span>
                      </td>
                      <td valign="middle" style="padding-left: 6px;">
                        <div style="font-size: 11.5px; font-weight: 600; color: #5f6368;">Joining Date</div>
                        <div style="font-size: 13.5px; font-weight: 800; color: #202124; margin-top: 1px;">${joiningDateDisplay}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${
                notes
                  ? `
              <tr>
                <td colspan="2" style="padding-top: 14px; border-top: 1px dashed #c2dbfe; margin-top: 10px;">
                  <div style="font-size: 11.5px; font-weight: 600; color: #5f6368;">Recruiter Notes</div>
                  <div style="font-size: 13px; font-weight: 500; color: #3c4043; margin-top: 2px;">${notes}</div>
                </td>
              </tr>
              `
                  : ''
              }
            </table>
          </div>

          <!-- Offer Letter Attached Box -->
          <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 14px 18px; margin-bottom: 22px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td valign="middle" style="width: 38px;">
                  <div style="width: 34px; height: 38px; background-color: #fee2e2; border: 1px solid #fca5a5; border-radius: 6px; text-align: center; line-height: 38px; font-size: 16px;">
                    📕
                  </div>
                </td>
                <td valign="middle" style="padding-left: 10px;">
                  <div style="font-size: 13.5px; font-weight: 700; color: #065f46;">
                    Your Offer Letter is Attached
                  </div>
                  <div style="font-size: 12px; color: #047857; margin-top: 2px;">
                    Please find your offer letter in the attachment (PDF).
                  </div>
                </td>
                <td valign="middle" align="right" style="width: 130px;">
                  <a href="${offerLetterUrl || `${appUrl}/student/offers`}" target="_blank" style="display: inline-block; background-color: #ffffff; color: #1a73e8; border: 1px solid #bfdbfe; border-radius: 8px; padding: 7px 12px; font-size: 12.5px; font-weight: 700; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.06); white-space: nowrap;">
                    ⬇ Download PDF
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Action Required: Accept / Decline Interactive Box -->
          <div style="background-color: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 22px 20px; margin-bottom: 24px; text-align: center;">
            <div style="font-size: 11px; font-weight: 800; color: #475569; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px;">
              ACTION REQUIRED
            </div>
            <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">
              Respond to Your Job Offer
            </div>
            <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b; line-height: 1.45;">
              Please submit your decision to confirm your placement with <strong>${companyName}</strong>:
            </p>

            <!-- Buttons Table -->
            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 14px auto;">
              <tr>
                <td style="padding: 0 6px;" align="center">
                  <a href="${portalAcceptUrl}" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-weight: 700; font-size: 13.5px; padding: 11px 22px; border-radius: 10px; text-decoration: none; box-shadow: 0 2px 6px rgba(22, 163, 74, 0.3); border: 1px solid #15803d; white-space: nowrap;">
                    &#10003; Accept Offer
                  </a>
                </td>
                <td style="padding: 0 6px;" align="center">
                  <a href="${portalDeclineUrl}" target="_blank" style="display: inline-block; background-color: #ffffff; color: #dc2626; font-weight: 700; font-size: 13.5px; padding: 11px 20px; border-radius: 10px; text-decoration: none; border: 1px solid #fca5a5; box-shadow: 0 1px 3px rgba(0,0,0,0.04); white-space: nowrap;">
                    &#10005; Decline Offer
                  </a>
                </td>
              </tr>
            </table>

            <div style="margin-top: 8px;">
              <a href="${portalReviewUrl}" target="_blank" style="font-size: 12.5px; font-weight: 600; color: #2563eb; text-decoration: underline;">
                View full contract details on your CampusHire Dashboard &rarr;
              </a>
            </div>

            <p style="margin: 12px 0 0 0; font-size: 11px; color: #94a3b8; line-height: 1.4;">
              <em>Security Notice: Clicking opens your verified student portal where you will digitally confirm your response before any status changes.</em>
            </p>
          </div>

          <!-- Closing Body -->
          <p style="font-size: 14px; line-height: 1.6; color: #3c4043; margin-bottom: 22px;">
            We believe you will make a significant impact at <strong>${companyName}</strong>. We look forward to welcoming you to the team!
          </p>

          <!-- Sign-off -->
          <div style="font-size: 14px; color: #3c4043; line-height: 1.5; margin-bottom: 26px;">
            Best regards,<br/>
            <strong style="color: #202124; font-size: 14.5px;">${companyName} Campus Recruitment Team</strong><br/>
            <span style="font-size: 12.5px; color: #1a73e8; font-weight: 600;">Build. Grow. Belong.</span>
          </div>

          <!-- Footer & Social Links -->
          <div style="text-align: center; padding-top: 18px; border-top: 1px solid #f1f3f4;">
            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 12px;">
              <tr>
                <td style="padding: 0 4px;">
                  <a href="https://linkedin.com" target="_blank" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; background-color: #0077b5; color: #ffffff; border-radius: 6px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold;">in</a>
                </td>
                <td style="padding: 0 4px;">
                  <a href="https://x.com" target="_blank" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; background-color: #000000; color: #ffffff; border-radius: 6px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold;">𝕏</a>
                </td>
                <td style="padding: 0 4px;">
                  <a href="https://youtube.com" target="_blank" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; background-color: #ff0000; color: #ffffff; border-radius: 6px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold;">▶</a>
                </td>
                <td style="padding: 0 4px;">
                  <a href="https://instagram.com" target="_blank" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; background: #e1306c; color: #ffffff; border-radius: 6px; text-align: center; text-decoration: none; font-size: 12px; font-weight: bold;">📷</a>
                </td>
              </tr>
            </table>

            <p style="margin: 0 0 6px 0; font-size: 11.5px; color: #70757a;">
              &copy; ${currentYear} ${companyName} LLC. Powered by CampusHire Institutional Placement Platform.
            </p>
            <p style="margin: 0; font-size: 11.5px; color: #1a73e8;">
              <a href="${appUrl}/privacy" style="color: #1a73e8; text-decoration: none;">Privacy Policy</a> &nbsp;|&nbsp; 
              <a href="${appUrl}/careers" style="color: #1a73e8; text-decoration: none;">Careers</a> &nbsp;|&nbsp; 
              <a href="${appUrl}/unsubscribe" style="color: #1a73e8; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
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
      subject: `🎉 Congratulations! You've received a job offer from ${companyName}`,
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
