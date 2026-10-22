import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { AjrakStar } from '../AjrakPattern.tsx';

export const AdminLoginModal: React.FC = () => {
  const { showAdminModal, setShowAdminModal, loginAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!showAdminModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the admin password.');
      return;
    }
    setLoading(true);
    setError(null);
    const result = await loginAdmin(password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Authentication failed. Please try again.');
    } else {
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        onClick={() => setShowAdminModal(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden text-slate-900">
        {/* Close */}
        <button
          type="button"
          onClick={() => setShowAdminModal(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center mb-3 shadow-xs">
            <Lock size={20} className="text-teal-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            Santosh's Admin Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authenticate to manage portfolio projects, upload graphic designs, and review inquiries.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
            <ShieldAlert size={16} className="text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 transition-colors"
                autoFocus
              />
              <KeyRound size={16} className="absolute left-3 top-3 text-slate-400" />
            </div>
          </div>

          {/* Quick password hint for testing */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Default Password:</span>
            <code className="text-teal-700 font-mono font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded shadow-xs">santosh2026</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Verifying Credentials...' : 'Sign In To Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};
