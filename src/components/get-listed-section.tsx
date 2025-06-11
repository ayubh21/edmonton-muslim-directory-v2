import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight, Store, Users, Star, TrendingUp, Sparkles, Shield, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Benefit {
	icon: React.ReactNode
	title: string
	description: string
	color: string
}

export default function GetListedSection() {
	const benefits: Benefit[] = [
		{
			icon: <Users className="h-6 w-6" />,
			title: "Reach Hundreds Of Customers",
			description: "Connect with Edmonton's Muslim community actively searching for your services.",
			color: "bg-blue-500",
		},
		{
			icon: <Shield className="h-6 w-6" />,
			title: "Verified Badge",
			description: "Build trust with our verification system",
			color: "bg-emerald-500",
		},
		{
			icon: <BarChart3 className="h-6 w-6" />,
			title: "Business Analytics",
			description: "Track views and clicks to measure customer engagement",
			color: "bg-purple-500",
		},
		{
			icon: <Sparkles className="h-6 w-6" />,
			title: "Premium Features",
			description: "Access to photo galleries, reviews, and priority placement options coming soon.",
			color: "bg-amber-500",
		},
	]

	const features = [
		"Instant online visibility",
		"Increased customer outreach",
		"Supporting local muslim business",
		"business analytics",
	]

	return (
		<section className="py-20 relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute top-20 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-60 blur-3xl"></div>
			<div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-100 rounded-full opacity-60 blur-3xl"></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100/20 to-blue-100/20 rounded-full opacity-50 blur-3xl"></div>

			<div className="container px-4 md:px-6 relative z-10">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
						Get Your Business{" "}
						<span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
							Listed for Free
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Join Edmonton's fastest-growing directory of Muslim-owned businesses. Reach hundreds of customers and grow
						your business with zero upfront costs.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
					{/* Left side - Content */}
					<div className="space-y-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{benefits.map((benefit, index) => (
								<Card
									key={index}
									className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1"
								>
									<CardContent className="p-6">
										<div
											className={`w-12 h-12 ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
										>
											{benefit.icon}
										</div>
										<h3 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h3>
										<p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
									</CardContent>
								</Card>
							))}
						</div>

						<Card className="bg-white border-0 shadow-lg">
							<CardContent className="p-8">
								<h3 className="font-bold text-xl mb-6 text-gray-900">What's Included:</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{features.map((feature, index) => (
										<div key={index} className="flex items-center space-x-3">
											<div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
												<Check className="h-3.5 w-3.5 text-emerald-600" />
											</div>
											<span className="text-gray-700 font-medium">{feature}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button
								asChild
								size="lg"
								className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
							>
								<Link href="/add-listings">
									<Store className="mr-2 h-5 w-5" />
									Add Your Business For Free
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
						</div>
					</div>

					{/* Right side - Visual */}
					<div className="relative">
						{/* Main business card mockup */}
						<Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
							<div className="relative h-48">
								<Image
									alt="mosque"
									src="/al-faruq.webp"
									fill
									className="object-cover opacity-80"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
								<div className="absolute bottom-4 left-4 right-4">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-white font-bold text-xl">Al Faruq Islamic Center</h3>
										</div>
									</div>
								</div>
							</div>
							<CardContent className="p-6">
								<div className="flex items-center justify-between mb-4">
									<Badge variant="outline" className="text-emerald-600 border-emerald-200">
										Mosque
									</Badge>
									<span className="text-gray-500 text-sm"> 4410 127 St SW, Edmonton, AB T6W1A2</span>
								</div>
								<p className="text-gray-600 text-sm leading-relaxed">
									Community center located in southside edmonton that serves as a religious center for Muslims.
								</p>
								<div className="flex items-center justify-between mt-4 pt-4 border-t">
									<div className="flex items-center space-x-4 text-sm text-gray-500">
										<span>📍 2.1km away</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Floating stats cards */}
						<Card className="absolute -top-4 -left-4 bg-white border-0 shadow-lg rounded-2xl p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
							<div className="text-center">
								<div className="text-2xl font-bold text-emerald-600">100+</div>
								<div className="text-xs text-gray-500">Monthly Views</div>
							</div>
						</Card>

						<Card className="absolute bottom-0 -right-0 bg-white border-0 shadow-lg rounded-2xl p-3 transform rotate-12 hover:rotate-0 transition-transform duration-300">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
									<TrendingUp className="h-4 w-4 text-white" />
								</div>
								<div>
									<div className="text-sm font-bold text-gray-900">+47%</div>
									<div className="text-xs text-gray-500">Growth</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
				{/* Bottom CTA section */}
			</div>
		</section>
	)
}

