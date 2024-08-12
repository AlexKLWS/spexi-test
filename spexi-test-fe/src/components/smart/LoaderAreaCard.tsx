import { MapPinIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const LoaderAreaCard = () => {
  return (
    <section className="snap-center">
      <Card
        className={`overflow-hidden w-[80vw] md:w-[40vw] lg:w-[20vw] relative pointer-events-auto md:mb-12`}
      >
        <CardHeader>
          <div className="xl:grid grid-cols-2 gap-6">
            <div>
              <CardTitle>
                <Skeleton className="h-7 w-72" />
              </CardTitle>
              <Skeleton className="h-8 w-44 my-4 xl:my-6" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-14" />
        </CardContent>
        <CardFooter className="mt-4 block">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-32" />
        </CardFooter>
      </Card>
    </section>
  );
};
