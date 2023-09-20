import { supabase } from "@/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  console.log(data, error);

  if (error) {
    return NextResponse.json({ error: error });
  }

  return NextResponse.json({ message: data });
}
