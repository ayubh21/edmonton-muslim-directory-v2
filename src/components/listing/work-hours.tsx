"use client";
import { ListingWorkDays } from "@/types/listing";

interface WorkHoursProps {
	workDays: ListingWorkDays;
}

export default function WorkHours({ workDays }: WorkHoursProps) {
	const workHoursArr = Object.entries(workDays);

	console.log(workHoursArr);
	const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	// if (!isDesktop) {
	//   return (
	//     <div>
	//       <Drawer>
	//         <DrawerTrigger className="absolute right-0 bottom-0">
	//           <ChevronDown />
	//         </DrawerTrigger>
	//         <DrawerContent>
	//           <DrawerHeader>
	//             <DrawerTitle className="text-center text-2xl">
	//               Hours of Operation
	//               {/* <TooltipProvider>
	//                 <Tooltip>
	//                   <TooltipTrigger>Hover</TooltipTrigger>
	//                   <TooltipContent>
	//                     <p>Add to library</p>
	//                   </TooltipContent>
	//                 </Tooltip>
	//               </TooltipProvider> */}
	//             </DrawerTitle>
	//             <div className="">
	//               {orderedDays.map((day) => {
	//                 const workHours = workHoursArr.find((d) => d[0] === day);
	//                 if (!workHours) return null;
	//                 return (
	//                   <div key={day}>
	//                     <div>
	//                       <div className="">
	//                         {!workHours[1].hours.length && <p>Closed</p>}
	//                         {workHours[1].hours.length === 1 ? (
	//                           <li className="flex justify-between">
	//                             <p>{day}</p>
	//                             <div className="flex gap-2">
	//                               <p>{workHours[1].hours[0].FROM}</p>-
	//                               <p>{workHours[1].hours[0].TO}</p>
	//                             </div>
	//                           </li>
	//                         ) : null}
	//                       </div>
	//                     </div>
	//                   </div>
	//                 );
	//               })}
	//             </div>
	//           </DrawerHeader>
	//           <DrawerFooter>
	//             <DrawerClose className="text-right">
	//               <button className="p-3 bg-black text-white  font-semibold text-sm rounded-lg">
	//                 Cancel
	//               </button>
	//             </DrawerClose>
	//           </DrawerFooter>
	//         </DrawerContent>
	//       </Drawer>
	//     </div>
	//   );
	// }
	return (
		<div>
			<div className="">
				{orderedDays.map((day) => {
					const workHours = workHoursArr.find((d) => d[0] === day);
					if (!workHours) return null;
					return (
						<div className="" key={day}>
							<div className="mt-2">
								{workHours[1].hours.length === 1 ? (
									<div>
										<li className="flex justify-between">
											<p className="font-semibold">{day}</p>
											<div className="flex gap-2">
												<p>{workHours[1].hours[0].FROM}</p>-
												<p>{workHours[1].hours[0].TO}</p>
											</div>
										</li>
										<hr className="h-2" />
									</div>
								) : (
									<div>
										<div className="flex justify-between">
											<p className="font-semibold">{day}</p>
											<p>Closed</p>
										</div>
										<hr className="my-2" />
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
// }
