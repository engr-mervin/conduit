import { supabase } from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        preferred_name: formData.get("preferredName") as string,
        user_name: formData.get("userName") as string,
      },
    },
  });

  console.log(data, error);

  if (error) {
    return NextResponse.json({ error: error });
  }

  return NextResponse.json({ message: data });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: error });
  }

  return NextResponse.json({ message: data });
}
