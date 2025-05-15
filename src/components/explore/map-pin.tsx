"use client";

import { Latlng } from "@/types/listing";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import MapOverlay from "./map-overlay";

interface MapPinProps {
  position: Latlng;
  logo: string;
  coverImage?: string;
  id: number;
  address: string;
  title: string;
  phone_number: string | null;
}

export default function MapPin({
  position,
  logo,
  coverImage,
  id,
  title,
  address,
  phone_number,
}: MapPinProps) {
  const [showOverlay, setShowOverlay] = useState(0);
  function handleClick() {
    setShowOverlay(showOverlay - 1);
  }

  return (
    <div className="relative">
      <AdvancedMarker onClick={handleClick} position={position}>
        {/* TODO tweak next image so the some logo don't appear cut in half */}
        <img
          src={logo}
          alt="business-logo"
          className={`rounded-full h-11 w-11 `}
        />
        {showOverlay && (
          <MapOverlay
            isOverlayOpen={showOverlay}
            setIsOverlayOpen={setShowOverlay}
            phone_number={phone_number!}
            coverImage={coverImage!}
            id={id}
            title={title}
            address={address}
          />
        )}
      </AdvancedMarker>
    </div>
  );
}
