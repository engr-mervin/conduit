"use client";

import { supabase } from "@/client";
import SignUpForm from "@/components/forms/SignupForm";
import { User } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { useEffect, useState } from "react";

enum Mode {
  Signup,
  Signin,
}

const Home = function () {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<Mode>(Mode.Signup);

  const checkUser = async function () {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      console.log(123456);
      checkUser();
    });
  }, []);

  const signOut = async function () {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="App">
      {mode === Mode.Signup ? <SignUpForm /> : <p>Sign in</p>}
    </div>
  );
};

export default Home;
SupabaseAuthClient;
