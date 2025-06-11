import React, { Dispatch, SetStateAction, useState } from "react";
import { MdRefresh } from "react-icons/md";

interface FilterSpinnerPrps {
	clearFilters: () => void;
	isSpinning: boolean;
	setIsSpinning: Dispatch<SetStateAction<boolean>>;
	label?: string;
}

export default function FilterSpinner({
	clearFilters,
	isSpinning,
	label,
	setIsSpinning,
}: FilterSpinnerPrps) {
	return (
		<>
			<span
				onClick={clearFilters}
				className={` cursor-pointer flex flex-row-reverse justify-center  items-center gap-4 text-gray-500 hover:text-black`}
			>
				{label}
				<MdRefresh className={`${isSpinning ? "animate-spin" : null}`} />
			</span>
		</>
	);
}
