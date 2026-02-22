import { useRef, useState } from "react"

export default function Navbar(){
    const menuNavbar = [{link: "#", text: "Beranda"}, {link: "#", text: "Device Control"}, {link: "#", text: "Monitoring"}, {link: "#", text: "Access Control"}, {link: "#", text: "Settings"}, {link: "#", text: "Log/History"}, {link: "#", text: "Log Out"}]

    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const backgroundNavbar = useRef(null);

    const handleClickNavbar = ()=>{
        setIsOpenNavbar(true);
    }

    const handleCloseNavbar = (e)=> {
        if(e.target == backgroundNavbar.current){
            setIsOpenNavbar(false);
        }
    }

    return(
        <div className="relative h-screen">
            <div className="bg-blue-500 w-full flex justify-between px-[5%] py-2">
                <p>iot-dashboard</p>
                <p onClick={handleClickNavbar}>Menu</p>
            </div>
            <div ref={backgroundNavbar} onClick={handleCloseNavbar} className={`${isOpenNavbar ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-200 absolute backdrop-blur-lg left-0 top-0 bottom-0 w-full `}>
                <div className={`bg-slate-400 w-[75%] flex flex-col gap-1 h-full ${isOpenNavbar ? 'translate-x-0' : '-translate-x-75'} transition-transform duration-300`}>
                <div className="flex gap-3 items-center px-[5%] py-2">
                    <img src="" alt="" className="bg-red-300 w-10 h-10 rounded-full" />
                    <div>
                        <p>Romi Indrajaya</p>
                        <p>Email</p>
                    </div>
                </div>
                <div className="h-full">
                    <ul className="grid grid-rows-7 h-full">
                        {menuNavbar.map((item, index)=> (
                            <li className="row-span-1 w-full h-full" key={index}><a href={item.link} className="flex bg-red-300 w-full h-full items-center justify-center">{item.text}</a></li>
                        ))}
                        
                    </ul>
                </div>
            </div>
            </div>
        </div>
    )
}