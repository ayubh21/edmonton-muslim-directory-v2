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
    console.log(data);
    return data.results[0].geometry.location as LatLng;
  }
}

export const geocode = new Geocode(
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
);
