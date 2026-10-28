import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="shell enter py-24 text-center">
      <Compass className="mx-auto text-brand-600" size={38} />
      <p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-brand-600">
        404 · Lost your way?
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold">
        This page has checked out.
      </h1>
      <p className="mt-4 text-slate-500">
        The page doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex rounded-full bg-brand-600 px-6 py-3 font-bold text-white"
      >
        Back to home
      </Link>
    </section>
  );
}