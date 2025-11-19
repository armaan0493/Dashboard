"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MeResponse {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [user, setUser] = useState<MeResponse | null>(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/user/me");
        if (res.status === 401) {
          router.push("/login?callbackUrl=/profile");
          return;
        }
        if (!res.ok) {
          setError("Failed to load profile");
          return;
        }
        const data = (await res.json()) as MeResponse;
        setUser(data);
        setName(data.name);
        setImage(data.image ?? "");
      } catch (err) {
        console.error("Profile load error", err);
        setError("Something went wrong while loading your profile");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          image: image || null,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        setError(data.message ?? "Failed to update profile");
        setSaving(false);
        return;
      }

      setSuccess("Profile updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Profile update error", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 px-4 py-8 text-slate-200">
        <p className="text-sm text-slate-300">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-950 px-4 py-8 text-slate-200">
        <p className="text-sm text-slate-300">Unable to load profile.</p>
      </div>
    );
  }

  const createdAt = new Date(user.createdAt);
  const formattedDate = createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 px-4 py-8 text-foreground sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <section className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-lg shadow-black/40 sm:p-5">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-slate-800 text-lg font-semibold text-slate-100">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name || user.name} className="h-full w-full object-cover" />
            ) : (
              (name || user.name || "?")
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold text-white sm:text-xl">Profile</h1>
            <p className="text-xs text-slate-300">
              Manage your personal information and change your password.
            </p>
            <p className="text-[11px] text-slate-400">
              Member since {formattedDate}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-100 shadow-xl shadow-black/40 sm:p-6">
          {error && (
            <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Profile image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
                  placeholder="https://..."
                />
                <p className="text-[11px] text-slate-400">
                  Paste a link to an image hosted online.
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                Change password
              </h2>
              <p className="text-[11px] text-slate-400">
                To update your password, first enter your current password, then
                choose a new one.
              </p>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Current password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  New password
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 outline-none ring-indigo-500/60 placeholder:text-slate-500 focus:ring-2"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-emerald-500/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
              >
                {saving ? "Saving changes..." : "Save changes"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
