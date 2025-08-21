import React, { useMemo, useState } from "react";

/**
 * Signup / Registration Page — Multi‑step Wizard (Task ID 2)
 * Tech: React + TailwindCSS (no external deps required)
 *
 * Features implemented:
 * - Stepper (Basic Info → Security → Address → Preferences → Review)
 * - Personal info: first/last name, email (format + async uniqueness), phone (country code), DOB
 * - Account security: password + strength meter + confirm + optional security Q
 * - Address: street, city, state, zip, country (searchable dropdown), set as default
 * - Preferences: newsletter, SMS, preferred language
 * - Terms & Conditions (required) + email verification notice
 * - Social sign-up buttons, header, footer, back to home
 * - Success confirmation modal on submit
 * - Field-level validation + highlight when invalid
 *
 * Notes:
 * - Replace fakeCheckEmailUnique with a real API call.
 * - Plug the final payload into your backend in handleSubmit().
 */

// Minimal country list; extend as needed or inject from API
const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Singapore",
  "United Arab Emirates",
  "Brazil",
  "Japan",
  "South Africa",
  "New Zealand",
];

const LANGUAGES = ["English", "हिन्दी", "Marathi", "Français", "Deutsch", "日本語"];

const securityQuestions = [
  "What is your favorite teacher's name?",
  "What city were you born in?",
  "What was the name of your first pet?",
  "(Skip) I will set this later",
];

// Mock: replace with API call to your backend for true uniqueness check
async function fakeCheckEmailUnique(email) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 600));
  // Demo rule: emails containing "taken" are NOT unique
  return !/taken/i.test(email);
}

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function strengthScore(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}

