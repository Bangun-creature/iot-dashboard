import axios from 'axios';

import React, { useEffect, useState } from 'react';



export default function DeviceControl() {

  // State untuk menyimpan daftar saklar

  // const [switches, setSwitches] = useState([

  //   { id: 1, name: "Main Light", status: false, gpio: "GPIO 2" }

  // ]);

  const [switches, setSwitches] = useState([]);
  const loadedDataButton = async ()=>{

    try {

      const rawData = await axios.get('http://localhost:3000/api/buttons');
      console.log(`Hasil load data: ${JSON.stringify(rawData.data)}`);

      // Set state nya langsung ambil data dari rest api

      setSwitches(rawData.data.payload.datas);
      // setSwitches

    } catch (error) {

      console.log(`There is an error loaded data: ${error}`);

    }

  }



  // Load data pertama kali saat render:

  useEffect(()=>{

    loadedDataButton();

    console.log(`Ini data saya: ${switches}`)

  },[])



  // Fungsi tambah saklar (Max 8)

  const addSwitch = async () => {
    if (switches.length < 8) {
      const newId = switches.length + 1;
      const newSwitch = {

        id: Date.now(), // Gunakan timestamp agar ID unik
        name: `Device ${newId}`,
        status: false,
        gpio: "Not Set"

      };



      try {

        // Langsung kirimkan ke api untuk object switch yang baru

        const rawData = await axios.post(`http://localhost:3000/api/buttons`, newSwitch);
        // Update state untuk render di api
        setSwitches([...switches, newSwitch]);
        console.log(`Response add button: ${JSON.stringify(rawData.data)}`);

      } catch (error) {
        console.log(`Ada error: ${error}`);
      }

      // Bongkar switch nya wadahin di array dan tambahkan newSwitch
    } else {
      alert("Maksimal 8 tombol saklar tercapai!");
    }

  };



  // Fungsi toggle status saklar
  const toggleSwitch = async (id) => {
    const itemSwitch = switches.find((sw)=> sw.id == id);
    const newStatus = !itemSwitch.status;

    setSwitches(switches.map((sw)=> sw.id == id ? {...sw, status: newStatus} : sw));

    try {

      const rawData = await axios.post(`http://localhost:3000/api/buttons/${id}/control`, {
        status: newStatus,
        name: itemSwitch.name
      });

      console.log(rawData.data);
    } catch (error) {
      console.log(`There is an error ${error}`);
    }

  };



  // Fungsi hapus saklar
  const removeSwitch = async(id) => {
    try {

      const rawData = await axios.delete(`http://localhost:3000/api/buttons/${id}`);

      console.log(`Response Delete Button: ${JSON.stringify(rawData.data)}`);

     

      setSwitches(switches.filter(sw => sw.id !== id));

    } catch (error) {

      console.log(`There is an error in process deleting data: ${error}`);

    }



  };



  return (

    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8">

      {/* Header & Add Button */}

      <div className="flex justify-between items-end border-b border-slate-800 pb-6">

        <div>

          <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Device Control</h1>

          <p className="text-slate-200/70 font-notosans font-light text-sm mt-2">

            Manage up to 8 IoT actuators. Total active: {switches.length}

          </p>

        </div>

        <button

          onClick={addSwitch}

          disabled={switches.length >= 8}

          className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2

            ${switches.length >= 8

              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'

              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'}`}

        >

          <span className="text-xl">+</span> Add Switch

        </button>

      </div>



      {/* Grid Saklar */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">

        {switches.map((sw) => (

          <div key={sw.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-slate-200 font-semibold">{sw.name}</h3>

                <p className="text-xs text-slate-500 font-mono uppercase tracking-tighter">{sw.gpio}</p>

              </div>

              <button

                onClick={() => removeSwitch(sw.id)}

                className="text-slate-600 hover:text-red-400 text-xs transition-colors"

              >

                Remove

              </button>

            </div>



            <div className="flex items-center justify-between mt-4">

              <span className={`text-sm font-bold uppercase ${sw.status ? 'text-blue-400' : 'text-slate-500'}`}>

                {sw.status ? 'Active' : 'Inactive'}

              </span>

             

              {/* Toggle Switch Component */}

              <label className="relative inline-flex items-center cursor-pointer">

                <input

                  type="checkbox"

                  className="sr-only peer"

                  checked={sw.status == 1 ? true : false}

                  onChange={() => toggleSwitch(sw.id)}

                />

                <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>

              </label>

            </div>

           

            {/* Indikator Status Visual */}

            <div className={`h-1 w-full rounded-full mt-2 transition-all duration-500 ${sw.status ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`}></div>

          </div>

        ))}



        {/* Empty State / Placeholder */}

        {switches.length === 0 && (

          <div className="col-span-full py-20 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600">

            <p>No devices added yet. Click "+ Add Switch" to start.</p>

          </div>

        )}

      </div>

    </div>

  );

}