import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Dropzone } from "../components/Dropzone";
import { Input } from "../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Dialog } from "../components/Dialog";
import axios from "axios";
import { parseHTMLWithStyles } from "../utils/parseHTMLWithStyles";

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

type IPipelineData = {
  jobTitle: string;
  description: string;
  companyCountry: string;
  companyCity: string;
  companyOrName: string;
};

type HomeProps = {
  pipelineData: IPipelineData;
};

const Home: NextPage<HomeProps> = ({ pipelineData }) => {
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

  const parsedDescription = parseHTMLWithStyles(pipelineData.description);

  return (
    <main className="bg-[#f5f2ef] w-full min-h-screen justify-center items-center flex py-5 px-4">
      <Head>
        <title>Workwolf</title>
      </Head>

      <section className="bg-white p-4 rounded max-w-[515px] w-full sm:p-8">
        <header className="flex flex-col items-center border-b border-black pb-6">
          <Image
            src="/workwolf.svg"
            width="40"
            height="40"
            alt="Workwolf logo (A wolf drawn in strokes)"
          />
          <h1 className="text-4xl font-bold mt-5 text-center">
            {pipelineData.jobTitle}
          </h1>
        </header>

        <div className="mb-12 text-center">
          <div className="flex flex-col my-16 items-center">
            <span className="text-xl mb-6 font-medium">
              This pipeline belongs to
            </span>
            <h2 className="font-bold text-2xl">{pipelineData.companyOrName}</h2>
            <span className="font-medium mt-1">{`${pipelineData.companyCity}, ${pipelineData.companyCountry}`}</span>
            <Dialog title="Job Description" content={parsedDescription}>
              <Button variant="link" className="mt-4 font-medium">
                View Job Description
              </Button>
            </Dialog>
          </div>

          <p className="font-medium">
            Please fill out the following form to join the Pipeline.
          </p>
        </div>

        <FormProvider {...methods}>
          <form className="px-0 sm:px-8" onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-center text-lg text-primary bg-white translate-y-[-50%] max-w-content m-auto px-1 sm:px-6">
              Already have an account?
            </p>
          </div>
          <Button variant="secondary" className="font-medium px-16">
            Sign In
          </Button>
        </footer>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios<IPipelineData>(
    "https://api.prod.workwolf.com/business/public/job-link/4KGQ5SRD"
  );

  const { data: countryData } = await axios(
    `https://restcountries.com/v3.1/alpha/${data.companyCountry}`
  );

  return {
    props: {
      pipelineData: {
        ...data,
        companyCountry: countryData[0].name.common,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default Home;
