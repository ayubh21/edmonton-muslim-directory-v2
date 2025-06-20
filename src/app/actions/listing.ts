"use server";

import { client } from "@/lib/s3/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/lib/db/db";
import {
	Listing,
	ListingAddress,
	ListingCategory,
	ListingNetwork,
	ListingTag,
	user,
} from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidateAll } from "./revalidate";
import { geocode } from "@/lib/geocode";
import { CustomFile } from "@/types/listing";
import { ListingForm } from "../(pages)/add-listings/components/listing-form-context";
import SendListingConfirmation from "../emails/listing-confirmation";
import { Resend } from "resend";
import SendListingApproved from "../emails/approved-listing";
import { SendListingContactEmail } from "../emails/contact";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function AddListing(business: ListingForm) {
	console.log("test")
	type NewListing = typeof Listing.$inferInsert;
	try {
		const session = await auth.api.getSession({ headers: await headers() });

		if (!session) {
			throw "session not found";
		}

		// TODO remove wrapper and insert into db directly
		const insertListing = async (listing: NewListing) => {
			return db.insert(Listing).values(listing).returning({
				insertedId: Listing.id,
			});
		};

		const slug = (title: string) => {
			return title.replaceAll(" ", "-")
		}

		let businessSlug = slug(business.title)
		const l = await db.query.Listing.findMany({
			where: (eq(Listing.slug, businessSlug))
		})
		console.log(l)
		if (l.length > 0) {
			businessSlug = businessSlug + `-${l.length}`
		}
		const newListing: NewListing = {
			title: business.title,
			tag_line: business.tagLine,
			description: business.description,
			images: {
				logo: business.images.logo,
				coverImage: business.images.coverImage,
				galleryImages: business.images.galleryImages,
			},
			email: business.contact.email,
			phone_number: business.contact.phoneNumber,
			website_url: business.contact.websiteUrl,
			userId: session.user.id,
			work_hours: business.workHours,
			status: "pending",
			views: 0,
			weekly_views: 0,
			monthly_views: 0,
			count_of_last_24: 0,
			count_of_last_seven_days: 0,
			count_of_last_30: 0,
			slug: businessSlug
		};

		const listing = await insertListing(newListing);

		for (let i = 0; i < business.addresses.length; i++) {
			const coordinates = await geocode.getCoordinates(business.addresses[i]);
			if (!coordinates) {
				return;
			}
			const res = await db.insert(ListingAddress).values({
				listingId: listing[0].insertedId,
				address: business.addresses[i],
				lat: coordinates.lat,
				lng: coordinates.lng,
			});

			if (!res) {
				console.log("failed to insert address");
			}
		}

		for (let i = 0; i < business.categories.length; i++) {
			const res = await db.insert(ListingCategory).values({
				listingId: listing[0].insertedId,
				category: business.categories[i],
			});

			if (!res) {
				console.log("failed to insert category");
			}
		}

		for (let i = 0; i < business.networks.length; i++) {
			const res = await db.insert(ListingNetwork).values({
				listingId: listing[0].insertedId,
				type: business.networks[i].type,
				url: business.networks[i].url,
			});

			if (!res) {
				console.log("failed to insert tag");
			}
		}

		for (let i = 0; i < business.tags.length; i++) {
			const res = await db.insert(ListingTag).values({
				listingId: listing[0].insertedId,
				tag: business.tags[i],
			});

			if (!res) {
				console.log("failed to insert tag");
			}
		}
	} catch (error) {
		console.error("Error creating listing:", error);
	}
}

export async function UpdateListingStatus(
	listingId: number,
	status: "approved" | "rejected"
) {
	const hasUpdated = await db
		.update(Listing)
		.set({
			status: status,
			updatedAt: new Date(),
		})
		.where(eq(Listing.id, listingId));

	if (!hasUpdated) {
		return { error: "failed to update the status of the listing" }
	}
	revalidateAll();
	return { success: "successfully updated the status of the listing " }
}

export async function UploadToS3(file: CustomFile) {
	const arrayBuffer = await file.arrayBuffer();
	try {
		const input = new PutObjectCommand({
			Bucket: "edmv2",
			Key: file.name,
			Body: Buffer.from(arrayBuffer),
			ACL: "public-read",
			ContentType: file.type,
		});

		const res = await client.send(input);
		console.log(res);
		return res;
	} catch (e) {
		console.log(e);
	}
}

export async function GetListings() {
	const listing = await db.query.Listing.findMany({
		with: {
			categories: true,
			networks: true,
			addresses: true,
			tags: true,
		},
	});
	if (!listing) {
		console.log("failed to get all listings");
	}
	return listing;
}

export async function GetApprovedListings() {
	const listing = await db.query.Listing.findMany({
		with: {
			categories: true,
			networks: true,
			addresses: true,
			tags: true,
		},
		where: eq(Listing.status, "approved"),
	});
	if (!listing) {
		console.log("failed to get all listings");
	}
	return listing;
}

export async function GetListingById(listingId: number) {
	const listing = await db.query.Listing.findFirst({
		with: {
			networks: true,
			addresses: true,
			tags: true,
			categories: true,
		},
		where: eq(Listing.id, listingId),
	});

	console.log(listing)
	return listing;
}


