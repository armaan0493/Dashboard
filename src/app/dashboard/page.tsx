import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getUsersCollection, type UserDocument } from "@/lib/mongodb";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard")}`);
  }

  const email = session.user.email.toLowerCase();

  const users = await getUsersCollection();
  const user: UserDocument | null = await users.findOne({ email });

  if (!user) {
    redirect("/login");
  }

  const createdAt = user.createdAt instanceof Date ? user.createdAt : new Date(user.createdAt);

  const formattedDate = createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 px-4 py-8 text-foreground sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-slate-900 p-6 shadow-xl shadow-black/40 sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/80">
            Overview
          </p>
          <h1 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
            Welcome back, {user.name}
          </h1>
          <p className="max-w-xl text-sm text-slate-200">
            This is your personal authentication dashboard. From here you can
            review your account details and keep your profile up to date.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-100 shadow-md shadow-black/40">
            <p className="text-xs font-medium text-slate-400">Name</p>
            <p className="mt-1 text-base font-semibold text-white">{user.name}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-100 shadow-md shadow-black/40">
            <p className="text-xs font-medium text-slate-400">Email</p>
            <p className="mt-1 break-all text-base font-semibold text-white">
              {user.email}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-100 shadow-md shadow-black/40">
            <p className="text-xs font-medium text-slate-400">Member since</p>
            <p className="mt-1 text-base font-semibold text-white">
              {formattedDate}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-white/15 bg-slate-950/60 p-5 text-xs text-slate-300">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">
            Next steps
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Update your profile information and profile image.</li>
            <li>Change your password regularly to keep your account secure.</li>
            <li>Try logging out and back in to verify the auth flow.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
