import Finished from "@/components/Finished";
import GreetingsForms from "@/components/GreetingsForms";
import InProgress from "@/components/InProgress";
import Sidebar from "@/components/Sidebar";
import ToDo from "@/components/ToDo";
import UnderReview from "@/components/UnderReview";

const Home = ()=>{
  const cardDetails = {
    title: "Design new logo",
    status: "To do",
    priority: "Urgent",
    deadline: "2024-08-25",
    description:
      "Develop and integrate user authentication using email and password.",
  };
  return (
    <main className="flex min-h-screen  bg-[#f7f7f7]">
      <Sidebar />
      <section className="p-4 overflow-y-auto ml-64 gap-4 flex flex-col">
        <GreetingsForms />
        <div className="rounded-[0.5rem] p-4 grid grid-cols-4 gap-4 w-full bg-[#FFFFFF]">
          <ToDo />
          <InProgress/>
          <UnderReview/>
          <Finished/>
        </div>
      </section>
    </main>
  );
}

export default Home;