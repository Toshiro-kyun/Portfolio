import Link from "next/link";
import {GithubButton, HireButton, LinkedinButton, ResumeButton } from "@/components/common/buttons";

function Statement() {
  return (
    <>
      <h1 className="text-2xl font-bold text-[#a1a1aa]"> Hi, I am</h1>
      
      <div className="flex flex-col w-fit">
        <h1 className="text-5xl font-bold whitespace-nowrap"> 
            {process.env.NAME} 
        </h1>

        <h1 className="text-2xl font-bold text-[#a1a1aa] mb-3"> 
            {process.env.JOB_TITLE} 
        </h1>

        <ResumeButton />

        <div className="flex flex-row w-full justify-between gap-3 my-2">
          <HireButton />
          <GithubButton />
          <LinkedinButton />
        </div>
        <Link 
            className="w-fit flex flex-row items-center gap-2 text-small font-bold text-[#a1a1aa]"
            href={process.env.LINKEDIN_LINK || ""}>
          {`Get customised resume > `}
        </Link>
      </div>
    </>
  );
}

export default function Hero () {
    return (
        <div 
            className="flex-1 flex-grow h-fill items-center justify-start canvas-overlay-mode bg-linear-to-b from-black via-black to-blue-900">
            <div className="flex flex-col items-start justify-center w-1/2 pl-[10%] pb-5 min-h-screen">
                <Statement/>
            </div>
        </div>
    )
}