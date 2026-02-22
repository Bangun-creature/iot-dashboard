import Hero from "./Hero";
import Navbar from "./Navbar";

function App() {
  return (
    // overflow-hidden mencegah double scrollbar pada dashboard
    <div className="w-full h-screen bg-slate-800 lg:grid lg:grid-cols-5 overflow-hidden">
      <Navbar />
      {/* Area utama dengan scroll mandiri */}
      <main className="lg:col-span-4 h-full overflow-y-auto">
        <Hero />
      </main>
    </div>
  );
}

export default App;