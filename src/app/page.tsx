"use client";

import { useState } from "react";

export default function Home() {
  const [panchangRes, setPanchangRes] = useState<any>(null);
  const [panchangDate, setPanchangDate] = useState("");
  const [panchangLat, setPanchangLat] = useState("18.5204");
  const [panchangLng, setPanchangLng] = useState("73.8567");

  const [placeRes, setPlaceRes] = useState<any>(null);
  const [placeState, setPlaceState] = useState("Maharashtra");
  const [placeCity, setPlaceCity] = useState("Pune");

  const fetchPanchang = async () => {
    let url = `/api/v1/panchang?`;
    if (panchangDate) url += `date=${panchangDate}&`;
    if (panchangLat && panchangLng) url += `lat=${panchangLat}&lng=${panchangLng}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPanchangRes(data);
    } catch (e: any) {
      setPanchangRes({ error: e.message });
    }
  };

  const fetchPlaceActionStates = async () => {
    try {
      const res = await fetch(`/api/v1/placedata?action=states`);
      const data = await res.json();
      setPlaceRes(data);
    } catch (e: any) {
      setPlaceRes({ error: e.message });
    }
  };

  const fetchPlaceState = async () => {
    try {
      const res = await fetch(`/api/v1/placedata?state=${placeState}`);
      const data = await res.json();
      setPlaceRes(data);
    } catch (e: any) {
      setPlaceRes({ error: e.message });
    }
  };

  const fetchPlaceLatLong = async () => {
    try {
      const res = await fetch(`/api/v1/placedata?state=${placeState}&city=${placeCity}`);
      const data = await res.json();
      setPlaceRes(data);
    } catch (e: any) {
      setPlaceRes({ error: e.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-blue-600">Auramantra API Dashboard</h1>
        
        {/* Panchang Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Panchang API (/api/v1/panchang)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date (ISO)</label>
              <input type="text" className="w-full border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="YYYY-MM-DD" value={panchangDate} onChange={(e) => setPanchangDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Latitude</label>
              <input type="text" className="w-full border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 18.5204" value={panchangLat} onChange={(e) => setPanchangLat(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Longitude</label>
              <input type="text" className="w-full border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 73.8567" value={panchangLng} onChange={(e) => setPanchangLng(e.target.value)} />
            </div>
          </div>
          <button onClick={fetchPanchang} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Get Panchang</button>
          
          {panchangRes && (
            <div className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-64 text-sm">
              <pre>{JSON.stringify(panchangRes, null, 2)}</pre>
            </div>
          )}
        </section>

        {/* Place Data Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Place Data API (/api/v1/placedata)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
              <input type="text" className="w-full border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Maharashtra" value={placeState} onChange={(e) => setPlaceState(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
              <input type="text" className="w-full border rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Pune" value={placeCity} onChange={(e) => setPlaceCity(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={fetchPlaceActionStates} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Get All States</button>
            <button onClick={fetchPlaceState} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Get Cities for State</button>
            <button onClick={fetchPlaceLatLong} className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">Get Lat/Lng for State+City</button>
          </div>
          
          {placeRes && (
            <div className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-64 text-sm">
              <pre>{JSON.stringify(placeRes, null, 2)}</pre>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
