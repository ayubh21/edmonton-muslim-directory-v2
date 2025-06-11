"use client"

import { isEmailAvailable } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Suspense, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"


const forgotPasswordSchema = z.object({
	email: z.string().email()
})


type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>
export default function ForgotPassword() {

	const router = useRouter()
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit } = useForm<ForgotPasswordForm>({
		defaultValues: {
			email: ""
		}
	})


	const onSubmit = async (values: ForgotPasswordForm) => {

		setIsLoading(true);
		const doesEmailExist = await isEmailAvailable(values.email);
		if (!doesEmailExist) {
			setIsLoading(false);
			return;
		}

		const { data, error } = await authClient.forgetPassword({
			email: values.email,
			redirectTo: "/auth/reset-password"
		})

		if (error) {
			console.log("failed to send password reset link ")
		}
		setIsSuccessful(true)
		console.log(data)
	}

	return (
		<Suspense>
		<>
			<h2 className="text-2xl font-semibold text-emerald-700 p-6">
				<Link href="/"
					className="text-3xl"
				>
					Yeg Muslim <span className="text-black">Connect</span>
				</Link>
			</h2>
			<div className="mt-20 w-full flex justify-center items-center px-6">
				<div className=" w-[450px]">
					<div className="space-y-6">
						<span
							onClick={() => router.push('/auth/login')}
							className=" flex gap-4   items-center  flex-row cursor-pointer">
							<ChevronLeft />
							<p className="font-semibold text-2xl">Back</p>
						</span>
						{!isSuccessful && <div>
							<h2 className="text-gray-800 text-4xl  font-semibold text-left mx-auto mb-20">Reset your password</h2>

							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full flex  flex-col justify-center">
								<Card className=" w-full">
									<CardHeader>
										<CardDescription className="text-gray-700
						text-lg	">Enter the email associated with your account to reset your password</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="">
											<Input
												type="email"
												className="py-8 rounded-md placeholder:text-lg placeholder:text-gray-700 placeholder:font-semibold"

												placeholder="Email address"
												{...register("email")}
											/>
										</div>
									</CardContent>

								</Card>
								<div className="w-full flex justify-center ">
									<Button type="submit"
										className="w-full hover:bg-emerald-700 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700">
										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											</>
										) : (
											"Send Link"
										)}
									</Button>
								</div>
							</form>
						</div>}

					</div >

					{isSuccessful && <div>
						Password reset email has been successfully sent. Please Check your inbox or spam.
					</div>}
				</div >
			</div >

		</>

		</Suspense>
	)

}
