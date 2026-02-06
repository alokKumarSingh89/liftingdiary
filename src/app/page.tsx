import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex flex-col items-center py-24 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
          Your workout companion
        </p>
        <h2 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Track every rep.
          <br />
          <span className="text-zinc-500">See real progress.</span>
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
          A simple, focused diary for lifters who care about getting stronger
          &mdash; not fighting their tracking app.
        </p>

        <SignedOut>
          <SignUpButton mode="modal">
            <button className="mt-10 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-black transition hover:bg-zinc-200">
              Start tracking for free
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <p className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 px-8 py-3.5 text-base text-zinc-300">
            Welcome back &mdash; dashboard coming soon.
          </p>
        </SignedIn>
      </section>

      {/* Features */}
      <section className="grid gap-6 pb-24 sm:grid-cols-3">
        <FeatureCard
          title="Log workouts"
          description="Quickly add exercises, sets, reps, and weight. No clutter, no friction."
        />
        <FeatureCard
          title="Track progress"
          description="See your lifts over time with clear, visual history for every exercise."
        />
        <FeatureCard
          title="Stay consistent"
          description="Review your training frequency and streaks to build lasting habits."
        />
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}
