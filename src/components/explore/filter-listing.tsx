"use client";

import { useMediaQuery } from "@react-hook/media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import { FaSliders } from "react-icons/fa6";

// interface FilterListingProps {
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   open: boolean;
// }
export default function FilterListing() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  //   if (!isDesktop) {
  return (
    <div>
      <Drawer>
        <DrawerTrigger className="">
          <div className="flex justify-center items-center gap-4">
            <span className="font-semibold">Filters</span>
            <FaSliders className="basis-1/3 text-emerald-600" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-screen">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl">
              {/* Contact {title} */}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose className="text-right"></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
  //   }
}
