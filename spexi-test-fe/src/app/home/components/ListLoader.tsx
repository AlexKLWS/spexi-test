import { LoaderAreaCard } from "@/components/smart/LoaderAreaCard";

export const ListLoader = () => {
  return (
    <>
      <div className="h-full overflow-y-scroll pl-16 hidden md:block py-20">
        <LoaderAreaCard />
        <LoaderAreaCard />
        <LoaderAreaCard />
      </div>
      <div className="w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar relative flex items-end gap-8 px-4 md:pt-24 md:hidden z-10">
        <LoaderAreaCard />
        <LoaderAreaCard />
        <LoaderAreaCard />
      </div>
    </>
  );
};
