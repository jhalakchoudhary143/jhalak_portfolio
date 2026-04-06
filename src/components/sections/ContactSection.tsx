"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/icons/BrandIcons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SOCIAL } from "@/lib/constants";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID ?? "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const ownerEmail = "jhalakchoudhary143@gmail.com";
const emailjsReady = Boolean(serviceId && templateId && autoReplyTemplateId && publicKey);

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { name: "", email: "", message: "" } });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(values: FormValues) {
    if (!emailjsReady) {
      const subject = encodeURIComponent(`Portfolio collaboration request from ${values.name}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}\n\n---\nSent from portfolio contact form`,
      );
      window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
      setStatus("ok");
      reset();
      return;
    }
    setStatus("loading");
    try {
      await Promise.all([
        emailjs.send(
          serviceId,
          templateId,
          {
            to_name: "Jhalak",
            to_email: ownerEmail,
            from_name: values.name,
            from_email: values.email,
            reply_to: values.email,
            subject: "Jhalak, a new contact request has arrived",
            message: values.message,
          },
          { publicKey },
        ),
        emailjs.send(
          serviceId,
          autoReplyTemplateId,
          {
            to_name: values.name,
            to_email: values.email,
            from_name: "Jhalak",
            subject: "Waiting for Jhalak reply",
            message:
              "Hi, thank you for reaching out. If you want me to collaborate on your project, please send me details by email and I will connect with you soon. Meanwhile, please wait for Jhalak's reply.",
          },
          { publicKey },
        ),
      ]);
      setStatus("ok");
      reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Contact</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Let&apos;s connect</h2>
          <p className="mt-3 text-muted">Send a message about projects, internships, or collaborations.</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 lg:col-span-2"
          >
            <p className="text-sm font-semibold text-foreground">Social</p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                <IconLinkedin className="h-5 w-5 text-blue-300" aria-hidden />
                LinkedIn
              </a>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                <IconGithub className="h-5 w-5 text-foreground" aria-hidden />
                GitHub
              </a>
              <a
                href={SOCIAL.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                <ExternalLink className="h-5 w-5 text-amber-300" aria-hidden />
                LeetCode
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass rounded-3xl p-6 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Name
                </label>
                <input
                  id="name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none ring-violet-500/40 placeholder:text-muted focus:ring-2"
                  placeholder="Your name"
                  {...register("name", { required: true, minLength: 2 })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">Please enter your name.</p>
                )}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none ring-violet-500/40 placeholder:text-muted focus:ring-2"
                  placeholder="you@example.com"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">Please enter a valid email.</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none ring-violet-500/40 placeholder:text-muted focus:ring-2"
                placeholder="Tell me about your project or opportunity..."
                {...register("message", { required: true, minLength: 10 })}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">Message should be at least 10 characters.</p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6B46C1] to-[#4299E1] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="h-4 w-4" aria-hidden />
                )}
                Send message
              </button>
              {status === "ok" && (
                <span className="text-sm font-medium text-[#48BB78]">
                  Message sent successfully. Thank you for your time.
                </span>
              )}
              {status === "err" && (
                <span className="text-sm font-medium text-red-400">Could not send right now. Please try again.</span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
