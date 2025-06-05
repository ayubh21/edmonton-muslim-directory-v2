"use client"

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
	icon: string;
	title: string;
	count: number;
	color: string;
	iconColor: string;
}

export default function CategoryCard({
	icon,
	title,
	count,
	color,
	iconColor,
}: CategoryCardProps) {
	// Dynamically get the icon component
	const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

	const router = useRouter();
	return (
		<div onClick={() => router.push(`explore/?category=${title}`)}>
			<Link href={`/category/${title.toLowerCase()}`}>
				<div
					className={`${color} rounded-xl p-6 text-center transition-all hover:shadow-md`}
				>
					<div className="flex justify-center mb-3">
						{IconComponent && (
							<IconComponent className={`h-8 w-8 ${iconColor}`} />
						)}
					</div>
					<h3 className="font-semibold text-gray-900">{title}</h3>
					<p className="text-sm text-gray-500 mt-1">{count} listings</p>
				</div>
			</Link>
		</div>
	);
}
