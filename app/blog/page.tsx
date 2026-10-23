import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Econoheim",
};

export default function BlogPage() {
  return <main className="min-h-0 flex-1 bg-white" aria-label="Blog" />;
}
