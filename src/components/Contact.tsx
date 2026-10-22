import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Share2, 
  Clock,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { AjrakDivider, AjrakStar } from './AjrakPattern.tsx';

export const Contact: React.FC = () => {
  const { data, submitContact } = usePortfolio();
  const profile = data?.profile;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
    honeypot: '' // spam bot trap
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setResponseMsg('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setStatus('loading');
    setResponseMsg('');

    const res = await submitContact({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      phone: formData.phone,
      message: formData.message
    });

    if (res.success) {
      setStatus('success');
      setResponseMsg(res.message);
      setFormData({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: '',
        honeypot: ''
      });
    } else {
      setStatus('error');
      setResponseMsg(res.message);
    }
  };

  const whatsappNumber = (profile?.whatsapp || '+923313101886').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Santosh, I saw your portfolio and would like to discuss a project with you.')}`;

  return (
    <section id="contact" className="relative py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            <AjrakStar size={14} className="text-teal-600" />
            <span>Start A Conversation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3">
            Contact & <span className="text-teal-700">Hire Santosh</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have an upcoming web development project, corporate rebrand, or graphic design requirement? Send a message or connect directly.
          </p>
          <AjrakDivider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & WhatsApp */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading mb-6">
                Direct Contact Information
              </h3>

              <div className="space-y-4 mb-8">
                {/* Phone */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Direct Phone (Pakistan)</div>
                    <a
                      href={`tel:${profile?.phone || '03313101886'}`}
                      className="text-sm font-bold text-slate-900 hover:text-teal-700 font-mono transition-colors"
                    >
                      {profile?.phone || '03313101886'}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                    <Mail size={18} />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] text-slate-500 font-medium">Email Address</div>
                    <a
                      href={`mailto:${profile?.email || 'rahisantoshkumar843@gmail.com'}`}
                      className="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors truncate block"
                    >
                      {profile?.email || 'rahisantoshkumar843@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Location</div>
                    <div className="text-sm font-bold text-slate-900">
                      {profile?.location || 'Sindh, Pakistan'}
                    </div>
                  </div>
                </div>

                {/* Availability status */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Response Time</div>
                    <div className="text-xs text-slate-700 font-medium">
                      Typically responds within a few hours (PKT GMT+5)
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <MessageSquare size={18} />
                <span>Chat on WhatsApp ({profile?.whatsapp || '+923313101886'})</span>
              </a>
            </div>

            {/* Social links */}
            {profile?.socials && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500">Profiles:</span>
                {profile.socials.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
                    title="GitHub"
                  >
                    <Github size={16} />
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors shadow-xs"
                    title="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/90 border border-slate-200 shadow-sm relative">
              <h3 className="text-xl font-bold text-slate-900 font-heading mb-1.5">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-normal">
                Messages are transmitted directly to Santosh's management inbox.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3 shadow-xs">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Message Sent Successfully!</span>
                    <span>{responseMsg}</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-3 shadow-xs">
                  <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Submission Error</span>
                    <span>{responseMsg}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam (hidden) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-teal-700">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ali Khan"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 shadow-xs transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-teal-700">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ali@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 shadow-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +92 300 0000000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 shadow-xs transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Web Development Inquiry"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 shadow-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Message <span className="text-teal-700">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, deliverables, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 shadow-xs transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-6 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message to Santosh</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
