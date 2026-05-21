import { Badge } from "@/components/ui/Badge";

export function ConceptBadge({ tag }: { tag: string }) {
  return <Badge className="border-moss-200 bg-moss-50 text-moss-800 dark:border-moss-800 dark:bg-moss-950 dark:text-moss-100">{tag}</Badge>;
}
