
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"
import { useRouter } from "next/navigation"
import { Listing } from "@/types/listing"

interface CategoryCardProps {
	icon: string
	title: string
	count: number
	color: string
	iconColor: string
	listings: Listing[]
}

export default function CategoryCard({ icon, title, count, color, iconColor, listings }: CategoryCardProps) {
	// Dynamically get the icon component
	const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon
	const router = useRouter()

	const filterByCategoryCount = listings.filter(({ categories }) => {
		return (
			categories.filter((category) => {
				return category.category === title
			}).length > 0

		)
	})

	return (
		<div
			onClick={() => router.push(`explore?category=${title}`)}
			className="">
			<Link href={`explore?category=${title}`}>
				<div
					className={`${color} rounded-3xl p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group`}
				>
					<div className="flex justify-center mb-4">
						{IconComponent && (
							<div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
								<IconComponent className={`h-7 w-7 ${iconColor}`} />
							</div>
						)}
					</div>
					<h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
					<p className="text-sm text-gray-500 font-medium">{filterByCategoryCount.length} listings</p>
				</div>
			</Link>
		</div>
	)
}

