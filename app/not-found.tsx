import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Not found
      </h1>
      <p className="mt-2 text-muted">
        That project doesn't exist or has been withdrawn.
      </p>
      <Link
        href="/projects"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-emerald px-5 text-sm font-medium text-ivory hover:bg-emerald-light"
      >
        Browse projects
      </Link>
    </div>
  );
}
