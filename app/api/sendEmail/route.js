import { EmailTemplate } from "@/lib/emailTemplate";
import { VerifyMailTemplate } from "@/lib/mailTemplate";
import { Resend } from "resend";
// import { VerifyMailTemplate } from "@/lib/mailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();
  try {
    const { email, name, verifyToken } = body;
    const data = SendMail(email, name, verifyToken);

    return Response.json(data);
  } catch (error) {
    console.log(error.message);

    return Response.json({ error }, { status: 500 });
  }
}
async function SendMail(email, name, verifyToken) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      //   from: "Acme <easySolar@resend.dev>",
      to: [email],
      subject: "verify your email",
      html: VerifyMailTemplate.replace("{name}", name).replace(
        "{code}",
        verifyToken
      ),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return data;
  } catch (error) {
    console.log(error.message);

    return Response.json({ error }, { status: 500 });
  }
}
