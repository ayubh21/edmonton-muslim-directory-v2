"use client";

import { ReactNode } from "react";

interface ListingSectionProps {
	icon?: ReactNode | null;
	title: string;
	children: ReactNode;
	iconColor?: string;
}

export default function ListingSection({
	icon,
	title,
	children,
}: ListingSectionProps) {
	return (
		<div className="bg-white p-4 shadow-sm mb-4">
			<div>
				<div className="flex gap-2">
					<div
						className={` rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}
					>
						<span className="font-bold text-gray-500">{icon}</span>
					</div>
					<span className="font-semibold text-lg">{title}</span>
				</div>
				{children}
			</div>
		</div>
	);
}
