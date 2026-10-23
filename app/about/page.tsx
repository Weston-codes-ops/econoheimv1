import type { Metadata } from "next";
import { contacts } from "../data/contacts";

export const metadata: Metadata = {
  title: "About | Econoheim",
  description: "Learn about the person behind Econoheim and get in touch.",
};

export default function AboutPage() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-white" aria-label="About">
      <section className="mx-auto grid min-h-full w-[calc(100%-2.5rem)] max-w-[1080px] grid-cols-[minmax(260px,0.85fr)_minmax(0,1.15fr)] items-center gap-[clamp(2rem,7vw,6rem)] py-10 max-[760px]:grid-cols-1 max-[760px]:justify-items-center max-[760px]:gap-8 max-[640px]:w-[calc(100%-2rem)] max-[640px]:py-7">
        <div
          className="relative flex aspect-[4/5] w-full max-w-[390px] items-center justify-center overflow-hidden rounded-[2rem] border border-line bg-[#f2f7f2] max-[760px]:aspect-square max-[760px]:h-[min(36svh,300px)] max-[760px]:w-[min(80vw,300px)]"
          role="img"
          aria-label="Photo placeholder. Replace with your portrait."
        >
          <div className="flex flex-col items-center gap-4 text-accent/70">
            <svg
              aria-hidden="true"
              className="h-20 w-20"
              fill="none"
              viewBox="0 0 80 80"
            >
              <circle cx="40" cy="28" r="15" fill="currentColor" opacity=".22" />
              <path
                d="M12 72c2-16 13-25 28-25s26 9 28 25"
                fill="currentColor"
                opacity=".22"
              />
              <circle
                cx="40"
                cy="28"
                r="14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M13 71c2-15 12-23 27-23s25 8 27 23"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
            <span className="text-sm font-medium tracking-wide">
              Your photo goes here
            </span>
          </div>
        </div>

        <div className="max-w-[610px] max-[760px]:w-full">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            The person behind Econoheim
          </p>
          <h1 className="text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
            Weston Smith
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            I’m the person behind Econoheim. I’m interested in how everyday
            choices, thoughtful design, and practical ideas can support a more
            sustainable way of living.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            This is where hub to showcase my social and sustainability efforts.
            I want to serve others just as people have served me.
          </p>



          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
              Get in touch
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noreferrer" : undefined}
                >
                  {contact.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
