import { basicStoreExample, componentUsageExample, conceptSections } from "@/data/concepts";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function ConceptsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wide text-moss-700 dark:text-moss-300">Cheat sheet</p>
        <h1 className="text-4xl font-black">Practical Zustand Concepts</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
          A compact reference for the patterns used throughout Bear Store Academy.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-black">Basic Store Example</h2>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
              <code>{basicStoreExample}</code>
            </pre>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-black">Component Usage</h2>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
              <code>{componentUsageExample}</code>
            </pre>
          </CardContent>
        </Card>
        {conceptSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <h2 className="text-lg font-black">{section.title}</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {section.body.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-moss-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
