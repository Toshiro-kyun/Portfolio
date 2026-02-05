import { GithubButton, HireButton } from "@/components/common/buttons";

export default function Navbar () {
    return (
        <nav className="flex flex-col items-center justify-between fixed top-0 w-full">
            <div className="flex flex-row items-center justify-between w-full p-3 pb-5 px-10">
                <div>
                    <h1 className="text-2xl font-bold"> {process.env.NAME} </h1>
                </div>

                <div className="flex flex-row gap-3">
                    <GithubButton/>
                    <HireButton/>
                </div>
            </div>
        </nav>
    )
}