export default function Signup() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);
  const [emailUnique, setEmailUnique] = useState(null); // null | true | false
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountry: "+91",
    phoneNumber: "",
    dob: "",

    password: "",
    confirmPassword: "",
    securityQuestion: securityQuestions[0],
    securityAnswer: "",

    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    addressDefault: true,

    newsletter: true,
    sms: false,
    language: LANGUAGES[0],

    acceptTerms: false,
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const markTouched = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const emailRegex = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    []
  );

  const phoneRegex = useMemo(
    // very permissive; adjust per markets if needed
    () => /^[0-9\s\-()]{7,15}$/,
    []
  );

  const pwdScore = strengthScore(form.password);

  // Derived validation flags
  const errors = useMemo(() => {
    const e = {};

    if (step === 0) {
      if (!form.firstName) e.firstName = "First name is required";
      if (!form.lastName) e.lastName = "Last name is required";
      if (!emailRegex.test(form.email)) e.email = "Enter a valid email";
      if (!phoneRegex.test(form.phoneNumber)) e.phoneNumber = "Enter a valid phone number";
      if (!form.dob) e.dob = "Date of birth is required";
      if (emailUnique === false) e.email = "Email already exists";
    }

    if (step === 1) {
      if (pwdScore < 3)
        e.password = "Password must include 8+ chars, upper/lowercase, number or symbol";
      if (form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match";
    }

    if (step === 2) {
      // Address step is optional, but if any address field is filled, validate all basics
      const filledAny = [form.street, form.city, form.state, form.zip].some(Boolean);
      if (filledAny) {
        if (!form.street) e.street = "Street is required";
        if (!form.city) e.city = "City is required";
        if (!form.state) e.state = "State is required";
        if (!form.zip) e.zip = "ZIP/Postal code is required";
      }
      if (!form.country) e.country = "Select a country";
    }

    if (step === 3) {
      // No hard validation, optional preferences
    }

    if (step === 4) {
      if (!form.acceptTerms) e.acceptTerms = "You must accept the Terms & Privacy";
    }

    return e;
  }, [step, form, emailRegex, phoneRegex, pwdScore, emailUnique]);

  const stepTitles = [
    "Basic Info",
    "Account Security",
    "Address (Optional)",
    "Preferences",
    "Review & Submit",
  ];

  const canNext = Object.keys(errors).length === 0 || step === 3; // step 3 has no strict validation

  const handleEmailBlur = async () => {
    if (!emailRegex.test(form.email)) return;
    setEmailChecking(true);
    const unique = await fakeCheckEmailUnique(form.email);
    setEmailUnique(unique);
    setEmailChecking(false);
  };

  const next = () => {
    // mark all fields in current step as touched to show errors if any
    const fieldsByStep = [
      ["firstName", "lastName", "email", "phoneNumber", "dob"],
      ["password", "confirmPassword", "securityQuestion", "securityAnswer"],
      ["street", "city", "state", "zip", "country", "addressDefault"],
      ["newsletter", "sms", "language"],
      ["acceptTerms"],
    ];

    const names = fieldsByStep[step] || [];
    setTouched((t) => ({ ...t, ...Object.fromEntries(names.map((n) => [n, true])) }));

    if (step < stepTitles.length - 1 && (canNext || step === 3)) setStep(step + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    // Touch terms
    markTouched("acceptTerms");
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    // TODO: Send payload to API
    const payload = { ...form };
    console.log("Submitting:", payload);

    // Simulate server + verification email
    await new Promise((r) => setTimeout(r, 900));

    setLoading(false);
    setShowSuccess(true);
  };

  const filteredCountries = useMemo(() => {
    if (!countryQuery) return COUNTRIES;
    return COUNTRIES.filter((c) => c.toLowerCase().includes(countryQuery.toLowerCase()));
  }, [countryQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black text-slate-100 relative">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <a href="/" className="font-semibold text-slate-200 hover:text-white transition">⬅ Back to Home</a>
        <div className="font-black tracking-tight text-lg">YourBrand</div>
        <div />
      </header>

      {/* Container */}
      <main className="max-w-3xl mx-auto px-4 pb-24">
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Top: Title + Email verification notice */}
          <div className="p-6 md:p-8 border-b border-white/10">
            <h1 className="text-2xl md:text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-slate-300">
              After registration, we'll send a verification link to your email to activate your account.
            </p>
          </div>

          {/* Stepper */}
          <div className="px-6 md:px-8 pt-6">
            <ol className="grid grid-cols-5 gap-2">
              {stepTitles.map((title, idx) => (
                <li key={title} className="flex items-center gap-2">
                  <div
                    className={classNames(
                      "h-2 w-full rounded-full",
                      idx <= step ? "bg-indigo-500" : "bg-white/10"
                    )}
                    title={title}
                  />
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
              <span>{stepTitles[step]}</span>
              <span>
                Step {step + 1} of {stepTitles.length}
              </span>
            </div>
          </div>

          {/* Form body */}
          <form className="p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
            {step === 0 && (
              <section className="grid md:grid-cols-2 gap-4">
                <Field label="First name" error={touched.firstName && errors.firstName}>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onBlur={() => markTouched("firstName")}
                    onChange={handleChange}
                    className={inputCls(touched.firstName && errors.firstName)}
                    placeholder="Harsh"
                  />
                </Field>
                <Field label="Last name" error={touched.lastName && errors.lastName}>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onBlur={() => markTouched("lastName")}
                    onChange={handleChange}
                    className={inputCls(touched.lastName && errors.lastName)}
                    placeholder="Sawant"
                  />
                </Field>
                <Field label="Email" error={touched.email && errors.email}>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onBlur={() => {
                        markTouched("email");
                        handleEmailBlur();
                      }}
                      onChange={(e) => {
                        setEmailUnique(null);
                        handleChange(e);
                      }}
                      className={inputCls(touched.email && errors.email, "pr-14")}
                      placeholder="you@example.com"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                      {emailChecking && <span className="animate-pulse text-slate-300">Checking…</span>}
                      {emailUnique === true && <span className="text-emerald-400">Available ✓</span>}
                      {emailUnique === false && <span className="text-rose-400">Taken ✕</span>}
                    </div>
                  </div>
                </Field>
                <Field label="Phone" error={touched.phoneNumber && errors.phoneNumber}>
                  <div className="flex gap-2">
                    <select
                      name="phoneCountry"
                      value={form.phoneCountry}
                      onChange={handleChange}
                      className={inputCls(false, "max-w-[110px]")}
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+65">🇸🇬 +65</option>
                    </select>
                    <input
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onBlur={() => markTouched("phoneNumber")}
                      onChange={handleChange}
                      className={inputCls(touched.phoneNumber && errors.phoneNumber)}
                      placeholder="98765 43210"
                      inputMode="numeric"
                    />
                  </div>
                </Field>
                <Field label="Date of birth" error={touched.dob && errors.dob}>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onBlur={() => markTouched("dob")}
                    onChange={handleChange}
                    className={inputCls(touched.dob && errors.dob)}
                  />
                </Field>
              </section>
            )}

            {step === 1 && (
              <section className="grid md:grid-cols-2 gap-4">
                <Field label="Password" error={touched.password && errors.password}>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onBlur={() => markTouched("password")}
                      onChange={handleChange}
                      className={inputCls(touched.password && errors.password, "pr-12")}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <PasswordStrength score={pwdScore} />
                  <ul className="text-xs text-slate-400 mt-2 list-disc pl-4">
                    <li>8+ characters</li>
                    <li>Upper & lower case</li>
                    <li>Number or symbol</li>
                  </ul>
                </Field>
                <Field label="Confirm password" error={touched.confirmPassword && errors.confirmPassword}>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onBlur={() => markTouched("confirmPassword")}
                      onChange={handleChange}
                      className={inputCls(touched.confirmPassword && errors.confirmPassword, "pr-12")}
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                    >
                      {showConfirm ? "🙈" : "👁️"}
                    </button>
                  </div>
                </Field>
                <Field label="Security question (optional)">
                  <select
                    name="securityQuestion"
                    value={form.securityQuestion}
                    onChange={handleChange}
                    className={inputCls(false)}
                  >
                    {securityQuestions.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Security answer (optional)">
                  <input
                    name="securityAnswer"
                    value={form.securityAnswer}
                    onChange={handleChange}
                    className={inputCls(false)}
                    placeholder="Optional"
                  />
                </Field>
              </section>
            )}

            {step === 2 && (
              <section className="grid md:grid-cols-2 gap-4">
                <Field label="Street" error={touched.street && errors.street}>
                  <input
                    name="street"
                    value={form.street}
                    onBlur={() => markTouched("street")}
                    onChange={handleChange}
                    className={inputCls(touched.street && errors.street)}
                    placeholder="123 MG Road"
                  />
                </Field>
                <Field label="City" error={touched.city && errors.city}>
                  <input
                    name="city"
                    value={form.city}
                    onBlur={() => markTouched("city")}
                    onChange={handleChange}
                    className={inputCls(touched.city && errors.city)}
                    placeholder="Mumbai"
                  />
                </Field>
                <Field label="State" error={touched.state && errors.state}>
                  <input
                    name="state"
                    value={form.state}
                    onBlur={() => markTouched("state")}
                    onChange={handleChange}
                    className={inputCls(touched.state && errors.state)}
                    placeholder="Maharashtra"
                  />
                </Field>
                <Field label="ZIP / Postal code" error={touched.zip && errors.zip}>
                  <input
                    name="zip"
                    value={form.zip}
                    onBlur={() => markTouched("zip")}
                    onChange={handleChange}
                    className={inputCls(touched.zip && errors.zip)}
                    placeholder="400001"
                  />
                </Field>
                <Field label="Country" error={touched.country && errors.country}>
                  <div className="relative">
                    <input
                      name="country"
                      value={form.country}
                      onChange={(e) => {
                        setShowCountryDropdown(true);
                        setCountryQuery(e.target.value);
                        setForm((f) => ({ ...f, country: e.target.value }));
                      }}
                      onFocus={() => setShowCountryDropdown(true)}
                      onBlur={() => setTimeout(() => setShowCountryDropdown(false), 150)}
                      className={inputCls(touched.country && errors.country)}
                      placeholder="Search country"
                    />
                    {showCountryDropdown && (
                      <div className="absolute z-20 mt-2 w-full max-h-48 overflow-auto rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur p-2 shadow-xl">
                        {filteredCountries.length === 0 && (
                          <div className="px-3 py-2 text-sm text-slate-400">No matches</div>
                        )}
                        {filteredCountries.map((c) => (
                          <button
                            key={c}
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                            onMouseDown={() => {
                              setForm((f) => ({ ...f, country: c }));
                              setCountryQuery("");
                              setShowCountryDropdown(false);
                            }}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="addressDefault"
                      checked={form.addressDefault}
                      onChange={handleChange}
                      className="size-4 accent-indigo-500"
                    />
                    <span>Set this address as default</span>
                  </label>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={form.newsletter}
                      onChange={handleChange}
                      className="size-4 accent-indigo-500"
                    />
                    <span>Subscribe to our newsletter</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="sms"
                      checked={form.sms}
                      onChange={handleChange}
                      className="size-4 accent-indigo-500"
                    />
                    <span>Receive SMS notifications</span>
                  </label>
                </div>
                <Field label="Preferred language">
                  <select name="language" value={form.language} onChange={handleChange} className={inputCls(false)}>
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </Field>
              </section>
            )}

            {step === 4 && (
              <section className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                  <h3 className="font-semibold mb-2">Review</h3>
                  <ul className="grid md:grid-cols-2 gap-y-1 gap-x-4">
                    <li><span className="text-slate-400">Name:</span> {form.firstName} {form.lastName}</li>
                    <li><span className="text-slate-400">Email:</span> {form.email}</li>
                    <li><span className="text-slate-400">Phone:</span> {form.phoneCountry} {form.phoneNumber}</li>
                    <li><span className="text-slate-400">DOB:</span> {form.dob}</li>
                    <li className="md:col-span-2"><span className="text-slate-400">Address:</span> {[form.street, form.city, form.state, form.zip, form.country].filter(Boolean).join(', ') || '—'}</li>
                    <li><span className="text-slate-400">Language:</span> {form.language}</li>
                    <li><span className="text-slate-400">Newsletter:</span> {form.newsletter ? 'Yes' : 'No'}</li>
                    <li><span className="text-slate-400">SMS:</span> {form.sms ? 'Yes' : 'No'}</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <label className="inline-flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={form.acceptTerms}
                      onChange={handleChange}
                      onBlur={() => markTouched("acceptTerms")}
                      className="mt-1 size-4 accent-indigo-500"
                    />
                    <span>
                      I agree to the <a href="/terms" className="underline hover:text-white">Terms & Conditions</a> and
                      <span> </span>
                      <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
                    </span>
                  </label>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <p className="text-rose-400 text-xs mt-1">{errors.acceptTerms}</p>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  You will receive an email with a verification link after submitting this form.
                </p>
              </section>
            )}

            {/* Navigation + Social */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/10 disabled:opacity-40"
                >
                  Back
                </button>

                {step < stepTitles.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className={classNames(
                      "px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 shadow",
                      !canNext && step !== 3 && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!canNext && step !== 3}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 shadow inline-flex items-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-pulse">Creating…</span>
                    ) : (
                      <>
                        <span>Create account</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px flex-1 bg-white/10" />
                <span>OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Social sign-up */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button type="button" className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-2">Continue with Google</button>
                <button type="button" className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-2">Continue with Facebook</button>
                <button type="button" className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-2">Continue with Apple</button>
              </div>

              <p className="text-center text-sm text-slate-300">
                Already have an account? <a href="/login" className="underline hover:text-white">Login</a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
          <a href="/terms" className="hover:text-white underline">Terms</a>
          <a href="/privacy" className="hover:text-white underline">Privacy</a>
        </footer>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-md w-full rounded-2xl border border-white/10 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <h3 className="text-xl font-semibold">Account created!</h3>
            <p className="mt-2 text-sm text-slate-300">
              We've sent a verification link to <span className="font-medium">{form.email}</span>.
              Please check your inbox (and spam) to activate your account.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <a href="/login" className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/10">Go to Login</a>
              <button onClick={() => setShowSuccess(false)} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-slate-300">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs text-rose-400">{error}</div>}
    </label>
  );
}

function inputCls(hasError = false, extra = "") {
  return classNames(
    "w-full rounded-xl bg-white/5 border px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ring-indigo-500/60 border-white/10",
    hasError && "border-rose-400/60 ring-rose-400/40",
    extra
  );
}

function PasswordStrength({ score }) {
  const labels = ["Very weak", "Weak", "Okay", "Good", "Strong"]; // for scores 1-5
  const pct = Math.min(score, 5) / 5 * 100;
  const color = score >= 4 ? "bg-emerald-500" : score >= 3 ? "bg-amber-400" : "bg-rose-500";
  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className={`h-2 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-slate-400 mt-1">{score === 0 ? "Start typing…" : labels[Math.max(0, score - 1)]}</div>
    </div>
  );
}
