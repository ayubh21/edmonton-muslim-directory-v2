import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Social } from "@/types/listing";
import { produce } from "immer";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ListingSocials() {
  const { setValue, getValues, register } = useFormContext();
  const [socialList, setSocialList] = useState<Social[]>([]);
  const handleLoadSocial = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSocialList(
      produce((draft) => {
        draft.push({ type: "", url: "" });
      })
    );
  };

  const handleAddSocial = (social: string, index: number) => {
    setSocialList(
      produce((draft) => {
        for (let i = 0; i < socialList.length; i++) {
          if (i === index) {
            draft[i].type = social;
          }
        }
      })
    );
  };

  // extract value before state mutation or else it will come back as undefined
  const debouncedSetUrl = useCallback(
    debounce((index: number, value: string) => {
      setSocialList(
        produce((draft) => {
          if (draft[index]) {
            draft[index].url = value;
          }
        })
      );
    }, 2000),
    []
  );

  useEffect(() => {
    if (!getValues("socialList")) {
      setValue("socialList", []);
    }
  }, []);

  useEffect(() => {
    setValue("socialList", socialList);
  }, [socialList, setValue]);

  return (
    <div>
      <input type="hidden" {...register("socialList")} />
      <div className="mb-4">
        {socialList.length > 0 ? (
          <div>
            {socialList.map((_, index) => (
              <div
                className="md:flex w-full items-center justify-center gap-4 mb-4"
                key={index}
              >
                <div className=" w-full">
                  <Select
                    onValueChange={(value) => handleAddSocial(value, index)}
                  >
                    <div className="border-b border-b-black focus:border-b-amber-600 md:basis-1/2 ">
                      <SelectTrigger className="w-full placeholder:text-black border-none  ">
                        <SelectValue placeholder="Select a Network" />
                      </SelectTrigger>
                    </div>
                    <SelectContent className="">
                      <SelectGroup>
                        <SelectLabel>Select Network</SelectLabel>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Youtube">Youtube</SelectItem>
                        <SelectItem value="Snapchat">Snapchat</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Pinterest">Pinterest</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-full">
                  <input
                    onChange={(e) =>
                      debouncedSetUrl(index, e.currentTarget.value)
                    }
                    placeholder="Enter URL..."
                    className="focus:outline-none border-b-black border-b focus:border-b-emerald-600 placeholder:text-black placeholder:text-sm w-full pb-3.5 "
                    type="text "
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <Button
        className="bg-faintGrey hover:bg-[#f2f3f2] text-black  text-center w-full h-full my-8 shadow-none font-normal p-4"
        onClick={(e) => handleLoadSocial(e)}
      >
        Add
      </Button>
    </div>
  );
}
