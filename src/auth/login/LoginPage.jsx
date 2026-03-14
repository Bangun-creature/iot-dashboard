export default function LoginPage(){
    return(
        <div className="grid px-[5%]">
            <div className="mx-auto w-full mt-20 bg-slate-900 rounded-lg p-4 flex flex-col gap-8 md:w-sm">
                <div className="flex flex-col gap-2">
                <h1 className="text-5xl text-slate-100 font-light font-robotoflex">Welcome Back to Iot Dahsboard Website</h1>
                <p className="text-xs text-slate-300 font-light font-notosans">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, minima.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-xs text-slate-100 font-notosans font-light">Username</label>
                        <input type="text" placeholder="input your name" className="bg-slate-500 text-slate-100 px-3 py-2 rounded-lg text-sm focus:outline-slate-300/20" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-xs text-slate-100 font-notosans font-light">Password</label>
                        <input type="text" placeholder="input your password" className="bg-slate-500 text-slate-100 px-3 py-2 rounded-lg text-sm focus:outline-slate-300/20" />
                    </div>
                    <button className="bg-blue-600 p-2 rounded-lg font-notosans font-medium text-slate-100 text-sm mt-6">Login</button>
                </div>
            </div>
        </div>
    )
}