import classNames from "classnames";
import Image from "next/image";
import React, { ComponentProps, useCallback, useEffect } from "react";
import DropzoneContainer, { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Button } from "./Button";

type DropzoneProps = ComponentProps<typeof DropzoneContainer> & {
  label: string;
};

const BYTE = 1048576;
const MAX_SIZE = BYTE * 5; // 5MB in bytes

const customErrorMessages = {
  "file-too-large": `File size greater than ${MAX_SIZE / BYTE} MB.`,
  "file-invalid-type": "Incorrect file type",
};

export function Dropzone({ label, ...rest }: DropzoneProps) {
  const { register, setValue, watch } = useFormContext();

  const fileValue = watch("file");

  useEffect(() => {
    register("file");
  }, [register]);

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    inputRef,
    fileRejections,
    isDragActive,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxSize: MAX_SIZE,
    onDrop: (files) => setValue("file", files[0]),
    ...rest,
  });

  const removeFile = useCallback(() => {
    if (!inputRef.current) return;
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    inputRef.current.value = "";
    setValue("file", undefined);
  }, [acceptedFiles, inputRef, setValue]);

  useEffect(() => {
    if (!fileValue) removeFile();
  }, [fileValue, removeFile]);

  const currentError = fileRejections[0]?.errors[0];
  const errorMessage =
    customErrorMessages[
      currentError?.code as keyof typeof customErrorMessages
    ] ?? currentError?.message;

  return (
    <div>
      <label htmlFor="file" className="mb-2 font-bold text-lg block">
        {label}
      </label>
      <section
        className={classNames(
          "text-center w-full h-[160px] border-dashed border border-[#c1c1c1] flex flex-col items-center justify-center px-5 gap-4",
          {
            "border-warning": isDragReject,
          }
        )}
        {...getRootProps()}
      >
        <input id="file" name="file" {...getInputProps()} />
        {acceptedFiles.length > 0 ? (
          <>
            <Image
              src="/icons/check.svg"
              width="16"
              height="16"
              alt="Check icon"
            />
            <div>
              <strong>File accepted</strong>
              <p className="text-sm break-all">{acceptedFiles[0].name}</p>
            </div>
            <Button variant="link" onClick={removeFile}>
              Reset
            </Button>
          </>
        ) : (
          <>
            <Image
              src="/icons/upload.svg"
              width="45"
              height="45"
              alt="Upload icon"
            />
            {isDragReject ? (
              <p className="text-warning">File not accepted</p>
            ) : isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>
                Drag your file here or <strong>Browse</strong>
              </p>
            )}
            <span className="text-xs">
              PDF or Word Document (.doc, .docx), smaller than 5 MB
            </span>
          </>
        )}
      </section>
      {errorMessage && <p className="text-warning mt-2">{errorMessage}</p>}
    </div>
  );
}