export async function GetListingBySlug(listingSlug: string) {
	const listing = await db.query.Listing.findFirst({
		with: {
			networks: true,
			addresses: true,
			tags: true,
			categories: true,
		},
		where: eq(Listing.slug, listingSlug),
	});

	console.log(listing)
	return listing;
}


export async function GetListingsByUserId(userId: string) {
	const listings = await db.query.Listing.findMany({
		with: {
			categories: true,
			networks: true,
			addresses: true,
			tags: true,
		},

		where: eq(Listing.userId, userId),
	});


	return listings;
}


export async function GetUserByListing(listingId: number) {
	const listing = await db.query.Listing.findFirst({
		where: eq(Listing.id, listingId),
	})
	if (!listing) {
		return
	}
	const userObj = await db.query.user.findFirst({
		where: eq(user.id, listing?.userId)
	})
	if (!userObj) {
		return
	}
	return userObj.name
}


export async function GetDailyViews(listingId: number) {
	const listing = await db.query.Listing.findFirst({
		where: eq(Listing.id, listingId),
	});
	if (!listing) {
		return;
	}
	return listing?.views
}


export async function updateDailyViews(listingId: number) {

	const listing = await db.query.Listing.findFirst({
		where: (Listing, { eq }) => (eq(Listing.id, listingId)),
	})

	if (!listing) return;

	if (listing.status == "approved") {
		await db.update(Listing).set({
			count_of_last_24: listing.views,
		})
		await db.update(Listing).set({
			views: 0
		}).where(eq(Listing.id, listingId))
	}

}

export async function updateWeeklyViews(listingId: number) {

	const listing = await db.query.Listing.findFirst({
		where: (eq(Listing.id, listingId))
	})

	if (!listing) {
		console.log("failed to get listing")
		return;
	}
	await db.update(Listing).set({
		count_of_last_seven_days: listing.weekly_views
	}).where(eq(Listing.id, listingId))

	await db.update(Listing).set({
		weekly_views: 0
	}).where(eq(Listing.id, listingId))

	return { message: "success" }
}


export async function updateMonthlViews(listingId: number) {

	const listing = await db.query.Listing.findFirst({
		where: (eq(Listing.id, listingId))
	})

	if (!listing) {
		console.log("failed to get listing")
		return;
	}
	await db.update(Listing).set({
		count_of_last_30: listing.monthly_views
	}).where(eq(Listing.id, listingId))
	await db.update(Listing).set({
		monthly_views: 0
	}).where(eq(Listing.id, listingId))

	return { message: "success" }
}

export async function GetWeeklyViews(listingId: number) {
	const listing = await db.query.Listing.findFirst({
		where: eq(Listing.id, listingId),
	});

	if (!listing) {
		return;
	}
	return listing?.views
}

export async function DeleteListing(listingId: number) {
	await db.delete(ListingAddress).where(eq(ListingAddress.listingId, listingId))
	await db.delete(ListingNetwork).where(eq(ListingNetwork.listingId, listingId))
	await db.delete(ListingTag).where(eq(ListingTag.listingId, listingId))
	await db.delete(ListingCategory).where(eq(ListingCategory.listingId, listingId))
	await db.delete(Listing).where(eq(Listing.id, listingId))
	revalidateAll();

}

export async function SendListingEmailConfirmation(email: string, name: string) {
	try {
		const { error } = await resend.emails.send({
			from: "noreply@yegmuslimconnect.ca",
			to: [email],
			subject: "Thank You for your Submission - We're Reviewing it",
			react: SendListingConfirmation({
				userFirstname: name,
			}) as React.ReactElement,
		});
		if (error) {
			console.log(error);
			return error
		}
	} catch (e) {
		console.log(e);
	}
}

export async function SendListingApprovedEmailConfirmation(email: string, name: string, title: string) {
	try {
		const { error } = await resend.emails.send({
			from: "noreply@yegmuslimconnect.ca",
			to: [email],
			subject: "Your Listing is Now Live on YEG Muslim Connect",
			react: SendListingApproved({
				userFirstname: name,
				listingTitle: title
			}) as React.ReactElement,
		});
		if (error) {
			console.log(error);
			return error
		}
	} catch (e) {
		console.log(e);
	}
}

export async function SendListingRejectedEmailConfirmation(email: string, name: string, title: string) {
	try {
		const { error } = await resend.emails.send({
			from: "noreply@yegmuslimconnect.ca",
			to: [email],
			subject: "Update on Your Listing Submission",
			react: SendListingApproved({
				userFirstname: name,
				listingTitle: title
			}) as React.ReactElement,
		});
		if (error) {
			console.log(error);
			return error
		}
	} catch (e) {
		console.log(e);
	}
}

export async function SendContactEmail(email: string, name: string, phone: string, subject: string, message: string) {
	try {
		const { error } = await resend.emails.send({
			from: "noreply@yegmuslimconnect.ca",
			to: ["ayubhussein625@gmail.com"],
			subject: "New Message via YEG Muslim Connect",
			react: SendListingContactEmail({
				email: email,
				phone: phone,
				subject: subject,
				userFirstName: name,
				message: message,
			}) as React.ReactElement,
		});
		if (error) {
			console.log(error);
			return error
		}
	} catch (e) {
		console.log(e);
	}
}

