import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles, CheckCircle2, GitCommit, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface SignInProps {
  onSuccess: (userEmail: string) => void;
  onExploreDemo?: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('alex@acme.corp');
  const [password, setPassword] = useState('supersecretdevpassword');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid work email address.');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!hasError) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSuccess(email);
      }, 750);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      onSuccess('alex@acme.corp');
    }, 850);
  };

  const fillProfile = (profileEmail: string) => {
    setEmail(profileEmail);
    setPassword('supersecretdevpassword');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#faf8ff] text-[#131b2e] antialiased selection:bg-[#4648d4] selection:text-white">
      {/* LEFT COLUMN: Brand Showcase & Interactive Visuals */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-7/12 flex-col justify-between overflow-hidden bg-[#0b0f19] p-12 xl:p-16 text-white border-r border-[#1c2333]">
        {/* Ambient Radial Gradient Glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#4648d4]/20 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#6b38d4]/15 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#20283e_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

        {/* Top: Logo & System Indicator */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg overflow-hidden bg-[#131b2e] border border-[#2b354f] flex items-center justify-center p-1.5 shadow-inner">
              <svg className="size-full text-[#4648d4]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              DevFlow
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-[#4648d4]/20 text-[#c0c1ff] border border-[#4648d4]/40 font-medium">
                STUDIO
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131b2e]/80 border border-[#232d44] text-xs font-mono text-[#c7c4d7]">
            <span className="size-2 rounded-full bg-[#4edea3] animate-pulse" />
            Systems Operational
          </div>
        </div>

        {/* Center: Copy & Floating Glassmorphic Kanban Graphic */}
        <div className="relative z-10 my-auto py-10 flex flex-col max-w-xl">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider uppercase text-[#c0c1ff]">
            <Zap className="size-4 text-[#c0c1ff]" />
            Velocity Engineered
          </div>

          <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.15] text-white">
            Great work starts with a clear plan.
          </h1>

          <p className="mt-4 text-base xl:text-lg text-[#94a3b8] leading-relaxed">
            Bring your projects, people, and priorities together in one focused workspace. Built for high-velocity software engineering teams.
          </p>

          {/* Miniature Kanban Cards Mockup */}
          <div className="relative mt-10 space-y-3.5">
            {/* Floating Card 1: In Progress */}
            <div className="relative transform transition-all duration-300 hover:-translate-y-1 rounded-xl bg-[#131b2e]/85 backdrop-blur-md border border-[#273350] p-4 shadow-2xl">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#c0c1ff] font-semibold">DEV-109</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-medium">
                    <span className="size-1.5 rounded-full bg-amber-400" />
                    In Progress
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  <AlertCircle className="size-3.5" />
                  Urgent
                </span>
              </div>
              <p className="text-sm font-medium text-white mb-3">Real-time sync engine &amp; CRDT conflict resolution</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#1e293b] text-xs text-[#94a3b8]">
                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <GitCommit className="size-3.5 text-indigo-400" />
                  feat/crdt-sync
                </div>
                {/* Avatar Stack */}
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-flex size-6 rounded-full ring-2 ring-[#131b2e] bg-[#4648d4] items-center justify-center text-[10px] font-bold text-white">AK</div>
                  <div className="inline-flex size-6 rounded-full ring-2 ring-[#131b2e] bg-[#6b38d4] items-center justify-center text-[10px] font-bold text-white">SL</div>
                  <div className="inline-flex size-6 rounded-full ring-2 ring-[#131b2e] bg-[#006c49] items-center justify-center text-[10px] font-bold text-white">MR</div>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Done */}
            <div className="relative transform transition-all duration-300 hover:-translate-y-1 rounded-xl bg-[#131b2e]/65 backdrop-blur-md border border-[#232d44] p-4 shadow-xl ml-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#c7c4d7] font-medium">DEV-114</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-medium">
                    <CheckCircle2 className="size-3 text-emerald-400" />
                    Done
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">100% complete</span>
              </div>
              <p className="text-sm font-medium text-[#cbd5e1]">Git commit linking &amp; automated PR triggers</p>
            </div>

            {/* Floating Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151c2e] border border-[#273350] text-xs font-mono text-[#cbd5e1]">
                <span className="text-[#c0c1ff]">Ctrl+K</span>
                <span>Omni Search</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151c2e] border border-[#273350] text-xs font-mono text-[#cbd5e1]">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span>&lt;1ms Local Latency</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151c2e] border border-[#273350] text-xs font-mono text-[#cbd5e1]">
                <Sparkles className="size-3.5 text-amber-300" />
                <span>Linear &amp; GitHub Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Testimonial Quote */}
        <div className="relative z-10 border-t border-[#1c2333] pt-6 flex items-start gap-4">
          <div className="size-10 rounded-full bg-[#172033] border border-[#2d3a5a] flex items-center justify-center shrink-0 text-[#c0c1ff]">
            <span className="text-xl font-serif">“</span>
          </div>
          <div>
            <p className="text-sm text-[#cbd5e1] italic leading-snug">
              “DevFlow cut our cycle time in half while keeping the entire engineering org aligned.”
            </p>
            <p className="text-xs text-[#94a3b8] mt-1.5 font-medium">
              — VP of Engineering at <span className="text-white font-semibold">ScaleOps</span>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Centered Sign-In Form */}
      <div className="flex-1 flex flex-col justify-between bg-[#faf8ff] p-6 sm:p-10 lg:p-12 xl:p-16 min-h-screen overflow-y-auto">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <button
            onClick={() => onSuccess(email)}
            type="button"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#464554] hover:text-[#4648d4] transition-colors"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            Jump to Workspace
          </button>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#eaedff] text-[#464554] border border-[#c7c4d7]/40">
            <span className="size-1.5 rounded-full bg-[#4648d4]" />
            DevFlow Cloud v2.4
          </span>
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          {/* Mobile Brand Header */}
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="size-8 rounded-lg bg-[#131b2e] flex items-center justify-center p-1.5 text-white shadow">
              <svg className="size-full text-[#4648d4]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#131b2e]">DevFlow</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-[#131b2e]">
              {isSignUpMode ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-sm text-[#464554]">
              {isSignUpMode
                ? 'Start managing engineering velocity with your team.'
                : 'Sign in to continue to your workspace.'}
            </p>
          </div>

          {/* Quick Demo Access Banner */}
          <div className="mb-6 p-3.5 rounded-xl bg-[#f2f3ff] border border-[#4648d4]/20 flex items-start gap-3 shadow-xs">
            <div className="size-6 rounded-full bg-[#4648d4]/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="size-3.5 text-[#4648d4]" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                Demo Mode Active
                <span className="px-1.5 py-0.5 rounded bg-[#4648d4]/10 text-[#4648d4] font-mono text-[10px] font-semibold">
                  Instant Login
                </span>
              </div>
              <p className="text-[#464554] mt-0.5 leading-relaxed">
                Click <span className="font-semibold text-[#131b2e]">"Sign In"</span> with pre-filled fields to immediately jump to your workspace board.
              </p>
            </div>
          </div>

          {/* Google SSO Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            type="button"
            className="w-full flex items-center justify-center gap-3 h-12 px-4 rounded-xl border border-[#c7c4d7]/70 bg-white hover:bg-[#eaedff]/40 text-[#131b2e] text-sm font-semibold shadow-xs transition duration-150 ease-in-out active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/20 cursor-pointer disabled:opacity-75"
          >
            {isGoogleLoading ? (
              <>
                <div className="size-4 border-2 border-[#4648d4] border-t-transparent rounded-full animate-spin" />
                <span>Connecting Google Workspace...</span>
              </>
            ) : (
              <>
                <svg className="size-5 shrink-0" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" fill="#4285F4" />
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z" fill="#34A853" />
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z" fill="#FBBC05" />
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-[#c7c4d7]/50" />
            <span className="absolute bg-[#faf8ff] px-3 text-xs uppercase tracking-wider text-[#767586] font-medium">
              or continue with email
            </span>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4" noValidate>
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1.5" htmlFor="emailInput">
                Work Email
              </label>
              <div className="relative">
                <input
                  id="emailInput"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="alex@acme.corp"
                  required
                  className={`w-full h-12 pl-11 pr-4 rounded-xl border ${
                    emailError ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-[#c7c4d7]/70'
                  } bg-white text-[#131b2e] text-sm placeholder:text-[#767586] focus:border-[#4648d4] focus:ring-4 focus:ring-[#4648d4]/10 transition outline-none`}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#767586]">
                  <Mail className="size-4" />
                </div>
              </div>
              {emailError && (
                <p className="text-xs text-rose-600 mt-1.5 font-medium flex items-center gap-1">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#131b2e]" htmlFor="passwordInput">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-medium text-[#4648d4] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="passwordInput"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="••••••••••••"
                  required
                  className={`w-full h-12 pl-11 pr-11 rounded-xl border ${
                    passwordError ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-[#c7c4d7]/70'
                  } bg-white text-[#131b2e] text-sm placeholder:text-[#767586] focus:border-[#4648d4] focus:ring-4 focus:ring-[#4648d4]/10 transition outline-none font-mono`}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#767586]">
                  <Lock className="size-4" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#767586] hover:text-[#131b2e] transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-rose-600 mt-1.5 font-medium flex items-center gap-1">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {passwordError}
                </p>
              )}
            </div>

            {/* Checkbox Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-[#c7c4d7] text-[#4648d4] focus:ring-[#4648d4]/20 accent-[#4648d4] cursor-pointer"
                />
                <span className="text-xs text-[#464554] font-normal">Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white text-sm font-semibold shadow-md shadow-[#4648d4]/25 hover:opacity-95 transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#4648d4]/20 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>{isSignUpMode ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="size-4.5" />
                </>
              )}
            </button>
          </form>

          {/* Test Profiles Quick Filler */}
          <div className="mt-6 pt-5 border-t border-[#c7c4d7]/40 flex items-center justify-between text-xs text-[#464554]">
            <span className="font-medium text-[11px] uppercase tracking-wide">Test Profiles:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillProfile('alex@acme.corp')}
                className="px-2.5 py-1 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-[11px] font-mono transition cursor-pointer font-medium"
              >
                alex@acme.corp
              </button>
              <button
                type="button"
                onClick={() => fillProfile('sarah@linear.dev')}
                className="px-2.5 py-1 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-[11px] font-mono transition cursor-pointer font-medium"
              >
                sarah@linear.dev
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="w-full max-w-md mx-auto pt-6 text-center text-xs text-[#464554]">
          <p>
            {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUpMode(!isSignUpMode)}
              className="font-semibold text-[#4648d4] hover:underline cursor-pointer"
            >
              {isSignUpMode ? 'Sign in to DevFlow' : 'Sign up for DevFlow'}
            </button>
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#767586]">
            <span className="hover:text-[#131b2e] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#131b2e] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 hover:text-[#131b2e] cursor-pointer">
              <ShieldCheck className="size-3" />
              Security &amp; SOC2
            </span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-[#131b2e]">
            <h3 className="text-xl font-bold mb-2">Reset Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your work email address and we will send you a secure magic link to reset your workspace access.
            </p>

            {forgotEmailSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-4 flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                Reset link sent to <strong>{email}</strong>. Check your inbox!
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-1" htmlFor="resetEmail">
                  Work Email
                </label>
                <input
                  id="resetEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#4648d4]"
                />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotEmailSent(false);
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              {!forgotEmailSent && (
                <button
                  type="button"
                  onClick={() => setForgotEmailSent(true)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#4648d4] text-white hover:bg-[#3f41c3]"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
