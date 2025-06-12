"use client";

import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useFormListing } from "@/app/(pages)/add-listings/components/listing-form-context";
import { useForm } from "react-hook-form";
import { SendContactEmail } from "@/app/actions/listing";
import { toast } from "sonner";

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
		console.log(values)
		await SendContactEmail(values.email, values.name, values.phone, values.subject, values.message)
		toast('email sent successfully')
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
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
						Email
					</label>
					<input
						{...register("email")}
						type="email"
						className="placeholder:text-sm py-3.5 focus:outline-none border-b focus:border-b-emerald-600"
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
				<div className="w-full flex flex-col pt-5">
					<label className="font-semibold text-sm" htmlFor="">
						Message
					</label>
					<Textarea
						{...register("message")}
						className=" focus:outline-amber-200  focus-visible:ring-0 border-t-0 border-l-0 border-r-0 shadow-none rounded-none" />
				</div>
				<Button
					type="submit"
					className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-2 rounded-md hover:bg-emerald-800"
				>
					Send Message
				</Button>
			</div>
		</form>
	);
}
