import Hero from "./hero/hero";
import Navbar from "@/components/common/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col bg-linear-to-b from-black via-black to-blue-900">
    <Navbar />
    <Hero/>

    </main>
  );
}
