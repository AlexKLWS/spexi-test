import { forwardRef, useEffect } from "react";
import { MapPinIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BookmarkButton } from "./buttons/BookmarkButton";
import { ScoutingArea } from "@/types/ScoutingArea";
import { Button } from "../ui/button";

type Props = {
  area: ScoutingArea;
  index: number;
  indexChangeCallback?: (index: number) => void;
  handleClick?: () => void;
  isSelected?: boolean;
};

export const ScoutingAreaCard = forwardRef(function PropertyCard(
  props: Props,
  ref: any
) {
  return (
    <section className="snap-center" ref={ref}>
      <Card
        className={`overflow-hidden w-[80vw] md:w-[40vw] lg:w-[20vw] relative pointer-events-auto md:mb-12 ${
          props.isSelected ? "border-2 border-black" : ""
        }`}
      >
        <BookmarkButton
          isBookmarked={props.area.isBookmarked}
          areaId={props.area.id}
        />
        <CardHeader>
          <div className="xl:grid grid-cols-2 gap-6">
            <div>
              <CardTitle className="text-xl font-bold">
                {props.area.title}
              </CardTitle>
              <h4 className="text-xl xl:text-3xl font-semibold py-4 xl:py-6">
                {`${props.area.reward}$SPEXI`}
              </h4>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={props.handleClick}>View</Button>
        </CardContent>
        <CardFooter className="mt-4 block">
          <div className="flex items-center gap-2 h-10">
            <MapPinIcon className="w-5 h-5" />
            <span className="text-sm">{props.area.longitude}</span>
            <span className="text-sm">{props.area.latitude}</span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm">{`Hash: ${props.area.hash}`}</span>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
});
