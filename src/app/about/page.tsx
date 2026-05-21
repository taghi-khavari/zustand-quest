import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardHeader>
          <p className="text-xs font-bold uppercase tracking-wide text-moss-700 dark:text-moss-300">About</p>
          <h1 className="text-3xl font-black">Zustand Quest: Bear Store Academy</h1>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <p>
            This is a frontend-only learning game for practicing the Zustand patterns that matter in day-to-day React and TypeScript work.
            It uses static validation instead of executing snippets, stores progress locally with Zustand persist, and runs without a backend.
          </p>
          <p>
            The curriculum follows a practical path: create a store, write actions, select state carefully, manage async flows, use middleware,
            organize larger stores, handle Next.js hydration, and test store behavior.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
