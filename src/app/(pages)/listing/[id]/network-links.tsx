"use client"
import ListingSection from "@/components/listing/section"
import { Listing, Social } from "@/types/listing"
import Link from "next/link";
import { MdPermMedia } from "react-icons/md"

export default function ListingNetWork({ listing }: { listing: Listing }) {

	function navigate(e, id) {
		e && e.preventDefault();
		const elementToView = document.getElementById(id)
		elementToView?.scrollIntoView();

	}
	return (

		<ListingSection title="Follow us on" icon={<MdPermMedia />}>
			<div>
				{listing.networks.map((network: Social, index: number) => (
					<div key={index}>
						<div className="flex justify-between" key={index}>
							<a href={`https://${network.type}`}>{network.type}</a>
							<a href={`https://${network.url}`}>{network.url}</a>
						</div>
						{listing.website_url != "" ?
							<div className="flex justify-between">
								<p className="font-semibold">Our Website</p>
								<a
									href={`https://google.com`}	
								>
									{listing.website_url}
								</a>
							</div> : null
						}
					</div>
				))}
			</div>
		</ListingSection>
	)
}
