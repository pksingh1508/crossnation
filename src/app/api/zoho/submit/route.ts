import { NextResponse } from "next/server";

async function getAccessToken() {
  const tokenResponse = await fetch("https://accounts.zoho.eu/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      grant_type: "refresh_token",
    }),
  });

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, option, subject, message } =
    await req.json();

  const accessToken = await getAccessToken();

  // Decide which module to hit
  let moduleUrl = "https://www.zohoapis.eu/bigin/v2/Contacts";
  let data: any = {
    First_Name: firstName,
    Last_Name: lastName,
    Email: email,
    Phone: phone,
    Title: subject,
    Description: message,
    Who_They_Are: option,
  };

  // Post to Zoho CRM
  const crmResponse = await fetch(moduleUrl, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [data] }),
  });

  const crmData = await crmResponse.json();
  return NextResponse.json(crmData);
}
