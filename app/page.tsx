import HeroVisual from "./components/hero-visual";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-0 w-[calc(100%-2.5rem)] max-w-[1180px] flex-1 max-[640px]:w-[calc(100%-2rem)]">
      <section
        id="home"
        className="grid min-h-0 w-full grid-cols-[minmax(0,1fr)_minmax(340px,0.92fr)] items-center gap-8 py-6 max-[860px]:grid-cols-1 max-[860px]:grid-rows-[minmax(0,1fr)_auto] max-[860px]:gap-0 max-[860px]:py-3"
        aria-labelledby="home-heading"
      >
        <div className="relative z-10 max-w-[630px] max-[860px]:row-start-2">
          <h1
            id="home-heading"
            className="m-0 max-w-[13ch] font-semibold leading-[0.98] tracking-[-0.065em]"
          >
            Rethinking how we use and value our resources.
          </h1>
          <p className="mt-5 max-w-[54ch] text-lg leading-[1.6] text-muted">
            Social and sustainability blog
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/solutions"
              className="inline-flex min-h-11 items-center justify-center gap-3 bg-accent px-6 font-semibold text-white no-underline transition-colors hover:bg-[#204b37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Explore my work <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="flex min-h-0 items-center justify-center max-[860px]:row-start-1">
          <HeroVisual />
        </div>
      </section>
    </main>
  );
}
