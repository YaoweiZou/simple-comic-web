import { Button, Slider, SliderValue } from "@nextui-org/react";
import { useState } from "react";
import { IconXmark } from "../icons/IconXmark";

export default function Zoom() {
  const [value, setValue] = useState<SliderValue>(50);

  return (
    <div className="flex h-full w-44 max-w-md flex-col items-start justify-center gap-2">
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
            <IconXmark fill="#1d1d1f" fillOpacity="0.85" />
          </Button>
        }
        endContent={
          <Button
            isIconOnly
            variant="light"
            radius="sm"
            onPress={() => setValue(prev => (prev <= 90 ? prev + 10 : 100))}
          >
            <IconXmark fill="#1d1d1f" fillOpacity="0.85" />
          </Button>
        }
      />
    </div>
  );
}
