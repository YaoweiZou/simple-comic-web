import { Button, Slider, SliderValue } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Zoom() {
  const [value, setValue] = useState<SliderValue>(50);

  return (
    <div className="flex w-44 flex-col justify-center gap-2 px-2">
      <Slider
        aria-label="Volume"
        className="max-w-md"
        size="sm"
        color="primary"
        value={value}
        onChange={setValue}
        startContent={
          <Button
            isIconOnly
            variant="light"
            radius="sm"
            onPress={() => setValue(prev => (prev >= 10 ? prev - 10 : 0))}
          >
            <Minus strokeWidth={1.5} />
          </Button>
        }
        endContent={
          <Button
            isIconOnly
            variant="light"
            radius="sm"
            onPress={() => setValue(prev => (prev <= 90 ? prev + 10 : 100))}
          >
            <Plus strokeWidth={1.5} />
          </Button>
        }
      />
    </div>
  );
}
