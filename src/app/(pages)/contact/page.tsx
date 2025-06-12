"use client";

import { useMediaQuery } from "@react-hook/media-query";
import { useFormListing } from "@/app/(pages)/add-listings/components/listing-form-context";
import { useForm } from "react-hook-form";
import { SendContactEmail } from "@/app/actions/listing";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

interface ContactBusinessForm {
	name: string;
	email: string;
	subject: string;
	message: string;
	phone: string;
}

export default function ContactBusiness() {
	const { register, handleSubmit } = useForm<ContactBusinessForm>({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: ""
		}
	})
	const onSubmit = async (values: ContactBusinessForm) => {
		await SendContactEmail(values.email, values.name, values.phone, values.subject, values.message)
		toast('email sent successfully')
	}
	return (
		<div className="h-screen bg-[#f4f4f4] ">
			<form onSubmit={handleSubmit(onSubmit)} className="p-6  max-w-[850px] mx-auto">
				<div className="p-6 bg-white shadow-sm">
					<div className="w-full">
						<h2 className="font-semibold text-center text-4xl ">Contact Us</h2>
					</div>
					<div className="w-full flex flex-col  pt-5">
						<label className="font-semibold text-sm" htmlFor="">
							name
						</label>
						<input
							{...register("name")}
							type="text"
							className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600 text-sm"
						/>
					</div>
					<div className="w-full flex flex-col  pt-5">
						<label className="font-semibold text-sm" htmlFor="">
							Subject
						</label>
						<input
							{...register("subject")}
							type="text"
							placeholder=""
							className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
						/>
					</div>
					<div className="w-full flex flex-col  pt-5">
						<label className="font-semibold text-sm" htmlFor="">
							Email
						</label>
						<input
							{...register("email")}
							type="text"
							placeholder=""
							className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
						/>
					</div>
					<div className="w-full flex flex-col pt-5">
						<label className="font-semibold text-sm" htmlFor="">
							Message
						</label>
						<textarea
							{...register("message")}
							className=" focus:outline-amber-200  focus:outline-none border-b focus:border-b-emerald-600" />
					</div>
					<Button
						type="submit"
						className="w-full hover:bg-emerald-700 py-10 bg-gradient-to-r from-emerald-600 to-emerald-700 cursor-pointer mt-5"
					>
						Send Message
					</Button>
				</div>
			</form>
			<div className="bottom-0 fixed w-full">
				<Footer />
			</div>
		</div>
	);
}
