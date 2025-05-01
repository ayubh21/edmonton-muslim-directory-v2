import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import ReviewListing from "@/components/admin/review-listing";
import { GetListingById } from "@/app/actions/admin";
import { serializeMongooseDoc } from "@/lib/utils";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function ReviewListingPage({ params }: any) {
  const listing = await GetListingById(params.id);
  const serializedListing = serializeMongooseDoc(listing);
  return (
    <div>
      <ReviewListing listing={serializedListing} />
    </div>
  );
}
