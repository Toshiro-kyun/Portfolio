import TechStack from "./tech stack/tech_stack";
import Hero from "./hero/hero";
import Navbar from "@/components/common/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col">
    <Navbar />
    <Hero/>

    <TechStack/>

    </main>
  );
}
