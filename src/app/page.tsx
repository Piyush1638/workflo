import GreetingsForms from "@/components/GreetingsForms";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen  bg-[#f7f7f7]">
      <Sidebar/>
      <section className="p-4 overflow-y-auto ml-64" >
        <GreetingsForms/>
        <GreetingsForms/>
        <GreetingsForms/>
        <GreetingsForms/>
        <GreetingsForms/>
        <GreetingsForms/>
        <GreetingsForms/>


      </section>
    </main>
  );
}
