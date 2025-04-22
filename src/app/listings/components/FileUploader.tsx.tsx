import { Button } from "@/components/ui/button";
import { produce } from "immer";
import { ArrowUpFromLine } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PiImageLight, PiTrash } from "react-icons/pi";

interface FileUploaderProps {
  maxFiles: number;
  title: string;
}

interface CustomFile extends File {
  preview: string;
}

export default function FileUploader({ maxFiles, title }: FileUploaderProps) {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles(
        produce((draft) => {
          acceptedFiles.map((file) => {
            Object.assign(file, { preview: URL.createObjectURL(file) });
            draft.push(file as CustomFile);
          });
        })
      );
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5242880,
    maxFiles: maxFiles,
  });

  const handleRemovePhoto = (index: number) => {
    setFiles(
      produce((draft) => {
        for (let i = 0; i < files.length; i++) {
          if (index == i) {
            draft.splice(i, 1);
          }
        }
      })
    );
  };

  // notification toast if they try to upload an image over 5mb
  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <div {...getRootProps()} className="items-center w-full h-full">
        <input {...getInputProps()} />
        <div
          className={`overflow-y-auto transition-all ${
            files.length > 5 ? "max-h-[90vh]" : "h-auto"
          }`}
        >
          <div className="flex flex-wrap ">
            {files.length > 0 ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className=" flex flex-wrap  px-4"
              >
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="w-1/2 px-1 mb-2 relative inline-block"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      className="object-cover rounded-2xl aspect-square  "
                      alt="preview"
                    />
                    <span
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 bg-black text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm cursor-pointer"
                    >
                      <PiTrash size={20} />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`  border-dashed border-2 rounded-md h-full w-full m-3  ${
                  isDragActive
                    ? "border-black min-h-48"
                    : "border-photoDashedBorder min-h-48 "
                }`}
              >
                <div className="items-center mt-3 flex flex-col justify-center pt-5">
                  <ArrowUpFromLine className="text-gray-400" />
                  <Button
                    onClick={(e) => e.preventDefault()}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                  >
                    Upload {title}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <ul className="flex flex-wrap gap-2 justify-center"></ul>
        </div>
      </div>
    </>
  );
}
