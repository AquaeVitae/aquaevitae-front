"use client";

import { Slider } from "./Slider";
import { SPONSORS } from "@/lib/sponsors";

export function SponsorsSlider() {
  return (
    <div className="flex flex-col rounded-lg">
      <Slider>
        {SPONSORS.map(({ icon, link }, index) => (
          <div key={index} className="flex items-center gap-1">
            <a href={link} target="_blank">
              {icon}
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
