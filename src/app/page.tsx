"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Play, Route, Sparkles } from "lucide-react";
import { levels } from "@/data/levels";
import { getChapters } from "@/lib/game/levelEngine";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/game/ProgressBar";
import { useCompletedCount } from "@/stores/useGameProgressStore";

const summary =
  "Zustand is a small, hook-based state management library for React. You create a store, put state and actions inside it, and components subscribe to exactly the state they need through selectors. The practical power comes from its low boilerplate, simple actions, strong TypeScript support, middleware like persist/devtools/immer, and careful selector usage to avoid unnecessary renders.";

export default function HomePage() {
  const completed = useCompletedCount();
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-moss-200 bg-white/75 px-3 py-2 text-sm font-bold text-moss-800 dark:border-moss-800 dark:bg-slate-950/75 dark:text-moss-200">
            <Sparkles className="h-4 w-4" aria-hidden />
            24 levels from zero to practical fluency
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 dark:text-white md:text-6xl">
            Zustand Quest: Bear Store Academy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200">{summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/play" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-moss-600 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-moss-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-500 dark:bg-moss-500 dark:text-moss-950">
              {completed > 0 ? "Continue" : "Start"}
              <Play className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/concepts" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-base font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              Cheat sheet
              <BookOpen className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-8 max-w-md">
            <ProgressBar />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white/78 p-4 shadow-soft dark:border-slate-800 dark:bg-slate-950/76">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-black">Concept Map</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Seven chapters, one practical path</p>
            </div>
            <Route className="h-5 w-5 text-moss-600" aria-hidden />
          </div>
          <div className="grid gap-3">
            {getChapters().map((chapter, index) => {
              const chapterLevels = levels.filter((level) => level.chapter === chapter);
              return (
                <div key={chapter} className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h2 className="font-bold">{chapter}</h2>
                    <span className="text-xs font-bold text-slate-500">{chapterLevels.length} levels</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(chapterLevels.flatMap((level) => level.conceptTags))).slice(0, 5).map((tag) => (
                      <span key={tag} className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {index < getChapters().length - 1 && <div className="mx-4 mt-3 h-4 border-l-2 border-dashed border-moss-300 dark:border-moss-700" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-10 dark:bg-slate-950/55">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3">
          {[
            ["Visual feedback", "Write a small Zustand snippet, run it, and watch the dashboard repair itself."],
            ["Safe validation", "Static checks validate APIs, patterns, and mistakes without evaluating user code."],
            ["Production habits", "Selectors, persist, devtools, slices, SSR awareness, and tests are all practiced."]
          ].map(([title, body]) => (
            <Card key={title}>
              <CardHeader>
                <h2 className="text-sm font-black">{title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
