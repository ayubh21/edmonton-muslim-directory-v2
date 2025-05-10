import React, { useState, useEffect, useRef } from "react";
import {
  Libraries,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { fromPlaceId, setKey } from "react-geocode";
import { produce } from "immer";
import { MdDelete, MdMyLocation } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

// TODO fix this later
interface Latlng {
  lat: number;
  lng: number;
}

type Locations = {
  coordinates: Latlng[];
};

const libraries: Libraries = ["places"];

export default function ListingLocation() {
  const { setValue, getValues, register } = useFormContext();

  const [locations, setLocations] = useState<Locations>({
    coordinates: [{ lat: 53.5461, lng: -113.4938 }],
  });

  const [addresses, setAddresses] = useState<string[]>([""]);

  const [showCoordinates, setShowCoordinates] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const commandRef = useRef<google.maps.places.SearchBox>(null);

  useEffect(() => {
    if (!getValues("addresses")) {
      setValue("addresses", []);
    }
  }, [getValues, setValue]);

  useEffect(() => {
    setValue("addresses", addresses);
  }, [addresses, setValue]);

  useEffect(() => {
    setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
    if (lat !== "" && lng !== "") {
      handleGetAddress(
        Number(lat),
        Number(lng),
        locations.coordinates.length - 1
      );
    }
  }, [lat, lng, locations.coordinates.length]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
    version: "weekly",
  });

  const handleOnPlacesChanged = async (index: number) => {
    const searchResults = commandRef.current?.getPlaces();
    if (searchResults && searchResults.length > 0) {
      const placeId = searchResults[0].place_id;
      const placeAddress = searchResults[0].formatted_address;

      if (placeId) {
        try {
          const results = await fromPlaceId(placeId);
          const location = results.results[0].geometry.location;

          setLocations(
            produce((draft) => {
              if (index < draft.coordinates.length) {
                draft.coordinates[index].lat = location.lat;
                draft.coordinates[index].lng = location.lng;
              }
            })
          );

          // Update address in our local array
          setAddresses(
            produce((draft) => {
              if (index < draft.length) {
                draft[index] = placeAddress || "";
              } else {
                draft.push(placeAddress || "");
              }
            })
          );
        } catch (error) {
          console.error("Error getting place details:", error);
        }
      }
    }
  };

  const handleAddLocations = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLocations(
      produce((draft) => {
        draft.coordinates.push({ lat: 53.5461, lng: -113.4938 });
      })
    );

    // Add empty address to our array
    setAddresses(
      produce((draft) => {
        draft.push("");
      })
    );
  };

  const handleGetAddress = async (
    latitude: number,
    longitude: number,
    index: number
  ) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
        },
      };

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        options
      );

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;

        // Update address in our local array
        setAddresses(
          produce((draft) => {
            if (index < draft.length) {
              draft[index] = formattedAddress;
            } else {
              draft.push(formattedAddress);
            }
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveLocation = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();

    // Don't remove if it's the last one
    if (locations.coordinates.length <= 1) return;

    setLocations(
      produce((draft) => {
        draft.coordinates.splice(index, 1);
      })
    );

    // Also remove from addresses array
    setAddresses(
      produce((draft) => {
        draft.splice(index, 1);
      })
    );
  };

  const handleManualCoordinateChange = async (index: number) => {
    if (lat && lng) {
      // Update coordinates
      setLocations(
        produce((draft) => {
          if (index < draft.coordinates.length) {
            draft.coordinates[index].lat = Number(lat);
            draft.coordinates[index].lng = Number(lng);
          }
        })
      );

      // Get address from coordinates
      await handleGetAddress(Number(lat), Number(lng), index);
    }
  };

  return (
    <div className={"mt-3"}>
      <input type="hidden" {...register("addresses")} />

      {isLoaded && (
        <div className={"px-4 pt-4"}>
          {locations.coordinates.map((location, index) => (
            <div key={index}>
              <div className={""}>
                <StandaloneSearchBox
                  onLoad={(ref) => (commandRef.current = ref)}
                  onPlacesChanged={() => handleOnPlacesChanged(index)}
                >
                  <div className="items-center mb-4 relative">
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={addresses[index] || ""}
                      onChange={(e) => {
                        setAddresses(
                          produce((draft) => {
                            draft[index] = e.target.value;
                          })
                        );
                      }}
                      className="border-b-black border-b focus:border-b-emerald-600 w-full text-left py-3.5 placeholder-black outline-none top-0"
                    />
                    <MdMyLocation
                      size={18}
                      className="absolute right-0 bottom-4"
                    />
                  </div>
                </StandaloneSearchBox>

                <button
                  onClick={() => setShowCoordinates(!showCoordinates)}
                  className="text-right w-full py-5 outline-none"
                >
                  Enter coordinates manually
                </button>

                {showCoordinates && (
                  <div className="flex">
                    <div>
                      <label>Latitude</label>
                      <input
                        className="w-full outline-none py-3.5 border-b-black border-b focus:border-b-emerald-600"
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        onBlur={() => handleManualCoordinateChange(index)}
                      />
                    </div>
                    <div>
                      <label>Longitude</label>
                      <input
                        className="locationBorder w-full outline-none focus:border-b-violet py-3.5 border-b-black border-b focus:border-b-emerald-600"
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        onBlur={() => handleManualCoordinateChange(index)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={"h-56"}>
                <Map
                  defaultCenter={location}
                  defaultZoom={10}
                  streetViewControl={false}
                  mapTypeControl={false}
                  center={location}
                  mapId={process.env.NEXT_PUBLIC_MAP_ID}
                  zoomControl={false}
                >
                  <AdvancedMarker
                    position={{ lat: location.lat, lng: location.lng }}
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
                    disabled={locations.coordinates.length <= 1}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Button
            onClick={handleAddLocations}
            className="bg-faintGrey text-black text-center w-full h-full my-8 shadow-none font-normal p-4 hover:bg-[#f2f3f2]"
          >
            Add Location
          </Button>
        </div>
      )}
    </div>
  );
}
