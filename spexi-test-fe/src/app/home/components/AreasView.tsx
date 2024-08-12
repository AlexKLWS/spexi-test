"use client";

import dynamic from "next/dynamic";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { createRef, useEffect, useRef, useState } from "react";

import { ScoutingAreaCard } from "@/components/smart/ScoutingAreaCard";
import { Button } from "@/components/ui/button";
import { ScoutingArea } from "@/types/ScoutingArea";
import { SelectedAreaContext } from "@/lib/context/SelectedAreaContext";

type Props = {
  areas: ScoutingArea[];
};

const MapBackground = dynamic(
  () => import("@/components/smart/map/MapBackground"),
  {
    ssr: false,
  }
);

export const AreasView = (props: Props) => {
  const horizontalElementRefs = useRef<any[]>(
    Array(props.areas.length)
      .fill(0)
      .map(() => createRef())
  );

  const verticalElementRefs = useRef<any[]>(
    Array(props.areas.length)
      .fill(0)
      .map(() => createRef())
  );

  useEffect(() => {
    horizontalElementRefs.current = Array(props.areas.length)
      .fill(0)
      .map((_, i) => horizontalElementRefs.current[i] || createRef());
    verticalElementRefs.current = Array(props.areas.length)
      .fill(0)
      .map((_, i) => verticalElementRefs.current[i] || createRef());
  }, [props.areas]);

  const itemIndex = useRef<number | null>(null);

  const indexChangeCallback = (index: number) => {
    itemIndex.current = index;
  };

  const [selectedArea, setSelectedArea] = useState<ScoutingArea>(
    props.areas[0]
  );

  useEffect(() => {
    const index = props.areas.findIndex((a) => a.id === selectedArea.id);
    verticalElementRefs.current[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    horizontalElementRefs.current[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedArea]);

  return (
    <>
      <MapBackground
        areas={props.areas}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />
      <div className="h-full overflow-y-scroll pl-16 hidden md:block py-20">
        {props.areas.map((a, index) => (
          <ScoutingAreaCard
            key={a.id}
            ref={verticalElementRefs?.current?.[index]}
            index={index}
            area={a}
            isSelected={a.id === selectedArea.id}
            handleClick={() => {
              setSelectedArea(a);
            }}
          />
        ))}
      </div>
      <div className="w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar relative flex items-end gap-8 px-4 md:pt-24 md:hidden z-10">
        {props.areas.map((a, index) => (
          <ScoutingAreaCard
            key={a.id}
            ref={horizontalElementRefs?.current?.[index]}
            index={index}
            indexChangeCallback={indexChangeCallback}
            area={a}
            isSelected={a.id === selectedArea.id}
            handleClick={() => {
              setSelectedArea(a);
            }}
          />
        ))}
      </div>
    </>
  );
};
