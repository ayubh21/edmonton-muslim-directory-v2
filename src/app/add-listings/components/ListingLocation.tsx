import React, { useState, useEffect, useRef } from "react";
import {
  Libraries,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  AdvancedMarker,
  Map,
  useMap,
  Pin,
  APIProvider,
} from "@vis.gl/react-google-maps";
import { fromPlaceId, setKey, setRegion } from "react-geocode";
import { produce } from "immer";
import { MdDelete, MdMyLocation } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { add } from "lodash";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, Menu, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Latlng {
  lat: number;
  lng: number;
}

type Locations = {
  coordinates: Latlng[];
};

const libraries: Libraries = ["places"];
export default function ListingLocation() {
  const [locations, setLocations] = useState<Locations>({
    coordinates: [{ lat: 53.5461, lng: -113.4938 }],
  });
  const [region, setRegion] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [address, setAddress] = useState(""); // could improve and make better without having to use another state
  const commandRef = useRef<google.maps.places.SearchBox>(null);
  const map = useMap(process.env.NEXT_PUBLIC_MAP_ID);

  useEffect(() => {
    console.log();
    setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
    if (lat != "" && lng != "") {
      handleGetAddress();
    }
  }, [address]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
    version: "weekly",
  });

  const handleOnPlacesChanged = async (index: number) => {
    const address = commandRef.current?.getPlaces();
    const placeId = address![0].place_id;
    const results = await fromPlaceId(placeId!);
    const location = results.results[0].geometry.location;
    setLocations(
      produce((draft) => {
        for (let i = 0; i < draft.coordinates.length; i++) {
          if (i == index) {
            draft.coordinates[i].lat = location.lat;
            draft.coordinates[i].lng = location.lng;
          }
        }
      })
    );
  };

  const handleAddLocations = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLocations(
      produce((draft) => {
        draft.coordinates.push({ lat: 53.5461, lng: -113.4938 });
      })
    );
  };

  const handleEnterCoordinatesManually = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowCoordinates(!showCoordinates);
  };

  const handleGetAddress = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "User-Agent":
            " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        },
      };
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDVmokR0ugUPTUJzo3hVdY45XeJepyP3Vk`,
        options
      );
      const data = await response.json();
      const address = data.results[0].formatted_address;

      setAddress(address);
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemoveLocation = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    for (let i = 0; i < locations.coordinates.length; i++) {
      if (i == index) {
        setLocations(
          produce((draft) => {
            draft.coordinates.splice(index, 1);
          })
        );
      }
    }
  };
  const regions = [
    "Downtown",
    "West Edmonton",
    "Southside",
    "Northside",
    "Mill Woods",
  ];
  const handleClick = (tag: string) => {
    setRegion(
      produce((draft) => {
        draft.push(tag);
      })
    );
  };

  const handleRemoveRegion = (index: number) => {
    for (let i = 0; i < regions.length; i++) {
      if (i === index) {
        setRegion(
          produce((draft) => {
            draft.splice(i, 1);
          })
        );
      }
    }
  };

  return (
    <div className={"mt-3"}>
      {isLoaded && (
        <div className={"px-4 pt-4"}>
          {locations.coordinates.map((locations, index) => (
            <div key={index}>
              <div className={""}>
                <StandaloneSearchBox
                  onLoad={(ref) => (commandRef.current = ref)}
                  onPlacesChanged={() => handleOnPlacesChanged(index)}
                >
                  <div className=" items-center  mb-4 relative">
                    <input
                      onChange={(e) => setAddress(e.currentTarget.value)}
                      type="text"
                      placeholder="Enter your location"
                      value={address}
                      className={
                        " border-b-black border-b focus:border-b-emerald-600  w-full text-left py-3.5 placeholder-black outline-none  top-0"
                      }
                    />
                    <MdMyLocation
                      size={18}
                      className="absolute right-0 bottom-4"
                    />
                  </div>
                </StandaloneSearchBox>
                <button
                  onClick={handleEnterCoordinatesManually}
                  className="text-right w-full py-5 outline-none"
                >
                  Enter coordinates manually
                </button>
                {showCoordinates && (
                  <div className=" flex">
                    <div>
                      <label>Latitude</label>
                      <input
                        className="  w-full outline-none  py-3.5   border-b-black border-b focus:border-b-emerald-600"
                        type="text"
                        onChange={(e) => setLat(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Longitude</label>
                      <input
                        className=" locationBorder w-full outline-none focus:border-b-violet py-3.5  border-b-black border-b focus:border-b-emerald-600"
                        type="text"
                        onChange={(e) => setLng(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={"h-56"}>
                <Map
                  defaultCenter={locations}
                  defaultZoom={10}
                  streetViewControl={false}
                  mapTypeControl={false}
                  center={locations}
                  mapId={process.env.NEXT_PUBLIC_MAP_ID}
                  zoomControl={false}
                >
                  <AdvancedMarker
                    position={{ lat: locations.lat, lng: locations.lng }}
                  >
                    <Pin />
                  </AdvancedMarker>
                </Map>
              </div>
              <div className="relative my-4">
                <hr />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={(e) => handleRemoveLocation(e, index)}
                    className="bg-white p-2 rounded-full shadow-lg"
                  >
                    {/* Replace with your delete icon */}
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={handleAddLocations}
            className={
              "bg-faintGrey hover: text-black  text-center w-full h-full my-8 shadow-none font-normal p-4 hover:bg-[#f2f3f2]"
            }
          >
            Add Location
          </Button>
        </div>
      )}
      <hr />
    </div>
  );
}
