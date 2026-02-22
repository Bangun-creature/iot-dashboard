import { useRef, useState } from "react";

export default function Navbar() {
  const menuNavbar = [
    { link: "#", text: "Beranda" },
    { link: "#", text: "Device Control" },
    { link: "#", text: "Monitoring" },
    { link: "#", text: "Access Control" },
    { link: "#", text: "Settings" },
    { link: "#", text: "Log/History" },
    { link: "#", text: "Log Out" },
  ];

  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const backgroundNavbar = useRef(null);

  const handleClickNavbar = () => setIsOpenNavbar(true);

  const handleCloseNavbar = (e) => {
    if (e.target === backgroundNavbar.current) {
      setIsOpenNavbar(false);
    }
  };

  return (
    <div className="fixed lg:relative z-50 lg:z-auto lg:col-span-1 w-full lg:h-full">
      {/* Top Bar Mobile */}
      <div className="lg:hidden bg-blue-600 w-full flex justify-between items-center px-[5%] py-3 text-white shadow-md">
        <p className="font-bold font-robotoflex">IOT Dahsboard</p>
        <button onClick={handleClickNavbar} >
            <div className="bg-[url(/icon/menu.png)] bg-contain bg-no-repeat w-7 h-7"></div>
        </button>
      </div>

      {/* Background Overlay / Backdrop */}
      <div
        ref={backgroundNavbar}
        onClick={handleCloseNavbar}
        className={`
          ${isOpenNavbar ? "opacity-100 visible" : "opacity-0 invisible"} 
          lg:opacity-100 lg:visible transition-all duration-300
          fixed lg:relative inset-0 h-screen lg:h-full 
          backdrop-blur-md lg:backdrop-blur-none bg-black/40 lg:bg-transparent w-full
        `}
      >
        {/* Sidebar Panel */}
        <div
          className={`
            bg-slate-700 text-white w-[75%] sm:w-[40%] lg:w-full flex flex-col h-full 
            transition-transform duration-300 transform border-r border-slate-600
            ${isOpenNavbar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          `}
        >
          {/* User Profile */}
          <div className="flex gap-3 items-center px-6 py-8 border-b border-slate-600">
            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
              RI
            </div>
            <div>
              <p className="font-semibold font-robotoflex text-sm">Romi Indrajaya</p>
              <p className="text-xs text-slate-400 font-notosans font-light">romi@iot.com</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col h-fit">
              {menuNavbar.map((item, index) => (
                <li key={index} className="w-full">
                  <a
                    href={item.link}
                    className="flex px-6 py-4 hover:bg-slate-600 border-b border-slate-600/50 transition-colors font-robotoflex text-sm text-slate-200"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}