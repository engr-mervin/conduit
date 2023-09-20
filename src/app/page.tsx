"use client";

import { supabase } from "@/client";
import SigninForm from "@/components/forms/SigninForm";
import SignUpForm from "@/components/forms/SignupForm";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

enum Mode {
  Signup,
  Signin,
}

const Home = function () {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<Mode>(Mode.Signup);

  const checkUser = async function () {
    const getUserResponse = await fetch("/api/users");
    const userData = await getUserResponse.json();
    console.log(userData);
    setUser(userData.data.user);
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
      {mode === Mode.Signup ? <SignUpForm /> : <SigninForm />}
      <button
        onClick={(e) => {
          setMode((prev) => (prev === Mode.Signin ? Mode.Signup : Mode.Signin));
        }}
      >
        Switch
      </button>
    </div>
  );
};

export default Home;
