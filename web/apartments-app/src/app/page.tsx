import Header from "./components/Header";
import Apartments from "./apartments/page";

export default function Home() {
  return (
    <div className="flex-grow bg-white min-h-screen">
     <Header />
      <Apartments />
    </div>
  );
}
