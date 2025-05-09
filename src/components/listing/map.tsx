"use client";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

interface GoogleMapProps {
  lat: number;
  lng: number;
}

const GoogleMapComponent = ({ lat, lng }: GoogleMapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      //   mapTypeId={process.env.NEXT_PUBLIC_MAP_ID}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
      }}
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={{ lat: lat, lng: lng }}
    >
      <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
