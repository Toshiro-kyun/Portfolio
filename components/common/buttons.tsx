import github_logo from "@/public/github_logo.png";
import linkedin_logo from "@/public/linkedin_logo.png";
import Image from "next/image";
import Link from "next/link";

export function GithubButton() {
    return (
        <Link className="w-fit flex flex-row items-center gap-2 text-xl font-bold border border-[#a1a1aa] border-opacity-50 border-2 p-1 px-3 rounded-lg" href={process.env.GITHUB_LINK || ""}>
            <Image src={github_logo} alt="github logo" width={18} height={18} className="bg-fit" /> <p> Github </p>
        </Link>
    )
}

export function LinkedinButton() {
    return (
        <Link className="w-fit flex flex-row items-center gap-2 text-xl font-bold border border-[#a1a1aa] border-opacity-50 border-2 p-1 px-3 rounded-lg"
            href={process.env.LINKEDIN_LINK || ""}>
            <Image src={linkedin_logo} alt="linkedin logo" width={18} height={18} className="bg-fit" /> <p> Linkedin </p>
        </Link>
    )
}

export function ResumeButton() {
    return (
        <Link href={process.env.RESUME_LINK || ""} className="text-center rounded-lg py-1 text-2xl font-bold text-black bg-white"> Resume </Link>
    )
}

export function HireButton() {
    return (
        <Link href={process.env.HIRE_LINK || ""} className="w-fit flex flex-row items-center gap-2 text-xl font-bold border border-[#a1a1aa] border-opacity-50 border-2 p-1 px-3 rounded-lg">
            Hire me!
        </Link>
    )
}