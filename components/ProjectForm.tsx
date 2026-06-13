"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { ProjectImage, sceneForCategory } from "./ProjectImage";
import type { Project, ProjectCategory } from "@/types";

const categories: ProjectCategory[] = [
  "real-estate",
  "tech",
  "agriculture",
  "energy",
  "crafts",
];

interface ProjectFormProps {
  initial?: Partial<Project>;
  mode: "create" | "edit";
}

export function ProjectForm({ initial, mode }: ProjectFormProps) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    summary: initial?.summary ?? "",
    description: initial?.description ?? "",
    category: (initial?.category ?? "agriculture") as ProjectCategory,
    goal: initial?.goal ?? 50000,
    imageHue: initial?.imageHue ?? 145,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Template scope: no real persistence. Log and surface success.
    // eslint-disable-next-line no-console
    console.log(`[mock] ${mode} project`, form);
    setSubmitted(true);
    setTimeout(() => {
      router.push("/manager");
    }, 1200);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-emerald/30 bg-emerald/5 p-6 text-center">
        <div className="font-display text-lg font-semibold text-emerald">
          {mode === "create" ? "Project created (mock)" : "Changes saved (mock)"}
        </div>
        <div className="mt-1 text-sm text-muted">
          Redirecting to your dashboard…
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label="Title">
        <input
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="One-line summary">
        <input
          required
          value={form.summary}
          onChange={(e) => update("summary", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value as ProjectCategory)}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Goal (EUR)">
          <input
            type="number"
            min={1000}
            step={1000}
            value={form.goal}
            onChange={(e) => update("goal", Number(e.target.value))}
            className={inputClass}
          />
        </Field>

        <Field label="Cover hue (0–360)">
          <input
            type="number"
            min={0}
            max={360}
            value={form.imageHue}
            onChange={(e) => update("imageHue", Number(e.target.value))}
            className={inputClass}
          />
        </Field>
      </div>

      <ProjectImage
        scene={sceneForCategory(form.category)}
        hue={form.imageHue}
        className="arch-thumb h-24 w-full"
      />

      <div className="flex gap-2">
        <Button type="submit" fullWidth>
          {mode === "create" ? "Create project" : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/manager")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-muted/30 bg-ivory px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
