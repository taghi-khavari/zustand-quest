import type { PlaygroundProps } from "@/types/game";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { AsyncFishMarketPlayground } from "@/components/playgrounds/AsyncFishMarketPlayground";
import { CartPlayground } from "@/components/playgrounds/CartPlayground";
import { CounterPlayground } from "@/components/playgrounds/CounterPlayground";
import { DevtoolsTimelinePlayground } from "@/components/playgrounds/DevtoolsTimelinePlayground";
import { ImmerForestPlayground } from "@/components/playgrounds/ImmerForestPlayground";
import { PersistCavePlayground } from "@/components/playgrounds/PersistCavePlayground";
import { RenderLabPlayground } from "@/components/playgrounds/RenderLabPlayground";
import { SlicesVillagePlayground } from "@/components/playgrounds/SlicesVillagePlayground";
import { SSRBridgePlayground } from "@/components/playgrounds/SSRBridgePlayground";
import { TestingLabPlayground } from "@/components/playgrounds/TestingLabPlayground";

const playgrounds = {
  counter: CounterPlayground,
  cart: CartPlayground,
  renderLab: RenderLabPlayground,
  async: AsyncFishMarketPlayground,
  persist: PersistCavePlayground,
  slices: SlicesVillagePlayground,
  devtools: DevtoolsTimelinePlayground,
  immer: ImmerForestPlayground,
  ssr: SSRBridgePlayground,
  testing: TestingLabPlayground
};

export function Playground(props: PlaygroundProps) {
  const Active = playgrounds[props.level.playgroundType];
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <h2 className="text-sm font-black">Playground</h2>
      </CardHeader>
      <CardContent>
        <Active {...props} />
      </CardContent>
    </Card>
  );
}
