import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import Navbar from "./Navbar";
import DeviceControl from "./DeviceControl";
import Monitoring from "./Monitoring";
import AccessControl from "./AccessControl";
import Settings from "./Settings";
import History from "./History";

function App() {
  return (
    // overflow-hidden mencegah double scrollbar pada dashboard
    <Router>
      <div className="w-full h-screen bg-slate-800 lg:grid lg:grid-cols-5 overflow-hidden">
        {/* Navbar tetap di sini agar selalu muncul */}
        <Navbar />

        {/* Area utama dengan scroll mandiri */}
        <main className="lg:col-span-4 h-full overflow-y-auto bg-slate-900">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/device-control" element={<DeviceControl />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/access-control" element={<AccessControl />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
            {/* Tambahkan route lainnya di sini sesuai menuNavbar */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;