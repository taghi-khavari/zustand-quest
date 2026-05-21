import type { Level } from "@/types/game";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ConceptBadge } from "./ConceptBadge";

export function LessonPanel({ level }: { level: Level }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-moss-700 dark:text-moss-300">Mission {level.order}</p>
            <h1 className="text-xl font-black">{level.title}</h1>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {level.difficulty}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 overflow-auto">
        <section>
          <h2 className="mb-2 text-sm font-black">Story</h2>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{level.story}</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-black">Mission</h2>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{level.mission}</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-black">How It Works</h2>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{level.explanation}</p>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-black">Objectives</h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {level.learningObjectives.map((objective) => (
              <li key={objective} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-moss-500" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-black">Why This Matters</h2>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{level.whyItMatters}</p>
        </section>
        <div className="flex flex-wrap gap-2">
          {level.conceptTags.map((tag) => (
            <ConceptBadge key={tag} tag={tag} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
