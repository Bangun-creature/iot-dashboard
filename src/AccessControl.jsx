import React, { useEffect, useState } from 'react';
import ModalRegisterCard from './ModalRegisterCard';
import axios from 'axios';
import ConfigurationRfid from './ConfigurationRfid';
import mqtt from 'mqtt';

export default function AccessControl() {
  // Data user terakhir yang melakukan TAP (Real-time Simulation)
  const [lastTap, setLastTap] = useState({
    id: "88:AA:BB:CC",
    user: "Bangun W.J.",
    status: "Granted",
    time: "10:45:12 AM"
  });

  // Daftar Log Akses
  const [logs, setLogs] = useState([
    { id: 1, uid: "88:AA:BB:CC", user: "Bangun W.J.", time: "10:45:12 AM", status: "Granted" },
    { id: 2, uid: "12:34:56:78", user: "Unknown", time: "10:30:05 AM", status: "Denied" },
    { id: 3, uid: "99:FF:EE:DD", user: "Romi Indrajaya", time: "09:15:20 AM", status: "Granted" },
  ]);

  const [listRfid, setListRfid] = useState([]);

  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

   function handleConfigurationOpen(id){
    setIsConfigurationOpen(true);
    setIdRfidConfiguration(id)
    console.log(`Id RFID: ${id}`)
  }

  // id RFID Configuration:
  const [idRfidConfiguration, setIdRfidConfiguration] = useState(null);

  const handleLoadListRfid = async()=>{
    try {
      const rawData = await axios.get(`http://localhost:3000/api/rfid`);
      console.log(`Ini data dari tabel rfid: ${JSON.stringify(rawData.data)}`);
      setListRfid(rawData.data.payload.datas);
    } catch (error) {
      console.log(`There is an error : ${error}`);
    }
  }

  useEffect(()=>{
    handleLoadListRfid();
  },[])

  // Fungsi yang dipanggil saat user klik Save di dalam Modal
  const handleSaveNewUser = async(data) => {
    // console.log("Data diterima di Parent:", data);
    // // Di sini kamu bisa melakukan integrasi database (POST ke Node.js)
    // alert(`Berhasil mendaftarkan ${data.name} dengan UID ${data.uid}`);

    // const rfid = "2900940E95";
    // const dataRfid = {
    //   rfid_code: rfid,
    //   status: false,
    // }
    console.log(`Data new user rfid : ${JSON.stringify(data)}`);

    try {
      const rawData = await axios.post(`http://localhost:3000/api/rfid/save`, data);

      console.log(`Response add rfid : ${JSON.stringify(rawData.data)}`);
    } catch (error) {
      console.log(`There is an error when add new rfid: ${error}`);
    }

    // try {
    //   const rawData = await axios.post(`http://localhost:3000/api/rfid/save`, dataRfid
    //   )

    //   setListRfid((prev)=> [...prev, dataRfid]);
    //   console.log(`Respon rfid : ${JSON.stringify(rawData.data)}`);
    // } catch (error) {
    //   console.log(`There is an error in rfid save new user: ${error}`);
    // }
  };

  useEffect(()=>{
    handleLoadListRfid();

    const client = mqtt.connect(`ws://broker.emqx.io:8083/mqtt`);

    client.on('connect', ()=> {
      console.log(`MQTT Connected in Acces Control`)
      client.subscribe(`/unnes/iot-e/rfid`)
    })

    client.on('message', (topic, message)=>{
      handleLoadListRfid();
    })

    return ()=>{
      if(client) client.end();
    }
  }, [])

  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Access Control</h1>
        <p className="text-slate-200/70 font-notosans font-light text-sm mt-2">
          Manage RFID permissions and monitor entry logs.
        </p>
      </div>

{listRfid.length > 0 && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Current Status Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className={`p-8 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-500
            ${listRfid[listRfid.length-1].status === "true" ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            
            <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-3xl
              ${listRfid[listRfid.length-1].status === "true" ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {listRfid[listRfid.length-1].status === "true" ? "✓" : "✕"}
            </div>
            
            <h2 className="text-slate-200 text-xl font-bold uppercase tracking-widest">Access {listRfid[listRfid.length-1].status}</h2>
            <p className="text-slate-400 font-mono mt-2">{listRfid[listRfid.length-1].rfid_code}</p>
            
            <div className="mt-6 text-center">
              <p className="text-slate-200 text-2xl font-semibold">{listRfid[listRfid.length-1].username}</p>
              <p className="text-slate-500 text-sm mt-1">{listRfid[listRfid.length-1].updated_at}</p>
            </div>
          </div>

          {/* <button className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 py-4 rounded-2xl font-bold transition-all" onClick={() => setIsModalOpen(true)}>
            + Register New Card
          </button> */}
          <button className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 py-4 rounded-2xl font-bold transition-all" onClick={()=>{setIsModalOpen(true)}}>
            + Register New Card
          </button>
          <ModalRegisterCard 
           isOpen={isModalOpen} 
           onClose={() => setIsModalOpen(false)} 
           onSave={handleSaveNewUser}
        />
        </div>

        {/* Access Logs Table */}
        <div className="lg:col-span-2 bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
            <h3 className="text-slate-200 font-semibold tracking-wide uppercase text-xs">Recent Activity Logs</h3>
            <button className="text-xs text-blue-400 hover:underline">Clear Logs</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/50 text-slate-500 uppercase text-[10px] tracking-tighter">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">User / UID</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {listRfid.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs flex gap-4">
                      <p>{log.updated_at}</p>
                      <button onClick={()=>{handleConfigurationOpen(log.id)}} className='text-slate-100 text-xs font-medium font-notosans bg-emerald-600 rounded-lg w-fit px-2 py-1'>Configuration</button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-200">{log.username}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{log.rfid_code}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase
                        ${log.status === 'true' ? 'bg-slate-100 text-blue-600' : 'bg-slate-100 text-red-500'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
)}
<ConfigurationRfid 
      isOpen={isConfigurationOpen}
      onClose={()=> setIsConfigurationOpen(false)}
      idRfidConfiguration={idRfidConfiguration}
      />

    </div>
  );
}