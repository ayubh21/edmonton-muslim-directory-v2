"use client";

import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ContactBusinessForm {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export default function ContactBusiness({ title }: { title: string }) {
	//   if (!isDesktop) {
	//     return (
	//       <div>
	//         <Drawer>
	//           <DrawerTrigger className="absolute right-0 bottom-0">
	//             <ChevronDown />
	//           </DrawerTrigger>
	//           <DrawerContent>
	//             <DrawerHeader>
	//               <DrawerTitle className="text-center text-2xl">
	//                 Contact {title}
	//               </DrawerTitle>
	//               <div className="w-full flex flex-col  pt-5">
	//                 <label className="font-semibold text-sm" htmlFor="">
	//                   Email
	//                 </label>
	//                 <input
	//                   type="email"
	//                   placeholder="foo@bar.com"
	//                   className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
	//                   //   {...register("contact.email")}
	//                 />
	//               </div>
	//               <div className="w-full flex flex-col  pt-5">
	//                 <label className="font-semibold text-sm" htmlFor="">
	//                   Phone Number
	//                 </label>
	//                 <input
	//                   type="text"
	//                   placeholder="(780)-123-5678"
	//                   className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
	//                   //   {...register("contact.phoneNumber")}
	//                 />
	//               </div>
	//               <div className="w-full flex flex-col pt-5">
	//                 <label className="font-semibold text-sm" htmlFor="">
	//                   Website
	//                 </label>
	//                 <input
	//                   type="text"
	//                   placeholder="www.example.com"
	//                   className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
	//                   //   {...register("contact.websiteUrl")}
	//                 />
	//               </div>
	//             </DrawerHeader>
	//             <DrawerFooter>
	//               <Button>Submit</Button>
	//               <DrawerClose className="text-right"></DrawerClose>
	//             </DrawerFooter>
	//           </DrawerContent>
	//         </Drawer>
	//       </div>
	//     );
	//   }
	return (
		<div>
			<div className="w-full flex flex-col  pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					name
				</label>
				<input
					type="text"
					placeholder="(780)-123-5678"
					className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
				//   {...register("contact.phoneNumber")}
				/>
			</div>
			<div className="w-full flex flex-col  pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					Email
				</label>
				<input
					type="email"
					placeholder="foo@bar.com"
					className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
				//   {...register("contact.email")}
				/>
			</div>
			<div className="w-full flex flex-col  pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					Subject
				</label>
				<input
					type="text"
					placeholder=""
					className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
				//   {...register("contact.email")}
				/>
			</div>
			<div className="w-full flex flex-col pt-5">
				<label className="font-semibold text-sm" htmlFor="">
					Message
				</label>
				{/* TODO make sure bottom border when its focused is primary color */}
				{/* <Textarea className="border-t-0 border-r-0 border-l-0   focus-visible:ring-0 border-b focus:border-b-emerald-600 " /> */}
				<Textarea className=" focus:outline-amber-200  focus-visible:ring-0 border-t-0 border-l-0 border-r-0 shadow-none rounded-none" />
			</div>
			<Button
				type="submit"
				className="w-full mt-2  bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-800"
			>
				Send Message
			</Button>
		</div>
	);
}
