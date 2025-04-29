// import Link from "next/link";
// import Image from "next/image";
// import {
//   ChevronLeft,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   Clock,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// export default function ReviewListingPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   // This would normally fetch the business data based on the ID
//   const businessId = Number(params.id);

//   // Mock data for the business being reviewed
//   const business = {
//     id: businessId,
//     name: "Barakah Cafe",
//     category: "Restaurant",
//     submitter: "Ahmed S.",
//     submitterEmail: "ahmed.s@example.com",
//     date: "April 28, 2025",
//     status: "new",
//     description:
//       "Authentic Middle Eastern cuisine with a modern twist in the heart of downtown Edmonton. Our menu features traditional dishes like shawarma, falafel, and manakeesh, all prepared with halal ingredients. We also offer a wide selection of Arabic coffee, tea, and desserts in a cozy, welcoming atmosphere.",
//     address: "10143 118 St NW, Edmonton, AB T5K 1Y1",
//     phone: "(780) 555-1234",
//     email: "info@barakahcafe.ca",
//     website: "www.barakahcafe.ca",
//     hours: "Mon-Sat: 9am-9pm, Sun: 10am-8pm",
//     features: [
//       "Halal Certified",
//       "Family Friendly",
//       "Prayer Space",
//       "Takeout Available",
//       "Wheelchair Accessible",
//     ],
//     images: [
//       "/placeholder.svg?height=500&width=1000",
//       "/placeholder.svg?height=200&width=300",
//       "/placeholder.svg?height=200&width=300",
//       "/placeholder.svg?height=200&width=300",
//       "/placeholder.svg?height=200&width=300",
//     ],
//     logo: "/placeholder.svg?height=100&width=100",
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div className="flex items-center gap-2">
//           <Link
//             href="/admin/listings/pending"
//             className="text-emerald-600 hover:text-emerald-700"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </Link>
//           <h1 className="text-2xl font-bold tracking-tight">Review Listing</h1>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
//           >
//             <XCircle className="h-4 w-4" />
//             Reject
//           </Button>
//           <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
//             <CheckCircle className="h-4 w-4" />
//             Approve
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader className="pb-3">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-xl">{business.name}</CardTitle>
//                   <CardDescription>
//                     Submitted by {business.submitter} on {business.date}
//                   </CardDescription>
//                 </div>
//                 <Badge className="bg-blue-500">New Listing</Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="details">
//                 <TabsList className="mb-4">
//                   <TabsTrigger value="details">Details</TabsTrigger>
//                   <TabsTrigger value="images">Images</TabsTrigger>
//                   <TabsTrigger value="location">Location</TabsTrigger>
//                   <TabsTrigger value="features">Features</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="details" className="space-y-4">
//                   <div>
//                     <h3 className="font-medium mb-2">Business Description</h3>
//                     <div className="bg-gray-50 p-4 rounded-md text-sm">
//                       {business.description}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <h3 className="font-medium mb-2">Contact Information</h3>
//                       <div className="space-y-2">
//                         <div className="flex items-start">
//                           <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
//                           <span className="text-sm">{business.phone}</span>
//                         </div>
//                         <div className="flex items-start">
//                           <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
//                           <span className="text-sm">{business.email}</span>
//                         </div>
//                         <div className="flex items-start">
//                           <Globe className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
//                           <span className="text-sm">{business.website}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="font-medium mb-2">Business Hours</h3>
//                       <div className="flex items-start">
//                         <Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
//                         <span className="text-sm">{business.hours}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="images">
//                   <div className="space-y-4">
//                     <div>
//                       <h3 className="font-medium mb-2">Cover Image</h3>
//                       <div className="relative aspect-video rounded-lg overflow-hidden">
//                         <Image
//                           src={business.images[0] || "/placeholder.svg"}
//                           alt={`${business.name} cover image`}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="font-medium mb-2">Logo</h3>
//                       <div className="relative h-24 w-24 rounded-lg overflow-hidden">
//                         <Image
//                           src={business.logo || "/placeholder.svg"}
//                           alt={`${business.name} logo`}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="font-medium mb-2">Gallery Images</h3>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {business.images.slice(1).map((image, index) => (
//                           <div
//                             key={index}
//                             className="relative aspect-video rounded-lg overflow-hidden"
//                           >
//                             <Image
//                               src={image || "/placeholder.svg"}
//                               alt={`${business.name} gallery image ${
//                                 index + 1
//                               }`}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="location">
//                   <div className="space-y-4">
//                     <div>
//                       <h3 className="font-medium mb-2">Address</h3>
//                       <div className="flex items-start">
//                         <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
//                         <span className="text-sm">{business.address}</span>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="font-medium mb-2">Map Location</h3>
//                       <div className="relative h-[300px] bg-gray-100 rounded-lg">
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <p className="text-gray-500">
//                             Map preview would appear here
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="features">
//                   <div>
//                     <h3 className="font-medium mb-2">Business Features</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {business.features.map((feature, index) => (
//                         <Badge
//                           key={index}
//                           variant="outline"
//                           className="bg-gray-50"
//                         >
//                           {feature}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>

//           {/* <Alert
//             variant="warning"
//             className="bg-amber-50 text-amber-800 border-amber-200"
//           >
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Verification Required</AlertTitle>
//             <AlertDescription>
//               Please verify all business information before approving this
//               listing. Check for accuracy, appropriate content, and ensure it
//               meets our community guidelines.
//             </AlertDescription>
//           </Alert> */}
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Review Decision</CardTitle>
//               <CardDescription>
//                 Approve or reject this business listing
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <RadioGroup defaultValue="approve" className="space-y-4">
//                 <div className="flex items-start space-x-2">
//                   <RadioGroupItem
//                     value="approve"
//                     id="approve"
//                     className="mt-1"
//                   />
//                   <div className="grid gap-1.5">
//                     <Label htmlFor="approve" className="font-medium">
//                       Approve Listing
//                     </Label>
//                     <p className="text-sm text-gray-500">
//                       The listing will be published and visible to all users.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-2">
//                   <RadioGroupItem value="reject" id="reject" className="mt-1" />
//                   <div className="grid gap-1.5">
//                     <Label htmlFor="reject" className="font-medium">
//                       Reject Listing
//                     </Label>
//                     <p className="text-sm text-gray-500">
//                       The listing will be rejected and the submitter will be
//                       notified.
//                     </p>
//                   </div>
//                 </div>
//               </RadioGroup>

//               <Separator className="my-4" />

//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="feedback" className="font-medium">
//                     Feedback to Submitter
//                   </Label>
//                   <Textarea
//                     id="feedback"
//                     placeholder="Provide feedback about this listing..."
//                     className="mt-1.5 min-h-[100px]"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     This message will be sent to the submitter along with your
//                     decision.
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Switch id="notify" />
//                   <Label htmlFor="notify">Send email notification</Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Switch id="featured" />
//                   <Label htmlFor="featured">Mark as featured listing</Label>
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-col gap-2">
//                 <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
//                   <CheckCircle className="h-4 w-4 mr-2" />
//                   Approve Listing
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
//                 >
//                   <XCircle className="h-4 w-4 mr-2" />
//                   Reject Listing
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Submitter Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div>
//                   <p className="text-sm font-medium">Name</p>
//                   <p className="text-sm text-gray-500">{business.submitter}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">Email</p>
//                   <p className="text-sm text-gray-500">
//                     {business.submitterEmail}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">Submission Date</p>
//                   <p className="text-sm text-gray-500">{business.date}</p>
//                 </div>
//               </div>

//               <Separator className="my-4" />

//               <Button variant="outline" className="w-full">
//                 Contact Submitter
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
