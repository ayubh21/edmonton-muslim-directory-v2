import { Listing } from '@/types/listing'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import Pagination from 'rc-pagination'
import RcPagination, {
	PaginationProps as RcPaginationProps,
} from "rc-pagination";
import { useState } from 'react'
import ListingList from '../explore/listing-list'
import BusinessCard from '../business-card'
import BottomPaginator from './custom-paginator';

interface PaginatorProps {
	listings: Listing[];
}


const paginationStyles = {
	base: {
		item: "[&>.rc-pagination-item>a]:!no-underline [&>.rc-pagination-item>a]:font-medium [&>li.rc-pagination-item]:border-muted [&>.rc-pagination-item:not(.rc-pagination-item-active)]:bg-transparent",
		icon: "[&>.rc-pagination-prev]:align-baseline [&>.rc-pagination-next]:align-baseline",
		outline:
			"[&>.rc-pagination-item]:leading-7 [&>.rc-pagination-item]:border-0",
		jumperDiv:
			"[&>.rc-pagination-options>.rc-pagination-options-quick-jumper]:text-sm [&>.rc-pagination-options>.rc-pagination-options-quick-jumper]:text-gray-500",
		jumperInput:
			"[&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:!py-[3px] [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:text-sm [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:border-muted [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:ring-0",
	},
	rounded: {
		none: "[&>.rc-pagination-item]:rounded-none [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-none",
		sm: "[&>.rc-pagination-item]:rounded-sm [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-sm",
		md: "[&>.rc-pagination-item]:rounded-md [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-md",
		lg: "[&>.rc-pagination-item]:rounded-lg [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-lg",
		full: "[&>.rc-pagination-item]:rounded-full [&>.rc-pagination-options>.rc-pagination-options-quick-jumper>input]:rounded-full",
	},
	variant: {
		solid: {
			base: "",
			color: {
				primary:
					"[&>.rc-pagination-item-active]:bg-primary [&>.rc-pagination-item-active>a]:!text-primary-foreground [&>li.rc-pagination-item-active]:border-primary [&>.rc-pagination-item-active]:hover:border-primary [&>.rc-pagination-item-active]:focus:border-primary",
				secondary:
					"[&>.rc-pagination-item-active]:bg-secondary [&>.rc-pagination-item-active>a]:!text-secondary-foreground [&>li.rc-pagination-item-active]:border-secondary [&>.rc-pagination-item-active]:hover:border-secondary [&>.rc-pagination-item-active]:focus:border-secondary",
				danger:
					"[&>.rc-pagination-item-active]:bg-red [&>.rc-pagination-item-active>a]:!text-white [&>li.rc-pagination-item-active]:border-red [&>.rc-pagination-item-active]:hover:border-red [&>.rc-pagination-item-active]:focus:border-red",
			},
		},
		flat: {
			base: "",
			color: {
				primary:
					"[&>.rc-pagination-item-active]:bg-primary-lighter [&>li.rc-pagination-item-active]:border-primary-lighter [&>.rc-pagination-item-active>a]:text-primary-dark [&>.rc-pagination-item-active>a]:hover:text-primary-dark [&>.rc-pagination-item-active>a]:focus:text-primary-dark [&>.rc-pagination-item-active]:hover:border-primary-lighter [&>.rc-pagination-item-active]:focus:border-primary-lighter",
				secondary:
					"[&>.rc-pagination-item-active]:bg-secondary-lighter [&>li.rc-pagination-item-active]:border-secondary-lighter [&>.rc-pagination-item-active>a]:text-secondary-dark [&>.rc-pagination-item-active>a]:hover:text-secondary-dark [&>.rc-pagination-item-active>a]:focus:text-secondary-dark [&>.rc-pagination-item-active]:hover:border-secondary-lighter [&>.rc-pagination-item-active]:focus:border-secondary-lighter",
				danger:
					"[&>.rc-pagination-item-active]:bg-red-lighter [&>li.rc-pagination-item-active]:border-red-lighter [&>.rc-pagination-item-active>a]:text-red-dark [&>.rc-pagination-item-active>a]:hover:text-red-dark [&>.rc-pagination-item-active>a]:focus:text-red-dark [&>.rc-pagination-item-active]:hover:border-red-lighter [&>.rc-pagination-item-active]:focus:border-red-lighter",
			},
		},
	},
};
export interface PaginationProps extends RcPaginationProps {
	outline?: boolean;
	rounded?: keyof typeof paginationStyles.rounded
	variant?: keyof typeof paginationStyles.variant;
	color?: keyof typeof paginationStyles.variant.flat.color;
	prevIconClassName?: string;
	nextIconClassName?: string;
	jumpPrevIconClassName?: string;
	jumpNextIconClassName?: string;
}
export default function Paginator({ listings }: PaginatorProps) {

	const [perPage, setPerPage] = useState(10);
	const [size, setSize] = useState(perPage);
	const [current, setCurrent] = useState(1)
	const PerPageChange = (value: number) => {
		setSize(value);
		const newPerPage = Math.ceil(listings.length / value);
		if (current > newPerPage) {
			setCurrent(newPerPage);
		}
	}


	const PaginationChange = (page: number, pageSize: number) => {
		setCurrent(page)
		setSize(pageSize)
	}


	const getPaginatedListings = (current: number, pageSize: number) => {
		return listings.slice((current - 1) * pageSize, current * pageSize)
	}


	const PrevNextArrow = (current: number, type: string, originalElement: React.ReactNode) => {
		if (type === 'prev') {
			return <ChevronLeft className='cursor-pointer' />
		}
		if (type === 'next') {
			return <ChevronRight className='cursor-pointer' />
		}
		return originalElement;
	}
	return (
		<div className='relative'>
			<div>

				<Pagination
					showTotal={(total, range) => `Showing ${range[1]} results out of ${total}`}
					total={listings.length}
					className='[&_.rc-pagination-item]:hidden  [&_.rc-pagination-next]:absolute  [&_.rc-pagination-next]:right-0  [&_.rc-pagination-next]:top-6 mb-4 [&_.rc-pagination-total-text]:font-semibold'
					showLessItems={true}
					jumpNextIcon={<ChevronRight />}
					jumpPrevIcon={<ChevronLeft />}
					pageSize={size}
					showSizeChanger={true}

					// defaultPageSize={5}
					onChange={PaginationChange}
					onShowSizeChange={PerPageChange}
					itemRender={PrevNextArrow}
				/>
			</div>
			<div className='grid  min-[784px]:grid-cols-2 gap-4   min-[1200px]:grid-cols-1'>
				{getPaginatedListings(current, size).map((listing, index) => {
					return (
						<div key={index} className=''>
							<BusinessCard
								id={listing.id}
								logo={listing.images.logo}
								coverImage={listing.images.coverImage}
								title={listing.title}
								address={listing.addresses[0].address}
								category={listing.categories[0].category} // will only render a single category render multiple in the future
								tagLine={listing.tag_line!}
								phoneNumber={listing.phone_number!}
							/>
						</div>
					)
				})
				}
			</div>
			<Pagination />
		</div>

	)
}


