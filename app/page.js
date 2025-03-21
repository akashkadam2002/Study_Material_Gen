"use client";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      {/* Header */}
      <div className="p-6 w-full flex justify-between items-center bg-white shadow-md">
        <Image src="/logo.webp" alt="logo" width={120} height={50} />
        {/* <Button onClick={() => router.push("/dashboard")}>Dashboard</Button> */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left my-10 space-y-6 md:space-y-0 md:space-x-10">
        {/* Left Image */}
        <div className="rotate-[-10deg]">
          <Image src="/know.jpg" alt="AI Study" width={100} height={100} className="rounded-lg shadow-lg" />
        </div>

        {/* Center Text */}
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold leading-snug">
            AI-powered <span className="text-blue-600">Exam Prep</span> Material Generator
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Your AI Exam Prep Companion: Effortless study material at your fingertips.
          </p>
        </div>

        {/* Right Image */}
        <div className="rotate-[10deg]">
          <Image src="/code.png" alt="Coding" width={100} height={100} className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Button */}
      <div className="mt-8">
        <Button className="px-6 py-3 text-lg flex items-center space-x-2 hover:bg-blue-700 transition"
          onClick={() => router.push("/dashboard")}>
          Get Started <ArrowRightIcon className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
