import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { produce } from "immer";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ListingDetails() {
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>(
    []
  );
  const [selectedTagsList, setSelectedTagsList] = useState<string[]>([]);
  const categoriesList = [
    "Automotives",
    "Events & Weddings",
    "Fashion & Men Grooming",
    "Food",
    "Government",
    "Finanical Services",
    "Gym and Fitness",
    "Online Taxi",
    "Muslim Services",
    "Travel",
    "Fashion & Women Beauty",
    "Education",
  ];

  const tagList = [
    "Accept Credit Cards",
    "Bike Parking",
    "Coupons",
    "Parking Street",
    "Wireless Internet",
  ];
  const handleAddCategory = (category: string) => {
    setSelectedCategoryList(
      produce((draft) => {
        draft.push(category);
      })
    );
  };

  const handleRemoveCategory = (index: number) => {
    for (let i = 0; i < selectedCategoryList.length; i++) {
      if (i === index) {
        setSelectedCategoryList(
          produce((draft) => {
            draft.splice(i, 1);
          })
        );
      }
    }
  };

  const handleAddTag = (category: string) => {
    setSelectedTagsList(
      produce((draft) => {
        draft.push(category);
      })
    );
  };

  const handleRemoveTag = (index: number) => {
    for (let i = 0; i < selectedCategoryList.length; i++) {
      if (i === index) {
        setSelectedTagsList(
          produce((draft) => {
            draft.splice(i, 1);
          })
        );
      }
    }
  };

  return (
    <div className="px-4">
      <div>
        <h3 className="font-semibold">Categories</h3>
        <Select onValueChange={(value: string) => handleAddCategory(value)}>
          <div>
            <SelectTrigger className="w-full border-none">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
          </div>
          <SelectContent side="bottom">
            <div>
              {categoriesList.map((type, index) => (
                <div key={index}>
                  <SelectItem value={categoriesList[index]} key={index}>
                    {categoriesList[index]}
                  </SelectItem>
                </div>
              ))}
            </div>
          </SelectContent>
        </Select>

        <div className="flex flex-col gap-2">
          {selectedCategoryList.length > 0 && (
            <div className="flex flex-col gap-2">
              {selectedCategoryList.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-start items-center gap-2  bg-gray-100 px-3 py-2 rounded-md"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(index)}
                  >
                    <X size={20} />
                  </button>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr className="w-full my-4" />
      <h3 className="font-semibold ">Tags</h3>
      <Select onValueChange={(value: string) => handleAddTag(value)}>
        <div>
          <SelectTrigger className="w-full border-none">
            <SelectValue placeholder="Select Tags" />
          </SelectTrigger>
        </div>
        <SelectContent side="bottom">
          <div>
            {tagList.map((type, index) => (
              <div key={index}>
                <SelectItem value={tagList[index]}>{tagList[index]}</SelectItem>
              </div>
            ))}
          </div>
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-2">
        {selectedTagsList.length > 0 && (
          <div className="flex flex-col gap-2">
            {selectedTagsList.map((tag, index) => (
              <div
                key={index}
                className="flex flex-start items-center gap-2  bg-gray-100 px-3 py-2 rounded-md"
              >
                <button type="button" onClick={() => handleRemoveTag(index)}>
                  <X size={20} />
                </button>
                <span>{tag}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
