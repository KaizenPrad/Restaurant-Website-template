import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Loader2, Lock, Mail, UserRound, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Modal from './ui/Modal';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function AccountModal({ open, onClose }) {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setError('');
      setStatus('idle');
    }
  }, [open]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleClose = () => {
    window.clearTimeout(timerRef.current);
    setStatus('idle');
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Your password must be at least 6 characters.');
      return;
    }

    setStatus('loading');
    timerRef.current = window.setTimeout(() => {
      setStatus('idle');
      onClose();
      showToast('Demo sign-in successful. Welcome back to Maison Savour.', 'success');
    }, 900);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      variant="center"
      className="w-full max-w-[430px] rounded-2xl border border-accent/20 bg-[#0C0C0C] p-6 shadow-card sm:p-8"
      labelledBy="account-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-accent/80">
            Guest Account
          </p>
          <h2
            id="account-title"
            className="mt-2 font-serif text-[30px] leading-none text-cream"
          >
            Welcome Back
          </h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close sign-in"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-cream/60 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <X className="h-4 w-4" strokeWidth={1.6} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.015] px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/25 text-accent">
          <UserRound className="h-4 w-4" strokeWidth={1.5} />
        </span>
        <p className="text-[11px] leading-relaxed text-muted/60">
          Save favourite dishes and keep your reservation details in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5">
        <label htmlFor="account-email" className="field-label">
          Email Address
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/40"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <input
            id="account-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError('');
            }}
            placeholder="you@example.com"
            autoComplete="email"
            data-autofocus
            className="field pl-10"
          />
        </div>

        <label htmlFor="account-password" className="field-label mt-4">
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/40"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <input
            id="account-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError('');
            }}
            placeholder="Enter any password"
            autoComplete="current-password"
            className="field pl-10"
          />
        </div>

        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#140D08] transition-colors duration-300 hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] disabled:opacity-75"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
              Signing In
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </>
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={handleClose}
        className="mt-3 w-full rounded-full py-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted/45 transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        Continue as Guest
      </button>

      <p className="mt-1.5 text-center text-[9px] leading-relaxed text-muted/30">
        Demo sign-in only — no account is created and no credentials are stored.
      </p>
    </Modal>
  );
}
