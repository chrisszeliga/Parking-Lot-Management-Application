// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

  

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { useEffect, useState } from "react";
import {
  initParking,
  parkVehicle,
  exitVehicle,
  getStatus,
} from "./api/parkingApi";

function App() {
  const [totalSlots, setTotalSlots] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleSize, setVehicleSize] = useState("SMALL");
  const [exitPlate, setExitPlate] = useState("");
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");

  async function refreshStatus() {
    const data = await getStatus();
    setSlots(data);
  }

  async function handleInit() {
    const msg = await initParking(Number(totalSlots));
    setMessage(msg);
    setTotalSlots("");
    refreshStatus();
  }

  async function handlePark() {
    const result = await parkVehicle({
      licensePlate,
      size: vehicleSize,
    });
    setMessage(JSON.stringify(result));
    setLicensePlate("");
    refreshStatus();
  }

  async function handleExit() {
    const result = await exitVehicle(exitPlate);
    setMessage(JSON.stringify(result));
    setExitPlate("");
    refreshStatus();
  }

  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Parking Lot Management App 🚗</h1>

      {/* INIT */}
      <section>
        <h2>Initialize / Reset Parking Lot</h2>
        <input
          type="number"
          placeholder="Total slots"
          value={totalSlots}
          onChange={(e) => setTotalSlots(e.target.value)}
        />
        <button onClick={handleInit}>Init</button>
      </section>

      <hr />

      {/* PARK */}
      <section>
        <h2>Park Vehicle</h2>
        <input
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />

        <select
          value={vehicleSize}
          onChange={(e) => setVehicleSize(e.target.value)}
        >
          <option value="SMALL">SMALL</option>
          <option value="LARGE">LARGE</option>
          <option value="OVERSIZE">OVERSIZE</option>
        </select>

        <button onClick={handlePark}>Park</button>
      </section>

      <hr />

      {/* EXIT */}
      <section>
        <h2>Exit Vehicle</h2>
        <input
          placeholder="License Plate"
          value={exitPlate}
          onChange={(e) => setExitPlate(e.target.value)}
        />
        <button onClick={handleExit}>Exit</button>
      </section>

      <hr />

      {/* MESSAGE */}
      {message && (
        <section>
          <h3>Response</h3>
          <pre>{message}</pre>
        </section>
      )}

      <hr />

      {/* STATUS */}
      <section>
        <h2>Parking Lot Status</h2>
        {slots.length === 0 ? (
          <p>No parking lot initialized</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Slot ID</th>
                <th>Size</th>
                <th>Vehicle</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id + 1}>
                  <td>{slot.id + 1}</td>
                  <td>{slot.size}</td>
                  <td>
                    {slot.vehicle
                      ? `${slot.vehicle.licensePlate} (${slot.vehicle.size})`
                      : "Empty"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;