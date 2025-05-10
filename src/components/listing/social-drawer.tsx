import { GetNetworksByListingId } from "@/app/actions/listing";
import { ReactNode } from "react";

interface SocialProps {
  icon: ReactNode;
  type: string;
  url: string;
  id: number;
}
export default async function SocialNetworks({ id }: SocialProps) {
  const networks = await GetNetworksByListingId(id);
  return <div></div>;
}
