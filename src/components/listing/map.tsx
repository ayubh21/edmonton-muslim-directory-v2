"use client";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

interface GoogleMapProps {
  lat: number;
  lng: number;
}

export default function GoogleMap({ lat, lng }: GoogleMapProps) {
  return (
    <div className="h-60">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={{ lat, lng }}
          defaultZoom={10}
          streetViewControl={false}
          mapTypeControl={false}
          center={{ lat, lng }}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          zoomControl={false}
        >
          <AdvancedMarker position={{ lat, lng }}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}
