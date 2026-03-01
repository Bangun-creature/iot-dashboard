import React from 'react';

export default function SecurityLogs() {
  const systemLogs = [
    { event: "Unauthorized RFID Attempt", ip: "192.168.1.15", time: "2 mins ago", status: "Critical" },
    { event: "Admin Password Changed", ip: "10.0.0.5", time: "1 hour ago", status: "Warning" },
    { event: "MQTT Connection Re-established", ip: "Server", time: "3 hours ago", status: "Info" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* API Key Management */}
      <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
        <h3 className="text-slate-200 font-semibold mb-6">Device Security Token</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-slate-500 text-xs font-bold uppercase ml-1">X-API-KEY (ESP32 Auth)</label>
            <div className="flex gap-2">
              <input type="password" readOnly value="IOT-SECURE-9988776655" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-blue-400 font-mono text-sm outline-none" />
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-xl text-xs transition-all">Regenerate</button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Audit Table */}
      <section className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-slate-200 font-semibold">Security Audit Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900/50 text-[10px] uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Event Description</th>
                <th className="px-6 py-4">Origin IP</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {systemLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-slate-200 font-medium">{log.event}</p>
                    <p className="text-[10px] text-slate-500">{log.time}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{log.ip}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold 
                      ${log.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 
                        log.status === 'Warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}