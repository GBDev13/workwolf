import classNames from "classnames";
import Image from "next/image";
import React, { ComponentProps } from "react";
import DropzoneContainer from "react-dropzone";
import { Button } from "./Button";

type DropzoneProps = ComponentProps<typeof DropzoneContainer> & {
  label: string;
};

export function Dropzone({ label }: DropzoneProps) {
  return (
    <DropzoneContainer
      accept={{
        "application/pdf": [".pdf"],
        "application/msword": [".docx"],
      }}
    >
      {({
        getRootProps,
        getInputProps,
        isDragReject,
        acceptedFiles,
        inputRef,
      }) => {
        const removeFile = () => {
          if (!inputRef.current) return;
          acceptedFiles.length = 0;
          acceptedFiles.splice(0, acceptedFiles.length);
          inputRef.current.value = "";
        };

        return (
          <div>
            <label htmlFor="dropzone" className="mb-2 font-bold text-lg block">
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
              <input id="dropzone" {...getInputProps()} />
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
                    <p className="text-sm">{acceptedFiles[0].name}</p>
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
          </div>
        );
      }}
    </DropzoneContainer>
  );
}
