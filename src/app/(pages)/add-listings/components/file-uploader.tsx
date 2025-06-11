import { Button } from "@/components/ui/button";
import { forEach } from "lodash";
import { ArrowUpFromLine } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FieldError, Merge, UseFormRegister } from "react-hook-form";
import { PiTrash } from "react-icons/pi";
import { toast } from "sonner";
import { useListingFormContext } from "./listing-form-context";

export interface CustomFile extends File {
	preview?: string;
}

interface FileUploaderProps {
	imageType: "logo" | "coverImage" | "galleryImages";
	maxFiles: number;
	title: string;
	files: CustomFile[];
	onUpload: (files: File[]) => void;
	onRemove: (index?: number) => void;
	isUploading: boolean;
	formError: FieldError | Merge<FieldError, (FieldError | undefined)[]> | undefined

}

export default function FileUploader({
	maxFiles,
	title,
	files,
	onUpload,
	onRemove,
	isUploading,
	formError,
	imageType
}: FileUploaderProps) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles?.length) {
				onUpload(acceptedFiles);
			}
		},
		[onUpload]
	);


	const { register, formState: { errors }, clearErrors } = useListingFormContext();
	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		onDrop,
		maxSize: 5242880,
		maxFiles: maxFiles,
		accept: {
			'image/webp': [],
			'image/png': [],
			'image/jpg': [],
			'image/jpeg': []
		}
	});


	useEffect(() => {
		if (fileRejections.length > 0) {
			const errorType = fileRejections[0].errors[0].code
			switch (errorType) {
				case "file-invalid-type": {
					toast.error('Invalid file type', {
						description: "Please upload a file with the correct format"
					})
					break;
				}
				case "file-too-large": {
					toast.error('File too large', {
						description: "Please upload a file under 5mb"
					})
					break;
				}
				default: {
					toast.error('Uh oh something went wrong', {
						description: "There was a problem with your upload, please try again."
					})
				}
			}

		}

	}, [fileRejections])


	return (
		<>
			<div {...getRootProps()} className="items-center w-full h-full">
				<input
					{...register(`images.${imageType}`)}
					{...getInputProps()} />
				<div className="overflow-y-auto transition-all h-auto">
					<div className="flex flex-wrap">
						{files.length > 0 ? (
							<div
								onClick={(e) => e.stopPropagation()}
								className="flex flex-wrap px-4 w-full"
							>
								{files.map((file, index) => (
									<div
										key={index}
										className="w-1/2 px-1 mb-2 relative inline-block"
									>
										<img
											src={file.preview}
											className="object-cover rounded-2xl aspect-square"
											alt="preview"
										/>
										<span
											onClick={() => onRemove(index)}
											className="absolute top-2 right-2 bg-black text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm cursor-pointer"
										>
											<PiTrash size={20} />
										</span>
									</div>
								))}
							</div>
						) : (
							<div
								className={`${formError ? "border-dashed border-2 border-red-500" : "border-dashed"} border-2 rounded-md h-full w-full m-3 ${isDragActive
									? "border-black min-h-48"
									: "border-photoDashedBorder min-h-48"
									}`}
							>
								<div className="items-center mt-3 flex flex-col justify-center pt-5">
									<ArrowUpFromLine className="text-gray-400" />
									<Button
										onClick={(e) => e.preventDefault()}
										variant="outline"
										size="sm"
										className="mt-4"
										disabled={isUploading}
									>
										{isUploading ? "Uploading..." : `Upload ${title}`}
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
