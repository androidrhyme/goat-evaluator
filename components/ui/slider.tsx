"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbClassName?: string;
  renderThumb?: () => React.ReactNode;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, thumbClassName, renderThumb, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={`relative flex w-full touch-none select-none items-center ${className}`}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-700">
        <SliderPrimitive.Range className="absolute h-full bg-orange-500" />
      </SliderPrimitive.Track>
      {props.value?.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={`block h-6 w-6 rounded-full bg-orange-500 border-2 border-white shadow-md flex items-center justify-center ${thumbClassName}`}
        >
          {renderThumb?.()}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = "Slider";
export { Slider };
