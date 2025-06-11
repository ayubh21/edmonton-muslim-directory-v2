import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import { optional } from "zod";

interface FormSectionProps {
	icon: ReactNode;
	title: string;
	description: string;
	children: ReactNode;
	iconColor?: string;
	optional?: string;
}

export default function FormSection({
	icon,
	title,
	description,
	children,
	optional,
	iconColor = "bg-emerald-600",
}: FormSectionProps) {
	return (
		<div className="p-4 bg-white shadow-sm max-h-">
			<div className="flex items-start gap-4 mb-6">
				<div
					className={`h-8 w-8 rounded-full ${iconColor} flex items-center justify-center flex-shrink-0`}
				>
					<span className="text-white font-bold">{icon}</span>
				</div>
				<div>
					<h3 className="text-lg font-semibold">{title} <span className="text-gray-500 text-sm">{optional}</span></h3>
					<p className="text-gray-500 text-sm">{description}</p>
				</div>
			</div>
			<div className="pl-8">{children}</div>
		</div>
	);
}
