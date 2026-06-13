import Link from "next/link";
import { ProjectForm } from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="container-page max-w-2xl space-y-6 py-8">
      <header>
        <Link
          href="/manager"
          className="text-sm font-medium text-emerald hover:underline"
        >
          ← Back to dashboard
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
          New project
        </h1>
        <p className="mt-1 text-sm text-muted">
          New projects are created in <span className="font-medium">draft</span>{" "}
          status. You can submit for validation from the edit page.
        </p>
      </header>

      <ProjectForm mode="create" />
    </div>
  );
}
