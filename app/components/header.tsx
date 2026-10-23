import Image from "next/image";
import Link from "next/link";
import econoheimLogo from "../assets/logo/econoheim-logo.svg";

export default function Header() {
  return (
    <header className="z-20 shrink-0  bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-[calc(100%-2.5rem)] max-w-[1180px] items-center justify-between gap-8 py-3 max-[860px]:w-[calc(100%-2rem)] max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3">
        <Link
          className="inline-flex shrink-0 items-center"
          href="/"
          aria-label="Econoheim home"
        >
        <Image
          src={econoheimLogo}
          alt="Econoheim"
          width={270}
          height={60}
          priority
        />
        </Link>
        <nav aria-label="Main navigation" className="main-navigation mr-8">
          <ul className="m-0 flex list-none items-center gap-7 p-0 max-[860px]:gap-4 max-[640px]:flex-wrap max-[640px]:gap-x-5 max-[640px]:gap-y-2">
            <li><Link className="main-navigation__link" href="/">Home</Link></li>
            <li><Link className="main-navigation__link" href="/solutions">Solutions</Link></li>
            <li><Link className="main-navigation__link" href="/blog">Blog</Link></li>
            <li><Link className="main-navigation__link" href="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}