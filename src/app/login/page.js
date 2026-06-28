"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { RiGoogleFill } from "react-icons/ri";
import PageTransition from "@/components/layout/PageTransition";
import { Button, FormField } from "@/components/ui";
import { signIn } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate() {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await signIn.email({
        email: form.email,
        password: form.password,
      });
      if (error) throw new Error(error.message || "Invalid credentials");
      toast.success("Login successful!");
      router.push(redirectTo);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}${redirectTo}`,
      });
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  }

  return (
    <div className="w-full max-w-md bg-base-100/95 backdrop-blur-sm rounded-2xl border border-base-content/5 p-6 md:p-8 shadow-2xl shadow-black/20">
      <div className="text-center mb-8">
        <h1 className="text-2xl!">Welcome Back</h1>
        <p className="text-sm text-base-content/50 mt-1">
          Sign in to book your next game
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          error={errors.password}
        />
        <Button
          variant="accent"
          className="w-full mt-2"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="divider text-base-content/30 text-xs my-6">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full rounded-2xl gap-2 text-base-content/70 hover:text-base-content"
      >
        <RiGoogleFill className="text-lg" />
        Continue with Google
      </button>

      <p className="text-sm text-center text-base-content/50 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <PageTransition className="flex-1 flex items-center justify-center px-4 py-12">
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1920&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />
      <Suspense
        fallback={
          <div className="w-full max-w-md h-96 bg-base-200 rounded-2xl animate-pulse" />
        }
      >
        <LoginForm />
      </Suspense>
    </PageTransition>
  );
}
