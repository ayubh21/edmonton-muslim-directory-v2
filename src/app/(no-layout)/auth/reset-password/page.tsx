import ForgotPasswordWrapper from "@/components/reset-password-wrapper";
import { Suspense } from "react";

export default function ResetPassword() {
	return (
		<Suspense>
			<ForgotPasswordWrapper/>
		</Suspense>
	)
}