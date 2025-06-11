import { ReactNode } from "react";
import GoogleMapComponent from "./map";

interface ListingSectionProps {
  children: ReactNode;
  icon: ReactNode | null;
  title: string;
  iconColor?: string;
  //   lat: number;
  //   lng: number;
}

export default function MapSection({
  icon,
  title,
  children,
  iconColor = "bg-emerald-600",
}: ListingSectionProps) {
  return (
    <div className="bg-white p-4 shadow-sm mb-4">
      <div>
        <div className="flex gap-2">
          <div
            className={` rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}
          >
            <span className="font-bold text-emerald-600">{icon}</span>
          </div>
          <span className="font-semibold">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
