import { NextResponse } from "next/server";
const API_KEY = process.env.X_API_KEY!;

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, option, subject, message } =
    await req.json();

  // validate the data
  if (!firstName || !lastName || !email || !phone || !option) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Decide which module to hit
  let moduleUrl = "https://eu-crm.vercel.app/api/leads";
  let data: any = {
    name: `${firstName} ${lastName}`,
    email: email,
    company: option,
    phone: phone,
    notes: subject,
    message: message,
    status: "new",
    source: {
      channel: "eucareerserwis.pl",
      compaign: `${option}`,
    },
  };

  // check if api key is present
  if (!API_KEY) {
    return NextResponse.json({ error: "API Key not found" }, { status: 500 });
  }

  // Post to Zoho CRM
  const crmResponse = await fetch(moduleUrl, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const crmData = await crmResponse.json();
  return NextResponse.json(crmData);
}
