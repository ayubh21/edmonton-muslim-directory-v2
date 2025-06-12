"use client";

import { Latlng } from "@/types/listing";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import MapOverlay from "./map-overlay";
import { useOverLayStore } from "@/stores/overlayStore";

interface MapPinProps {
	position: Latlng;
	logo: string;
	coverImage?: string;
	id: number;
	address: string;
	title: string;
	phone_number: string | null;
}

export default function MapPin({
	position,
	logo,
	coverImage,
	id,
	title,
	address,
	phone_number,
}: MapPinProps) {

	// const overlay = useOverLayStore((state) => state.setCurrentId(10))
	// const currentId = useOverLayStore.getState().currentId

	// handleClick
	// console.log("hello")
	// //
	// const setCurrentId = useOverLayStore((state) => state.setCurrentId(id))
	// const currentId = useOverLayStore((state) => state.currentId)
	// //
	const { setCurrentId, currentId } = useOverLayStore()

	// useEffect(() => {
	// 	if (currentId == id) {
	// 		setCurrentDisplay(true)
	// 	} else {
	// 		setCurrentDisplay(false)
	// 	}
	//
	// 	// if (alreadyOpen) {
	// 	// 	setCurrentDisplay(false)
	// 	// }
	// }, [currentId])
	//
	function handleClick() {
		if (currentId == id) {
			setCurrentId(0)
		}
		else {
			setCurrentId(id)
		}
	}

	console.log(currentId)
	// remove if already selected
	return (
		<div className="relative">
			<AdvancedMarker
				position={position}>
				{/* TODO tweak next image so the some logo don't appear cut in half */}
				<img
					src={logo}
					onClick={handleClick}
					alt="business-logo"
					className={`rounded-full h-15 w-15 `}
				/>
				<MapOverlay
					phone_number={phone_number!}
					coverImage={coverImage!}
					id={id}
					title={title}
					isOverlayOpen={currentId == id}
					address={address}
				/>
			</AdvancedMarker>
		</div>
	);
}
