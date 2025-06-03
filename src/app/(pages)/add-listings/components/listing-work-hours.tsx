import { useEffect, useState } from "react";
import { produce } from "immer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { TimeDropDown } from "@/components/time-dropdown";
import { MdDelete } from "react-icons/md";

export interface WorkDayEntry {
	FROM: string;
	TO: string;
}

type WorkDays = {
	Fri: {
		hours: WorkDayEntry[];
		checkBoxType: string;
	};

	Tue: {
		hours: WorkDayEntry[];
		checkBoxType: string;
	};

	Wed: {
		hours: WorkDayEntry[];
		checkBoxType: string;
	};

	Thu: {
		hours: WorkDayEntry[];
		checkBoxType: string;
	};

	Mon: {
		hours: WorkDayEntry[];
		checkBoxType: string;
	};

	Sat: {
		hours: WorkDayEntry[];
		checkBoxType: string;
	};

	Sun: {
		hours: WorkDayEntry[];
		checkBoxType: string;
	};
};

export default function WorkHours() {
	const { setValue, register } = useFormContext();
	const [day, setDay] = useState<keyof WorkDays>("Mon");
	const [open, setOpen] = useState(false);
	const [workDays, setWorkDay] = useState<WorkDays>({
		Mon: {
			hours: [],
			checkBoxType: "Enter Hours",
		},
		Tue: {
			hours: [],
			checkBoxType: "Enter Hours",
		},
		Wed: {
			hours: [],
			checkBoxType: "Enter Hours",
		},

		Thu: {
			hours: [],
			checkBoxType: "Enter Hours",
		},
		Fri: {
			hours: [],
			checkBoxType: "Enter Hours",
		},
		Sat: {
			hours: [],
			checkBoxType: "Enter Hours",
		},
		Sun: {
			hours: [],
			checkBoxType: "Enter Hours",
		},
	});

	const handleInputChangeForDay = (
		e: React.ChangeEvent<HTMLSelectElement>,
		day: keyof WorkDays,
		index: number,
		field: "FROM" | "TO"
	) => {
		console.log("test");
		const { value } = e.target;
		setWorkDay(
			produce((draft) => {
				for (let i = 0; i < draft[day].hours.length; i++) {
					if (i == index) {
						if (field == "FROM") {
							draft[day].hours[i].FROM = value;
							console.log(day);
						} else {
							draft[day].hours[i].TO = value;
						}
					}
				}
			})
		);
	};

	const handleRemoveWorkDayHours = () => {

	}
	// I need the specific day, which means going thru a list
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		day: keyof WorkDays
	) => {
		e.preventDefault();

		setWorkDay(
			produce((draft) => {
				draft[day].hours.push({ FROM: "", TO: "" });
			})
		);
	};


	const handleRemove = (
		e: React.MouseEvent<HTMLButtonElement>,
		day: keyof WorkDays
	) => {
		e.preventDefault();

		setWorkDay(
			produce((draft) => {
				draft[day].hours = []
			})
		);
	};

	const handleCheckboxChange = (day: keyof WorkDays, val: string) => {
		setWorkDay(
			produce((draft) => {
				draft[day].checkBoxType = val;
				if (val === "Open all day") {
					draft[day].hours = [{ FROM: "12 AM", TO: "11:59 PM" }];
				} else if (val === "Closed all day") {
					draft[day].hours = []; // Ensure no hours are set for closed days
				} else if (val === "Appointment only") {
					draft[day].hours = []; // Clear hours for appointment-based work
				} else if (val == "Enter Hours") {
					draft[day].hours = []; // manually set hours
				}
			})
		);
	};

	const checkBoxTypes = [
		"Enter Hours",
		"Open all day",
		"Closed all day",
		"Appointment only",
	];

	useEffect(() => {
		setValue("workHours", workDays);
		console.log(workDays)
	}, [workDays, setValue]);

	return (
		<div className="h-full">
			<input type="hidden" {...register("workHours")} />
			<Tabs
				defaultValue={day}
				onValueChange={(tabName) => setDay(tabName as keyof WorkDays)}
			>
				<TabsList className="flex">
					{Object.entries(workDays).map((dayOfWeek, index) => (
						<TabsTrigger
							key={index}
							tabIndex={index}
							value={dayOfWeek[0]}
							className="   outline-none focus:border-b-violet shadow-none border-none "
						>
							{dayOfWeek[0]}
						</TabsTrigger>
					))}
				</TabsList>
				{Object.entries(workDays).map((dayOfWeek, index) => (
					<TabsContent key={index} tabIndex={index} value={dayOfWeek[0]}>
						<div className="  min-[500px]:grid min-[500px]:grid-cols-2  min-[1070px]:grid-cols-4  flex-col flex gap-2 pt-2 text-md lg:p-3 mb-4">
							{checkBoxTypes.map((type, index) => (
								<div key={index} className="  ">
									<Checkbox
										value={type}
										type="radio"
										key={index}
										label={type}
										onCheckBoxChange={() => handleCheckboxChange(day, type)}
										isSelected={type == workDays[day].checkBoxType}
										className="mr-2 w-5 h-5  border-2 border-gray-300 appearance-none rounded-2xl  checked:bg-emerald-600  peer-checked:block "
									/>
								</div>
							))}
						</div>
						{/* {dayOfWeek[1].checkBoxType == "Enter Hours" && ( */}
						<div className="">
							{dayOfWeek[1].hours.map((_, index) => (

								<div
									className=" mb-4"
									key={index}
								>
									{dayOfWeek[1].checkBoxType == "Enter Hours" && (
										<div className="flex justify-center items-center w-full gap-3 mb-4 ">
											<div className="flex flex-col w-full">
												<TimeDropDown
													onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
														handleInputChangeForDay(
															e,
															dayOfWeek[0] as keyof WorkDays,
															index,
															"FROM"
														)
													}
												/>
												<hr className="border-b border-b-gray-400 outline-none w-full" />
											</div>
											<div className="flex flex-col w-full">
												<TimeDropDown
													onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
														handleInputChangeForDay(
															e,
															dayOfWeek[0] as keyof WorkDays,
															index,
															"TO"
														)
													}
												/>
												<hr className="border-b border-b-gray-400 outline-none w-full" />
											</div>
											<button
												onClick={(e) => handleRemove(e, dayOfWeek[0] as keyof WorkDays)}
												className="  hover:bg-gray-200 hover:rounded-full p-1">
												<MdDelete
													size={20} className="cursor-pointer" />
											</button>
										</div>
									)}
								</div>

							))}
						</div>
						{workDays[day].checkBoxType == "Enter Hours" ? (
							<Button
								onClick={(e) => handleClick(e, dayOfWeek[0] as keyof WorkDays)}
								className="bg-faintGrey hover:bg-[#f2f3f2] text-black  text-center w-full h-full my-8 shadow-none font-normal p-4"
							>
								Add Hours
							</Button>
						) : null}
					</TabsContent>
					// TODO im too lazy to do this rn
				))}
			</Tabs>
		</div>
	);
}
