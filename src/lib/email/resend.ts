/* ─── Resend Email Client for MyNewStaff SaaS ─────────────────────────── */

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM = "MyNewStaff <hello@mynewstaff.ai>";
export const EMAIL_REPLY_TO = "contact@mynewstaff.ai";

export async function sendEmail(
  to: string,
  template: { subject: string; html: string }
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      replyTo: EMAIL_REPLY_TO,
      to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log(`[email] Sent "${template.subject}" to ${to} (id: ${data?.id})`);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[email] Exception:", err);
    return { success: false, error: String(err) };
  }
}
