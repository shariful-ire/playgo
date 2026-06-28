"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RiGoogleFill, RiCheckLine, RiCloseLine } from "react-icons/ri";
import PageTransition from "@/components/layout/PageTransition";
import { Button, FormField } from "@/components/ui";
import { signUp, signIn } from "@/lib/auth-client";

const PASSWORD_RULES = [
  { key: "length", label: "At least 6 characters", test: (p) => p.length >= 6 },
  { key: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { key: "lower", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else {
      const failing = PASSWORD_RULES.filter((r) => !r.test(form.password));
      if (failing.length > 0) errs.password = "Password does not meet all requirements";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoUrl || undefined,
      });
      if (error) throw new Error(error.message || "Registration failed");
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
      });
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  }

  return (
    <PageTransition className="flex-1 flex items-center justify-center px-4 py-12">
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1920&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />

      <div className="w-full max-w-md bg-base-100/95 backdrop-blur-sm rounded-2xl border border-base-content/5 p-6 md:p-8 shadow-2xl shadow-black/20">
        <div className="text-center mb-8">
          <h1 className="text-2xl!">Create Account</h1>
          <p className="text-sm text-base-content/50 mt-1">
            Join GameZone and start booking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            error={errors.name}
          />

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
            label="Photo URL (optional)"
            name="photoUrl"
            placeholder="https://example.com/photo.jpg"
            value={form.photoUrl}
            onChange={(e) => update("photoUrl", e.target.value)}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            error={errors.password}
          />

          {/* Live password rules checklist */}
          <div className="space-y-1.5 pl-1">
            {PASSWORD_RULES.map((rule) => {
              const passed = rule.test(form.password);
              return (
                <div
                  key={rule.key}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    form.password
                      ? passed
                        ? "text-success"
                        : "text-error/70"
                      : "text-base-content/30"
                  }`}
                >
                  {form.password ? (
                    passed ? (
                      <RiCheckLine className="text-sm" />
                    ) : (
                      <RiCloseLine className="text-sm" />
                    )
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-current inline-block" />
                  )}
                  {rule.label}
                </div>
              );
            })}
          </div>

          <Button
            variant="accent"
            className="w-full mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Register"
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
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </PageTransition>
  );
}
