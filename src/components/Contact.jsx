import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../context";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, ExternalLink } from "lucide-react";

// Security utility function to escape HTML special characters
const sanitizeInput = (str) => {
  return str.replace(/[&<>"']/g, (match) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
    };
    return map[match];
  });
};

const Contact = () => {
  const formRef = useRef();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [formData, setFormData] = useState({
    userName: "",
    userSubject: "",
    userEmail: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.userName.trim()) {
      formErrors.userName = "Name is required.";
    }
    if (!formData.userSubject.trim()) {
      formErrors.userSubject = "Subject is required.";
    }
    if (!formData.userEmail.trim()) {
      formErrors.userEmail = "Email is required.";
    } else if (!emailRegex.test(formData.userEmail.trim())) {
      formErrors.userEmail = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      formErrors.message = "Message is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Environment variables or fallback default credentials
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_wggal0m";
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_yuu9elc";
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "4QFN7_0-E4dVmMD8Y";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitted(false);

    if (!validate()) {
      return;
    }

    setLoading(true);

    const cleanName = sanitizeInput(formData.userName.trim());
    const cleanSubject = sanitizeInput(formData.userSubject.trim());
    const cleanEmail = sanitizeInput(formData.userEmail.trim());
    const cleanMessage = sanitizeInput(formData.message.trim());

    // Format current date & time
    const now = new Date();
    const formattedTime = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const templateParams = {
      name: cleanName,
      title: cleanSubject,
      email: cleanEmail,
      message: cleanMessage,
      time: formattedTime,

      // Aliases for backup template variations
      userName: cleanName,
      userSubject: cleanSubject,
      userEmail: cleanEmail,
      from_name: cleanName,
      user_name: cleanName,
      subject: cleanSubject,
      user_subject: cleanSubject,
      reply_to: cleanEmail,
      user_email: cleanEmail,
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ userName: "", userSubject: "", userEmail: "", message: "" });
    } catch {
      setSubmitError(
        "Unable to send your message automatically right now. Please try again or click below to send directly via your email app."
      );
    } finally {
      setLoading(false);
    }
  };

  // Generate mailto link for instant one-click fallback sending
  const mailtoLink = `mailto:parthdarji8825@gmail.com?subject=${encodeURIComponent(
    formData.userSubject || "Portfolio Inquiry"
  )}&body=${encodeURIComponent(
    `Name: ${formData.userName}\nEmail: ${formData.userEmail}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            <Mail size={14} />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Let&apos;s Discuss <span className="text-gradient">Your Project</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Always open to discussing new opportunities, software projects, or technological partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className={`p-8 rounded-3xl border space-y-8 ${
              darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-lg"
            }`}>
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>
                  Contact Details
                </h3>
                <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Reach out directly via phone or email, or drop a message using the form.
                </p>
              </div>

              {/* Contact Item: Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-cyan-400">Phone</p>
                  <a
                    href="tel:+16476070989"
                    className={`text-base font-bold hover:text-cyan-400 transition-colors ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    +1 (647) 607-0989
                  </a>
                </div>
              </div>

              {/* Contact Item: Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-indigo-400">Email</p>
                  <a
                    href="mailto:parthdarji8825@gmail.com"
                    className={`text-base font-bold hover:text-indigo-400 transition-colors break-all ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    parthdarji8825@gmail.com
                  </a>
                </div>
              </div>

              {/* Contact Item: Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-purple-400">Location</p>
                  <p className={`text-base font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
                    Kitchener, ON, Canada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border ${
              darkMode ? "glass-panel border-slate-800" : "glass-panel-light border-slate-200 shadow-xl"
            }`}>
              <form ref={formRef} onSubmit={handleSubmit} noValidate autoComplete="off" className="space-y-6 text-left">
                {/* Form Field: Name */}
                <div className="space-y-2">
                  <label htmlFor="userName" className={`block text-sm font-semibold ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                    Your Name *
                  </label>
                  <input
                    id="userName"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden focus:ring-2 focus:ring-cyan-500 ${
                      errors.userName
                        ? "border-red-500/80 bg-red-500/5 text-red-200"
                        : darkMode
                        ? "bg-slate-900/90 border-slate-700 text-white placeholder-slate-500"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                  {errors.userName && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle size={13} /> {errors.userName}
                    </p>
                  )}
                </div>

                {/* Form Field: Subject */}
                <div className="space-y-2">
                  <label htmlFor="userSubject" className={`block text-sm font-semibold ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                    Subject *
                  </label>
                  <input
                    id="userSubject"
                    type="text"
                    name="userSubject"
                    value={formData.userSubject}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Project Inquiry / Job Opportunity"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden focus:ring-2 focus:ring-cyan-500 ${
                      errors.userSubject
                        ? "border-red-500/80 bg-red-500/5 text-red-200"
                        : darkMode
                        ? "bg-slate-900/90 border-slate-700 text-white placeholder-slate-500"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                  {errors.userSubject && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle size={13} /> {errors.userSubject}
                    </p>
                  )}
                </div>

                {/* Form Field: Email */}
                <div className="space-y-2">
                  <label htmlFor="userEmail" className={`block text-sm font-semibold ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                    Email Address *
                  </label>
                  <input
                    id="userEmail"
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden focus:ring-2 focus:ring-cyan-500 ${
                      errors.userEmail
                        ? "border-red-500/80 bg-red-500/5 text-red-200"
                        : darkMode
                        ? "bg-slate-900/90 border-slate-700 text-white placeholder-slate-500"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                  {errors.userEmail && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle size={13} /> {errors.userEmail}
                    </p>
                  )}
                </div>

                {/* Form Field: Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className={`block text-sm font-semibold ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Tell me about your project details or message..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden focus:ring-2 focus:ring-cyan-500 resize-y ${
                      errors.message
                        ? "border-red-500/80 bg-red-500/5 text-red-200"
                        : darkMode
                        ? "bg-slate-900/90 border-slate-700 text-white placeholder-slate-500"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle size={13} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Feedback Banners */}
                {submitted && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
                    <CheckCircle size={20} className="shrink-0 text-emerald-400" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {submitError && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm space-y-3">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle size={20} className="shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-200 mb-1">Message Delivery Status</p>
                        <p className="text-xs text-amber-200/90 leading-relaxed">{submitError}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-amber-200 font-medium">Send your prefilled message directly:</span>
                      <a
                        href={mailtoLink}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md active:scale-95"
                      >
                        <ExternalLink size={14} />
                        Open Email Client
                      </a>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
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

export default Contact;
