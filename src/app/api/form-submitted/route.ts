import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, phone, usertype, isconsulted } = body;

    const { data, error } = await supabaseServer.from("formsubmitted").insert([
      {
        firstname,
        lastname,
        email,
        phone,
        usertype,
        isconsulted,
      },
    ]);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
