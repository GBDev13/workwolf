import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button } from "../components/Button";
import { Dropzone } from "../components/Dropzone";
import { Input } from "../components/Input";

const Home: NextPage = () => {
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
            <span className="text-xl mb-8 font-medium">
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

        <form className="px-8">
          <fieldset className="flex flex-col gap-9">
            <Input label="First Name" name="firstName" />
            <Input label="Last Name" name="lastName" />
            <Input label="Email" type="email" name="email" />

            <Dropzone label="Upload Resume (Optional)" />

            <Button type="submit">Submit</Button>
          </fieldset>
        </form>

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
