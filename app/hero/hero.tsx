import Link from "next/link";
import { GithubButton, HireButton, LinkedinButton, ResumeButton } from "@/components/common/buttons";

function Statement () {
    return (
        <>
        <h1 className="text-xl font-bold text-[#a1a1aa]"> Hi, I am</h1>
        <h1 className="text-3xl font-bold"> {process.env.NAME} </h1>
        <h1 className="text-xl font-bold text-[#a1a1aa]"> {process.env.JOB_TITLE} </h1>

        <div className="flex flex-col gap-3 mt-3">
            <ResumeButton/>
            
            <div className="flex flex-row gap-3">
                <HireButton/>

                <GithubButton/>
                <LinkedinButton/>

                
                {/* <Link className="w-fit flex flex-row items-center gap-2 text-xl font-bold border border-[#a1a1aa] border-opacity-50 border-2 p-1 px-3 rounded-lg" href={process.env.LINKEDIN_LINK || ""}>
                <Image src={linkedin_logo} alt="linkedin logo" width={18} height={18} className="bg-fit" /> <p> Linkedin </p>
                </Link> */}

            </div>
            <Link className="w-fit flex flex-row items-center gap-2 text-small font-bold text-[#a1a1aa]" href={process.env.LINKEDIN_LINK || ""}>
                {`Get customised resume > `}
            </Link>
            </div>
        </>
    )
}

export default function Hero () {
    return (
        <div className="flex flex-grow h-fill items-center justify-start canvas-overlay-mode">
            <div className="flex flex-col items-start justify-center w-1/2 pl-[10%] pb-5">
                <Statement/>
            </div>
        </div>
    )
}