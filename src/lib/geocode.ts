import { fromLatLng } from "react-geocode";

interface LatLng {
	lat: number;
	lng: number;
}

const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode";

export class Geocode {
	apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}
	// TODO restrict range in map form
	async getCoordinates(address: string) {
		const result = await fetch(
			`${GOOGLE_GEOCODE_API}/json?address=${address}&key=${this.apiKey}`
		);
		const data = await result.json();
		console.log(data)
		if (!data) {
			return
		}
		return data.results[0].geometry.location as LatLng;
	}
	async getAddress(coordinates: LatLng) {
		const result = await fetch(
			`${GOOGLE_GEOCODE_API}/json?latlng=${coordinates.lat}, ${coordinates.lng}&key=${this.apiKey}`
		);
		const data = await result.json();
		return data
	}

	async getFromPlaceId(placeId: string) {
		const result = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName&key=${this.apiKey}`)
		const data = await result.json();
		return data;
	}
}

export const geocode = new Geocode(
	process.env.NEXT_PUBLIC_GCLOUD_GEOCODE_API_KEY!
);
