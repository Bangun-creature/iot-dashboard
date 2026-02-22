export default function Hero() {
  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-5">
      {/* Header Content */}
      <div className="py-6">
        <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Dashboard Overview</h1>
        <p className="text-slate-200/70 font-notosans font-light text-sm">Welcome back, monitoring your IoT devices here.</p>
      </div>

      {/* Placeholder untuk Widget Anda nanti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          Meter Gauge Space
        </div>
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          RFID Status Space
        </div>
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          Control Button Space
        </div>
      </div>
    </div>
  );
}