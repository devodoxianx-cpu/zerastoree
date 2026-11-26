import { useState } from 'react';
import type { FC } from 'react';
import { X, Lock, Mail, User as UserIcon, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { registerUser, loginUser } from '../utils/auth';
import type { User } from '../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form Fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleResetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(null);
  };

  const handleSwitchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    handleResetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (mode === 'register') {
      if (!username || username.trim().length < 3) {
        setError('Username minimal 3 karakter.');
        setIsSubmitting(false);
        return;
      }
      if (!email || !email.includes('@')) {
        setError('Alamat email tidak valid.');
        setIsSubmitting(false);
        return;
      }
      if (!password || password.length < 6) {
        setError('Password minimal 6 karakter.');
        setIsSubmitting(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Konfirmasi password tidak cocok.');
        setIsSubmitting(false);
        return;
      }

      const res = registerUser(username, email, password);
      if (!res.success) {
        setError(res.message);
        setIsSubmitting(false);
      } else if (res.user) {
        setSuccess(res.message);
        setTimeout(() => {
          setIsSubmitting(false);
          onAuthSuccess(res.user!);
          onClose();
        }, 900);
      }
    } else {
      // Login
      const res = loginUser(email || username, password);
      if (!res.success) {
        setError(res.message);
        setIsSubmitting(false);
      } else if (res.user) {
        setSuccess(res.message);
        setTimeout(() => {
          setIsSubmitting(false);
          onAuthSuccess(res.user!);
          onClose();
        }, 900);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#12141A] border border-[#1E212B] rounded-2xl p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* Header with Switcher Tabs */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E212B] mb-5">
          <div className="flex items-center gap-1 bg-[#181B24] p-1 rounded-xl border border-[#1E212B]">
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#FFE600] text-[#0A0B0E] font-bold shadow-xs'
                  : 'text-zera-muted hover:text-white'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('register')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#FFE600] text-[#0A0B0E] font-bold shadow-xs'
                  : 'text-zera-muted hover:text-white'
              }`}
            >
              Daftar Akun
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181B24] text-zera-muted hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Title */}
        <div className="mb-4">
          <h3 className="font-gaming font-extrabold text-lg text-white">
            {mode === 'login' ? 'Selamat Datang di ZeraStore' : 'Buat Akun Member Baru'}
          </h3>
          <p className="text-xs text-zera-muted mt-0.5">
            {mode === 'login'
              ? 'Masuk untuk kemudahan riwayat pesanan dan top-up instan.'
              : 'Daftar dengan username, email, dan password Anda.'}
          </p>
        </div>

        {/* Feedback Alert */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Username Field (Always for register, or identifier for login) */}
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">
                Username:
              </label>
              <div className="relative flex items-center">
                <UserIcon className="w-4 h-4 text-zera-muted absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: gamer_zera"
                  className="w-full bg-[#181B24] border border-[#1E212B] focus:border-[#FFE600] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-zera-muted/40 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field (Always for register, or email/username for login) */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white block">
              {mode === 'register' ? 'Email:' : 'Username atau Email:'}
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-zera-muted absolute left-3 pointer-events-none" />
              <input
                type={mode === 'register' ? 'email' : 'text'}
                value={mode === 'register' ? email : (email || username)}
                onChange={(e) => {
                  if (mode === 'register') {
                    setEmail(e.target.value);
                  } else {
                    setEmail(e.target.value);
                    setUsername(e.target.value);
                  }
                }}
                placeholder={mode === 'register' ? 'nama@email.com' : 'Masukkan username atau email'}
                className="w-full bg-[#181B24] border border-[#1E212B] focus:border-[#FFE600] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-zera-muted/40 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white block">
              Password:
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-zera-muted absolute left-3 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full bg-[#181B24] border border-[#1E212B] focus:border-[#FFE600] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-zera-muted/40 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Confirm Password Field (Register only) */}
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-white block">
                Konfirmasi Password:
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-zera-muted absolute left-3 pointer-events-none" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang password Anda"
                  className="w-full bg-[#181B24] border border-[#1E212B] focus:border-[#FFE600] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-zera-muted/40 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFE600] hover:bg-[#FFF04B] text-[#0A0B0E] font-gaming font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <span>{mode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Account Hint */}
        {mode === 'login' && (
          <div className="mt-4 p-2.5 rounded-lg bg-[#0A0B0E] border border-[#1E212B] text-[11px] text-zera-muted">
            <span className="text-white font-medium">Akun Demo Coba:</span> username: <code className="text-[#FFE600]">gamer_zera</code> / password: <code className="text-[#FFE600]">password123</code>
          </div>
        )}
      </div>
    </div>
  );
};

