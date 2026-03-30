import { Link } from "react-router";

export default function NotFoundScreen() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-6 px-10">
      <h1 className="text-[length:var(--text-heading)] font-extrabold tracking-[-0.06em] leading-none text-[var(--color-blackish)]">
        404.
      </h1>
      <p className="text-[length:var(--text-body)] text-[var(--color-blackish)] opacity-50">
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="border-b border-[var(--color-blackish)] hover:text-[var(--color-yellow)] hover:border-[var(--color-yellow)] transition-colors duration-300"
      >
        Go back home
      </Link>
    </div>
  );
}