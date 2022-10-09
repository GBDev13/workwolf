import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Dropzone } from "../components/Dropzone";
import { Input } from "../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  firstName: z.string().min(3, {
    message: "First name must be at least 3 characters",
  }),
  lastName: z.string().min(3, {
    message: "Last name must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  file: z
    .object({
      path: z.string(),
    })
    .optional(),
});

export type PipelineFormData = z.infer<typeof formSchema>;

const Home: NextPage = () => {
  const methods = useForm<PipelineFormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  async function onSubmit(form: PipelineFormData) {
    console.log(form);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    reset();
    toast.success("Form submitted successfully");
  }

  return (
    <main className="bg-[#f5f2ef] w-full min-h-screen justify-center items-center flex py-5">
      <Head>
        <title>Workwolf</title>
      </Head>

      <section className="bg-white p-8 rounded max-w-[515px] w-full">
        <header className="flex flex-col items-center border-b border-black pb-6">
          <Image
            src="/workwolf.svg"
            width="50"
            height="50"
            alt="Workwolf logo (A wolf drawn in strokes)"
          />
          <h1 className="text-4xl font-bold mt-7">GraphStax</h1>
        </header>

        <div className="mb-12 text-center">
          <div className="flex flex-col my-16 items-center">
            <span className="text-xl mb-6 font-medium">
              This pipeline belongs to
            </span>
            <h2 className="font-bold text-2xl">Workwolf</h2>
            <span className="font-medium mt-1">Toronto, Canada</span>
            <Button variant="link" className="mt-4 font-medium">
              View Job Description
            </Button>
          </div>

          <p className="font-medium">
            Please fill out the following form to join the Pipeline.
          </p>
        </div>

        <FormProvider {...methods}>
          <form className="px-8" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="flex flex-col gap-9">
              <Input label="First Name" {...register("firstName")} />
              <Input label="Last Name" {...register("lastName")} />
              <Input label="Email" type="email" {...register("email")} />

              <Dropzone label="Upload Resume (Optional)" />

              <Button type="submit" loading={isSubmitting}>
                Submit
              </Button>
            </fieldset>
          </form>
        </FormProvider>

        <footer className="mt-16 flex flex-col items-center">
          <div className="w-full">
            <hr className="w-full border-primary" />
            <p className="text-center text-lg text-primary bg-white translate-y-[-50%] max-w-content m-auto px-6">
              Already have an account?
            </p>
          </div>
          <Button variant="secondary" className="font-medium">
            Sign In
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default Home;
