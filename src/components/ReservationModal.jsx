import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Info,
  Users,
  X,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Modal from './ui/Modal';
import Button from './ui/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const getLocalToday = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const TIME_SLOTS = Array.from({ length: 24 }, (_, index) => {
  const totalMinutes = 11 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${period}`;
});

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
};

const formatReservationDate = (value) => {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function ReservationModal({ open, onClose }) {
  const { showToast } = useToast();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [confirmation, setConfirmation] = useState(null);
  const [today, setToday] = useState(getLocalToday);
  const formRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (open) {
      setForm(INITIAL_FORM);
      setErrors({});
      setStatus('idle');
      setConfirmation(null);
      setToday(getLocalToday());
    }
  }, [open]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus({ preventScroll: true });
    }
  }, [errors]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleClose = () => {
    window.clearTimeout(timerRef.current);
    setStatus('idle');
    onClose();
  };

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!form.date) {
      nextErrors.date = 'Please choose a date.';
    } else if (form.date < today) {
      nextErrors.date = 'Please choose today or a future date.';
    }
    if (!form.time) {
      nextErrors.time = 'Please choose a time.';
    }
    if (!form.guests) {
      nextErrors.guests = 'Please select your party size.';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    timerRef.current = window.setTimeout(() => {
      const reservation = {
        ...form,
        reference: `MS-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      };
      setConfirmation(reservation);
      setStatus('success');
      showToast(
        'Reservation request received. This is a demo — no table was booked.',
        'success',
      );
    }, 1000);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setConfirmation(null);
    setStatus('idle');
    window.setTimeout(() => {
      formRef.current?.querySelector('input')?.focus({ preventScroll: true });
    }, 60);
  };

  const fieldClass = (key) =>
    `field ${errors[key] ? 'border-red-400/50 focus:border-red-400/70 focus:ring-red-400/10' : ''}`;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      variant="center"
      className="max-h-[90dvh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-accent/20 bg-[#0C0C0C] shadow-card"
      labelledBy="reservation-title"
    >
      <div className="relative p-6 sm:p-8">
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-accent/[0.06] blur-[80px]"
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-accent/80">
              Reservations
            </p>
            <h2
              id="reservation-title"
              className="mt-2 font-serif text-[30px] leading-none text-cream sm:text-[34px]"
            >
              {status === 'success' ? 'Reservation Requested' : 'Reserve Your Table'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close reservation form"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-cream/60 transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <X className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>

        {status === 'success' && confirmation ? (
          <div className="relative">
            <div className="mt-8 flex flex-col items-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-accent/30 bg-accent/[0.06] text-accent">
                <CheckCircle2 className="h-9 w-9" strokeWidth={1.4} />
              </span>
              <h3 className="mt-6 font-serif text-[26px] text-cream">
                Your table awaits, {confirmation.name.split(' ')[0]}.
              </h3>
              <p className="mt-3 max-w-md text-[12.5px] leading-[1.85] text-muted/65">
                Thank you for choosing Maison Savour. A confirmation would be sent
                to <span className="text-cream/85">{confirmation.email}</span>. Our
                team looks forward to welcoming you.
              </p>
            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.015]">
              {[
                ['Guest', confirmation.name],
                ['Date', formatReservationDate(confirmation.date)],
                ['Time', confirmation.time],
                ['Party size', `${confirmation.guests} ${confirmation.guests === '1' ? 'guest' : 'guests'}`],
                ['Reference', confirmation.reference],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 px-4 py-3 text-[12px] ${
                    index !== 0 ? 'border-t border-white/[0.05]' : ''
                  }`}
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted/45">
                    {label}
                  </span>
                  <span className="text-right text-cream/85">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-accent/15 bg-accent/[0.035] p-3.5">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" strokeWidth={1.6} />
              <p className="text-[10px] leading-relaxed text-muted/55">
                Demo reservation only — no table has been booked and no email has
                been sent. This confirmation illustrates the booking experience.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
              <Button variant="secondary" size="sm" onClick={resetForm}>
                Book Another Table
              </Button>
              <Button size="sm" onClick={handleClose}>
                Done
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </Button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="res-name" className="field-label">
                  Full Name
                </label>
                <input
                  id="res-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'res-name-error' : undefined}
                  className={fieldClass('name')}
                />
                {errors.name && (
                  <p id="res-name-error" className="field-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="res-email" className="field-label">
                  Email Address
                </label>
                <input
                  id="res-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'res-email-error' : undefined}
                  className={fieldClass('email')}
                />
                {errors.email && (
                  <p id="res-email-error" className="field-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="res-phone" className="field-label">
                  Phone Number
                </label>
                <input
                  id="res-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  placeholder="+49 000 000 000"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'res-phone-error' : undefined}
                  className={fieldClass('phone')}
                />
                {errors.phone && (
                  <p id="res-phone-error" className="field-error">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="res-guests" className="field-label">
                  Number of Guests
                </label>
                <select
                  id="res-guests"
                  name="guests"
                  value={form.guests}
                  onChange={(event) => updateField('guests', event.target.value)}
                  aria-invalid={Boolean(errors.guests)}
                  aria-describedby={errors.guests ? 'res-guests-error' : undefined}
                  className={fieldClass('guests')}
                >
                  {Array.from({ length: 8 }, (_, index) => index + 1).map((value) => (
                    <option key={value} value={value}>
                      {value} {value === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                  <option value="9+">9+ guests</option>
                </select>
                {errors.guests && (
                  <p id="res-guests-error" className="field-error">
                    {errors.guests}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="res-date" className="field-label">
                  Date
                </label>
                <input
                  id="res-date"
                  name="date"
                  type="date"
                  value={form.date}
                  min={today}
                  onChange={(event) => updateField('date', event.target.value)}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'res-date-error' : undefined}
                  className={fieldClass('date')}
                />
                {errors.date && (
                  <p id="res-date-error" className="field-error">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="res-time" className="field-label">
                  Time
                </label>
                <select
                  id="res-time"
                  name="time"
                  value={form.time}
                  onChange={(event) => updateField('time', event.target.value)}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'res-time-error' : undefined}
                  className={fieldClass('time')}
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p id="res-time-error" className="field-error">
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#140D08] transition-colors duration-300 hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] disabled:opacity-75"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                  Confirming Request
                </>
              ) : (
                <>
                  <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Confirm Reservation
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.18em] text-muted/30">
              <Users className="h-3 w-3" strokeWidth={1.6} />
              Intimate dining · Parties of 9+ please call us
            </div>

            <p className="mt-4 text-center text-[9px] leading-relaxed text-muted/30">
              Demo booking only. No real reservation will be created and no payment
              is required.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
}
