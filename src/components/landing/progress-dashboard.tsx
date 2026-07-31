"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, TrendingUp, BookmarkPlus, Calendar, ArrowRight } from "lucide-react";
import { getStoredProfile, StudentProfile } from "@/lib/profile-store";
import { calculateTotalUcasPoints } from "@/lib/calculators";

export function ProgressDashboard() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  if (!profile) {
    // Skeleton to avoid hydration flash
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="h-64 animate-pulse rounded-3xl bg-slate-800/50" />
      </section>
    );
  }

  const totalPoints = calculateTotalUcasPoints(profile.entries || []);
  const subjectCount = profile.entries?.length || 0;
  const shortlisted = profile.draftlist?.length || 0;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 text-white shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-300">
            <User size={14} /> Your live dashboard
          </div>
          <span className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Welcome back, {profile.studentName}
          </span>
        </div>

        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3">
          <DashStat
            icon={<User size={16} className="text-sky-400" />}
            label="Level & Course"
            value={`${profile.level}`}
            sub={profile.courseInterest}
          />
          <DashStat
            icon={<TrendingUp size={16} className="text-sky-400" />}
            label="Saved UCAS Points"
            value={`${totalPoints}`}
            sub={`${subjectCount} subjects entered`}
            highlight
          />
          <DashStat
            icon={<BookmarkPlus size={16} className="text-emerald-400" />}
            label="Shortlisted"
            value={`${shortlisted}`}
            sub="universities saved"
          />
        </div>

        <div className="flex flex-wrap gap-3 px-6 pb-6 sm:px-8 sm:pb-8">
          <Link
            href="/profile"
            className="group inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-400"
          >
            Edit profile
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/action-plan"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700"
          >
            <Calendar size={14} /> Action plan calendar
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function DashStat({
  icon,
  label,
  value,
  sub,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {icon} {label}
      </span>
      <strong
        className={`mt-1.5 block font-serif text-2xl font-bold ${
          highlight ? "text-sky-400" : "text-white"
        }`}
      >
        {value}
      </strong>
      <span className="text-xs text-slate-400">{sub}</span>
    </div>
  );
}
