import { Button, Slider, SliderValue } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Zoom() {
  const [value, setValue] = useState<SliderValue>(200);

  return (
    <div className="flex w-52 flex-col justify-center gap-2 px-2">
      <Slider
        aria-label="Volume"
        className="max-w-md"
        size="sm"
        color="primary"
        value={value}
        minValue={100}
        maxValue={400}
        onChange={setValue}
        startContent={
          <Button
            isIconOnly
            variant="light"
            radius="sm"
            onPress={() => setValue(prev => ((prev as number) >= 10 ? (prev as number) - 10 : 0))}
          >
            <Minus strokeWidth={1.5} />
          </Button>
        }
        endContent={
          <Button
            isIconOnly
            variant="light"
            radius="sm"
            onPress={() => setValue(prev => ((prev as number) <= 90 ? (prev as number) + 10 : 100))}
          >
            <Plus strokeWidth={1.5} />
          </Button>
        }
      />
    </div>
  );
}
