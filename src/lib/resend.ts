//
//
// export class Resend {
// 	apiKey: string;
//
// 	constructor(apiKey: string) {
// 		this.apiKey = apiKey
// 	}
//
// 	async SendListingConfirmation(email: string, name: string, url: string) {
//
// 		try {
// 			const { error } = await this.resend
// 			// 	from: "noreply@test.copyhub.cc",
// 			// 		to: [email],
// 			// 			subject: "Hello world",
// 			// 				react: SendPasswordResetEmail({
// 			// 					userFirstname: name,
// 			// 					resetPasswordLink: url,
// 			// 				}) as React.ReactElement,
// 			// });
//
// 			if (error) {
// 				console.log(error);
// 			}
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	}
// 	export const resend = new Resend(
// 		process.env.RESEND_API_KEY!
// 	);
