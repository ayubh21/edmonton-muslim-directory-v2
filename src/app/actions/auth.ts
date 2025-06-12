"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { User } from "@/types/user";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import SendPasswordResetEmail from "../emails/reset-password";
import SendAccountCreation from "../emails/account-creation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SignUp(user: User) {
	const res = await auth.api.signUpEmail({
		body: {
			email: user.email,
			password: user.password,
			name: `${user.firstname} ${user.lastname}`,
			is_admin: false,
		},
	});

	return res;
}

export async function isEmailAvailable(email: string) {
	const emailResult = await db.query.user.findFirst({
		where: eq(user.email, email),
	});
	if (emailResult) {
		return true;
	}
	return false;
}

export async function SendEmail(email: string, name: string, url: string) {
	try {
		const { error } = await resend.emails.send({
			from: "noreply@yegmuslimconnect.ca",
			to: [email],
			subject: "Here’s the Link to Reset Your Password",
			react: SendPasswordResetEmail({
				userFirstname: name,
				resetPasswordLink: url,
			}) as React.ReactElement,
		});

		if (error) {
			console.log(error);
		}
	} catch (e) {
		console.log(e);
	}
}

export async function SendAccountCreatedEmail(email: string, name: string)  {

	try {
		const { error } = await resend.emails.send({
			from: "noreply@yegmuslimconnect.ca",
			to: [email],
			subject: "Your Account Has Been Created!",
			react: SendAccountCreation({
				userFirstname: name,
				loginUrl: `https://yegmuslimconnect.ca`
			}) as React.ReactElement,
		});

		if (error) {
			console.log(error);
		}
	} catch (e) {
		console.log(e);
	}
}