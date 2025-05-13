"use client";

import { useMediaQuery } from "@react-hook/media-query";
import { RiRefreshLine, RiUserLocationLine } from "react-icons/ri";
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
import { useEffect, useState } from "react";
import { FaSliders } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categoriesList, tagList } from "@/lib/constants";
import { Latlng, Listing } from "@/types/listing";
import { geocode } from "@/lib/geocode";
import { produce } from "immer";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { FilterX, RefreshCcw, Search } from "lucide-react";
import ListingList from "./listing-list";
import { getDistanceFromLatLonInKm } from "@/lib/utils";
import { MdRefresh } from "react-icons/md";

interface FilterListingProps {
  listings: Listing[];
}

interface Filters {
  category: string;
  proximity: number[];
  searchText: string;
  tags: string[];
}
export default function FilterListing({ listings }: FilterListingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    proximity: [],
    searchText: "",
    tags: [],
  });
  const [position, setPosition] = useState<Latlng>({
    lat: 0,
    lng: 0,
  });
  const [address, setAddress] = useState("");

  const clearFilters = () => {
    setFilters(
      produce((draft) => {
        (draft.category = ""),
          (draft.proximity = []),
          ((draft.searchText = ""), (draft.tags = [""]));
      })
    );
    // TODO make sure filters clear in memory as well
  };

  useEffect(() => {
    const addressFromCoordinates = async () => {
      const response = await geocode.getAddress(position);
      if (response.results.length > 0) {
        setAddress(response.results[0].formatted_address);
      }
    };
    addressFromCoordinates();
  }, [position]);

  useEffect(() => {
    // Start with the original listings
    let initialListings = listings;

    // Apply searchText filter
    if (filters.searchText) {
      initialListings = initialListings.filter(({ title }) =>
        title.toLowerCase().includes(filters.searchText.toLowerCase())
      );
      console.log("After searchText filter:", initialListings.length);
    }
    // Apply category filter
    if (filters.category) {
      initialListings = initialListings.filter(({ categories }) => {
        return (
          categories.filter((category) => {
            return category.category === filters.category;
          }).length > 0
        );
      });
    }
    console.log(initialListings, "second");
    // Apply proximity filter
    if (filters.proximity && address) {
      initialListings = initialListings.filter((listing) => {
        const distance = getDistanceFromLatLonInKm(
          listing.addresses[0].lat,
          listing.addresses[0].lng,
          position.lat,
          position.lng
        );
        return distance <= filters.proximity[0];
      });
    }

    if (filters.tags.length > 0) {
      initialListings = initialListings.filter((listing) => {
        return listing.tags.some((tagObj) => {
          return filters.tags.includes(tagObj.tag);
        });
      });
    }

    console.log(initialListings);
    setFilteredListings(initialListings);
  }, [filters]);

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition(
            produce((draft) => {
              draft.lat = latitude;
              draft.lng = longitude;
            })
          );
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("you must have location enabled to use this feature");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            default:
              alert("An unknown error occurred.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <Drawer>
        <div className="flex  justify-between w-full mb-4">
          <div className="flex flex-row-reverse  items-center justify-between ">
            <Input
              onChange={(e) =>
                setFilters(
                  produce((draft) => {
                    draft.searchText = e.target.value;
                  })
                )
              }
              type="text"
              placeholder="What are you looking for?"
              className="border-none focus:outline-none  focus-visible:ring-0 placeholder:text-black "
            />
            <Search size={20} />
          </div>
          <DrawerTrigger className="">
            <div className="flex justify-between">
              <span className="font-semibold flex gap-2 justify-center items-center cursor-pointer ">
                Filters
                <FaSliders className="basis-1/3 text-emerald-600 border-none " />
              </span>
            </div>
          </DrawerTrigger>
        </div>
        <DrawerContent className="h-screen">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl flex justify-around gap-2">
              <span className="bg-[#f2f3f2] p-2.5 cursor-pointer">
                <MdRefresh onClick={clearFilters} className="" />
              </span>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-800 rounded-none">
                Apply Filters
              </Button>
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 ">
            <div>
              <input
                type="text"
                onChange={(e) =>
                  setFilters(
                    produce((draft) => {
                      draft.searchText = e.target.value;
                    })
                  )
                }
                // onChange={filterWithSearch}
                placeholder="What are you looking for?"
                className="placeholder placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 "
              />
            </div>
            <div>
              <h3 className="font-normal">Categories</h3>
              <Select
                onValueChange={(value) =>
                  setFilters(
                    produce((draft) => {
                      draft.category = value;
                    })
                  )
                }
              >
                <div className="focus:border-b-emerald-600 border-b">
                  <SelectTrigger className="w-full border-none font-semibold cursor-pointer">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </div>
                <SelectContent side="bottom">
                  <div>
                    {categoriesList.map((_, index) => (
                      <div key={index}>
                        <SelectItem value={categoriesList[index]} key={index}>
                          {categoriesList[index]}
                        </SelectItem>
                      </div>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="text"
                defaultValue={address}
                placeholder="Where to look?"
                className="placeholder:font-normal placeholder:text-black w-full py-3.5 focus:outline-none border-b focus:border-b-emerald-600 mb-4 font-semibold"
              />
              <RiUserLocationLine
                onClick={handleLocationAccess}
                className="h-5 w-5 mb-3.5 hover:opacity-25"
              />
            </div>
            <div className="mb-4">
              {address && (
                <div>
                  <h3 className=" mb-2">{`Proximity ${filters.proximity}km`}</h3>
                  <Slider
                    defaultValue={filters.proximity}
                    className="bg-emerald-600"
                    max={40}
                    onValueChange={(v) => {
                      setFilters(
                        produce((draft) => {
                          draft.proximity = v;
                        })
                      );
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <h2 className="mb-2">Features</h2>
              {tagList.map((tag, index) => (
                <div className="flex gap-2" key={index}>
                  <input
                    className={`h-8 w-8 mb-2 peer:checked:black`}
                    value={tag}
                    onChange={(e) => {
                      setFilters(
                        produce((draft) => {
                          draft.tags.push(e.target.value);
                        })
                      );
                    }}
                    type="checkbox"
                  />
                  {tag}
                </div>
              ))}
            </div>
            <div>
              <Select>
                <h3>Order By</h3>
                <div className="focus:border-b-emerald-600 border-b">
                  <SelectTrigger className="w-full border-none font-semibold cursor-pointer">
                    <SelectValue placeholder="Order By" />
                  </SelectTrigger>
                </div>
                <SelectContent side="bottom">
                  <div>
                    {["Latest", "Nearby", "Random", "A-Z"].map(
                      (filter, index) => (
                        <div key={index}>
                          <SelectItem value={filter} key={index}>
                            {filter}
                          </SelectItem>
                        </div>
                      )
                    )}
                  </div>
                </SelectContent>
              </Select>
            </div>
            {/* TODO style checked checkbox */}
          </div>
          <DrawerFooter>
            <DrawerClose className="text-right"></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <section className="bg-[#f4f4f4] h-screen px-4 ">
        <ListingList listings={filteredListings} />
      </section>
    </div>
  );
}
