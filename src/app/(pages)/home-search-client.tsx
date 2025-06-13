"use client"

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { filter } from 'lodash';
import { produce } from 'immer';

// Mock data - replace with your actual constants
const categoriesList = [
	"Restaurants",
	"Mosque",
	"Shopping",
	"Services",
	"Entertainment",
	"Health & Fitness",
	"Education",
	"Automotive",
	"Home & Garden",
	"Travel",
	"Health",
	"Grocery",
	"Professional"
];

interface SearchFilters {
	searchText: string;
	category: string;
}

interface HeroSearchProps {
	onSearch?: (filters: SearchFilters) => void;
	onFiltersChange?: (filters: SearchFilters) => void;
}

export default function HeroSearch({ onFiltersChange }: HeroSearchProps) {
	const router = useRouter()
	const [filters, setFilters] = useState<SearchFilters>({
		searchText: "",
		category: "",
	});

	// Notify parent component when filters change:w

	useEffect(() => {
		onFiltersChange?.(filters);
	}, [filters, onFiltersChange]);

	const handleSearchTextChange = (value: string) => {
		setFilters(prev => ({
			...prev,
			searchText: value
		}));
	};


	const handleSearch = () => {
		if (filters.category && filters.searchText) {
			router.push(`explore?category=${filters.category}&search_keywords=${filters.searchText}`)
		}
	};



	return (
		<div className="w-full max-w-6xl mx-auto">
			<Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
				<CardContent className="px-none">
					<div className="flex flex-col lg:flex-row lg:items-center gap-4">
						{/* Search Input */}
						<div className="flex-1 relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
							<input
								placeholder="What are you looking for?"
								value={filters.searchText}
								onChange={(e) => handleSearchTextChange(e.target.value)}
								className="pl-12 h-14 rounded-xl border-none shadow-none text-xl placeholder:text-gray-600 placeholder:text-lg focus:outline-none focus:ring-offset-0"
							/>
						</div>
						<div className="relative flex-1 lg:max-w-xs">
							<Select
								value={filters.category}
								onValueChange={(value) =>
									setFilters(
										produce((draft) => {
											draft.category = value;
										})
									)
								}
							>
								<div>
									<SelectTrigger className="w-full border-none shadow-none cursor-pointer [&_svg]:hidden">
										<SelectValue placeholder="All Categories" />
									</SelectTrigger>
								</div>
								<SelectContent side="bottom">
									<div>
										{categoriesList.map((_, index) => (
											<div key={index}>
												<SelectItem value={categoriesList[index]} key={index}>
													{categoriesList[index]}
												</SelectItem>
											</div>
										))}
									</div>
								</SelectContent>
							</Select>
						</div>

						<Button
							onClick={handleSearch}
							className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-14  text-lg font-semibold px-none"
						>
							<Search className="h-6 w-6 mr-2" />
							Search
						</Button>
					</div>
				</CardContent>
			</Card>
		</div >
	);
}
