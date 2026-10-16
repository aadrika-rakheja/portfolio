import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { X, Mail, Check, Copy, Send, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';

export default function ContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const email = 'aadrikarakheja20@gmail.com';

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 'loading') return;

    setStatus('loading');

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus('success');

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300">
      <div
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 text-white border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-mono">
              Let's Connect
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Get in Touch
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={status === 'loading'}
            className="p-2.5 rounded-full glass-pill hover:bg-white/25 transition-colors cursor-pointer text-white/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Email Pill */}
        <div className="mt-6 flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail className="w-4 h-4 text-white/70 shrink-0" />

            <span className="text-sm font-mono text-white/90 truncate">
              {email}
            </span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-xl glass-pill hover:bg-white/25 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-400/20 text-green-400">
            <Check className="w-5 h-5 shrink-0" />

            <div>
              <p className="text-sm font-semibold">
                Message sent successfully!
              </p>

              <p className="text-xs text-green-300/70 mt-0.5">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />

            <div>
              <p className="text-sm font-semibold">
                Something went wrong.
              </p>

              <p className="text-xs text-red-300/70 mt-0.5">
                Please try again or email me directly.
              </p>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >

          {/* Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-mono">
              Your Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
              placeholder="Your Name"
              disabled={status === 'loading'}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-sm transition-colors disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-mono">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
              placeholder="you@example.com"
              disabled={status === 'loading'}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-sm transition-colors disabled:opacity-50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-mono">
              Message
            </label>

            <textarea
              required
              name="message"
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value
                })
              }
              placeholder="Let's build something exceptional together..."
              disabled={status === 'loading'}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-sm resize-none transition-colors disabled:opacity-50"
            />
          </div>

          {/* Hidden Time Field */}
          <input
            type="hidden"
            name="time"
            value={new Date().toLocaleString()}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full py-3 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer disabled:cursor-not-allowed
              ${
                status === 'success'
                  ? 'bg-green-500 text-white'
                  : status === 'error'
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-white text-black hover:bg-white/90 hover:scale-[1.01]'
              }
              ${
                status === 'loading'
                  ? 'opacity-80'
                  : ''
              }`}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Message Sent!</span>
              </>
            ) : status === 'error' ? (
              <>
                <Send className="w-4 h-4" />
                <span>Try Again</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-white/70">

          {/* GitHub */}
          <a
            href="https://github.com/aadrika-rakheja"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-white hover:bg-white/20 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/aadrika-rakheja-660345316/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-white hover:bg-white/20 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* LeetCode */}
          <a
            href="https://leetcode.com/u/aadrika20/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-white hover:bg-white/20 transition-colors"
            aria-label="LeetCode Profile"
          >
            <LeetCodeIcon className="w-4 h-4" />
          </a>

        </div>
      </div>
    </div>
  );
}