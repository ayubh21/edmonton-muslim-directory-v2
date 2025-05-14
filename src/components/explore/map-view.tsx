"use client";

import { Latlng, Listing } from "@/types/listing";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MapPin from "./map-pin";

interface MapViewProps {
  positions: Latlng[];
  filteredListings: Listing[];
}

export default function MapView({ positions, filteredListings }: MapViewProps) {
  return (
    <div>
      <div className="h-screen">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <Map
            defaultZoom={11}
            streetViewControl={false}
            mapTypeControl={false}
            gestureHandling="greedy"
            disableDefaultUI={true}
            defaultCenter={{ lat: 53.5461, lng: -113.4937 }}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
          />
          {positions.map((position, index) => (
            <MapPin
              key={index}
              {...filteredListings[index]}
              address={filteredListings[index].addresses[0].address}
              position={position}
              logo={filteredListings[index].images.logo}
              coverImage={filteredListings[index].images.coverImage}
            />
          ))}
        </APIProvider>
      </div>
    </div>
  );
}
// TODO preview listing on map
