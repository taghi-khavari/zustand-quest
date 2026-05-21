import { ShoppingCart, X } from "lucide-react";
import type { PlaygroundProps } from "@/types/game";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const products = [
  { id: "honey", name: "Honey API", price: "$12" },
  { id: "nuts", name: "Selector Pack", price: "$8" },
  { id: "fish", name: "Async Fish", price: "$15" }
];

export function CartPlayground({ isSolved, level }: PlaygroundProps) {
  const items = isSolved ? products : products.slice(0, level.id === "remove-from-cart" ? 3 : 0);

  return (
    <div className="min-h-[24rem] rounded-lg bg-white p-5 dark:bg-slate-950">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-black">Cart simulation</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{isSolved ? "Immutable updates are flowing" : "Cart state is waiting"}</p>
        </div>
        <Badge>
          <ShoppingCart className="mr-1 h-3.5 w-3.5" aria-hidden />
          {items.length} items
        </Badge>
      </div>
      <div className="grid gap-3">
        {items.length === 0 && (
          <div className="grid h-40 place-items-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-700">
            Run a passing solution to fill the cart.
          </div>
        )}
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center justify-between rounded-lg border p-3 transition",
              isSolved ? "animate-pop border-moss-200 bg-moss-50 dark:border-moss-800 dark:bg-moss-950" : "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950"
            )}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.price}</p>
            </div>
            {level.id === "remove-from-cart" ? <X className="h-4 w-4 text-slate-500" aria-hidden /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
