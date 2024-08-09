import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function POST(request) {
  const { firstname, lastname, date, people, email } = await request.json();
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!firstname || !lastname || !email || !date || !people || !contactEmail) {
    console.log("INVALID_PARAMETER");
    return NextResponse.json({ message: "INVALID_PARAMETER" });
  }

  const sendGridMail = {
    to: contactEmail,
    from: contactEmail,
   
    templateId: process.env.SENDGRID_TEMPLATE_1,
    dynamic_template_data: {
      subject: 'Nouvelle réservation',
      prenom: firstname,
      nom: lastname,
      email: email,
      date:date,
      restaurant : process.env.RESTO,
      couverts : people
    }
  };

  console.log(sendGridMail)

  sgMail.setApiKey(process.env.KEY_SENDGRID);

  try {
    const { data } = await sgMail.send(sendGridMail);
    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
