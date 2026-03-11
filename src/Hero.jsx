export default function Hero() {
  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-5">
      {/* Header Content */}
      <div className="py-6">
        <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Dashboard Overview</h1>
        <p className="text-slate-200/70 font-notosans font-light text-sm">Welcome back, monitoring your IoT devices here.</p>
      </div>

      {/* Placeholder untuk Widget Anda nanti */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          Meter Gauge Space
        </div>
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          RFID Status Space
        </div>
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          Control Button Space
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
  {/* Card 1: Power Status (Dari Meter Gauge) */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Avg Voltage</p>
    <h2 className="text-3xl font-semibold text-white mt-2">218 <span className="text-sm text-slate-400">V</span></h2>
    <div className="mt-2 text-xs text-green-500">● Stable</div>
  </div>

  {/* Card 2: Security Status (Dari RFID) */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Today's Access</p>
    <h2 className="text-3xl font-semibold text-white mt-2">14 <span className="text-sm text-slate-400">Taps</span></h2>
    <div className="mt-2 text-xs text-blue-500">Last: 5 mins ago</div>
  </div>

  {/* Card 3: Active Switches (Dari Buttons) */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Devices</p>
    <h2 className="text-3xl font-semibold text-white mt-2">3 <span className="text-sm text-slate-400">/ 8</span></h2>
    <div className="mt-2 text-xs text-slate-500">Switches are ON</div>
  </div>

  {/* Card 4: System Health */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">MQTT Broker</p>
    <h2 className="text-3xl font-semibold text-green-500 mt-2">Online</h2>
    <div className="mt-2 text-xs text-slate-500">broker.emqx.io</div>
  </div>
</div>
    </div>
  );
}