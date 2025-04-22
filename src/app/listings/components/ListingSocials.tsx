import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { produce } from "immer";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

type Social = {
  type: string;
  url: string;
};

export default function ListingSocials() {
  const [socialList, setSocialList] = useState<Social[]>([]);
  const [url, setUrl] = useState("");

  const handleLoadSocial = (e) => {
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
    console.log(socialList);
  }, [socialList]);

  return (
    <div>
      <div>
        {socialList.length > 0 ? (
          <div>
            {socialList.map((_, index) => (
              <div key={index}>
                <div className="md:flex">
                  <Select
                    onValueChange={(value) => handleAddSocial(value, index)}
                  >
                    <div className="border-b border-b-black focus:border-b-amber-600 ">
                      <SelectTrigger className="w-full placeholder:text-black border-none  ">
                        <SelectValue placeholder="Select a Network" />
                      </SelectTrigger>
                    </div>
                    <SelectContent>
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
                <div className="w-full">
                  <input
                    onChange={(e) =>
                      debouncedSetUrl(index, e.currentTarget.value)
                    }
                    placeholder="Enter URL..."
                    className="focus:outline-none border-b-black border-b focus:border-b-emerald-600 placeholder:text-black w-full"
                    type="text "
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <Button
        className="w-full bg-white text-black  hover:bg-[rgb(0 0 0 / 3%)]"
        onClick={(e) => handleLoadSocial(e)}
      >
        Add
      </Button>
    </div>
  );
}
