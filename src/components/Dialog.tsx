import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { ReactNode } from "react";

type DialogProps = {
  title: string;
  content: ReactNode;
  children: ReactNode;
};

export function Dialog({ title, content, children }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/20" />
        <DialogPrimitive.Content className="fixed w-[calc(100%-2rem)] max-w-[900px] rounded-t-lg overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col ">
          <DialogPrimitive.Title className="w-full bg-[#221f20] text-white p-4 text-2xl flex items-center">
            {title}

            <DialogPrimitive.Close className="w-12 h-12 absolute right-2">
              <Image
                src="/icons/close.svg"
                width="48"
                height="48"
                alt="Close icon"
              />
            </DialogPrimitive.Close>
          </DialogPrimitive.Title>
          <section className="py-6 mx-4 h-full">
            <div className="h-full max-h-[calc(70vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#dcc4a8] scrollbar-thumb-rounded-md">
              {content}
            </div>
          </section>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
