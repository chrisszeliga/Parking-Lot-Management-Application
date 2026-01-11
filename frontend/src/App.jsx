import { useEffect, useState } from "react";
import {initParking, parkVehicle, exitVehicle, getStatus} from "./api/parkingApi";
import "./App.css";

function App() {
  const [totalSlots, setTotalSlots] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleSize, setVehicleSize] = useState("SMALL");
  const [exitPlate, setExitPlate] = useState("");
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  async function refreshStatus() {
    try {
      const data = await getStatus();
      setSlots(data);
    } catch (err) {
      console.error(err);
    }
  }

  function showMessage(msg, type = "info") {
    setMessage(msg);
    setMessageType(type);
  }

  async function handleInit() {
    if (!totalSlots || totalSlots < 1) {
      showMessage("Please enter a valid number of slots", "error");
      return;
    }
    try {
      const msg = await initParking(Number(totalSlots));
      showMessage(msg, "success");
      setTotalSlots("");
      refreshStatus();
    } catch (err) {
      showMessage("Failed to initialize parking lot", "error");
      console.error(err);
    }
  }

  async function handlePark() {
    if (!licensePlate.trim()) {
      showMessage("Please enter a license plate", "error");
      return;
    }
    try {
      const result = await parkVehicle({
        licensePlate,
        size: vehicleSize,
      });
      showMessage(
        result.message || "Vehicle parked",
        result.success ? "success" : "error"
      );
      setLicensePlate("");
      refreshStatus();
    } catch (err) {
      showMessage("Failed to park vehicle", "error");
      console.error(err);
    }
  }

  async function handleExit() {
    if (!exitPlate.trim()) {
      showMessage("Please enter a license plate", "error");
      return;
    }
    try {
      const result = await exitVehicle(exitPlate);
      showMessage(
        result.message || "Vehicle exited",
        result.success ? "success" : "error"
      );
      setExitPlate("");
      refreshStatus();
    } catch (err) {
      showMessage("Failed to exit vehicle", "error");
      console.error(err);
    }
  }

  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Parking Lot Management Application</h1>

        <div className="ascii-box">
{`
╔════════════════════════════════╗
║            ENTRANCE            ║
╚════════════════════════════════╝

┏━━━━━┓  ┏━━━━━┓  ┏━━━━━┓  ┏━━━━━┓
┃ [1] ┃  ┃ [2] ┃  ┃ [3] ┃  ┃ [4] ┃
┃ --- ┃  ┃ --- ┃  ┃ --- ┃  ┃ --- ┃
┗━━━━━┛  ┗━━━━━┛  ┗━━━━━┛  ┗━━━━━┛
    
┏━━━━━┓  ┏━━━━━┓  ┏━━━━━┓  ┏━━━━━┓
┃ [5] ┃  ┃ [6] ┃  ┃ [7] ┃  ┃ [8] ┃
┃ --- ┃  ┃ --- ┃  ┃ --- ┃  ┃ --- ┃
┗━━━━━┛  ┗━━━━━┛  ┗━━━━━┛  ┗━━━━━┛

╔════════════════════════════════╗
║             EXIT →             ║
╚════════════════════════════════╝
`}
        </div>
      </header>
      
      <hr />

      {/* INITIALIZE */}
      <section className="panel">
        <h2>Initialize Parking Lot</h2>
        <div className="control-group">
          <label>Total Slots</label>
          <input
            type="number"
            value={totalSlots}
            onChange={(e) => setTotalSlots(e.target.value)}
          />
          <button onClick={handleInit}>Initialize</button>
        </div>
      </section>

      {/* PARK */}
      <section className="panel">
        <h2>Park Vehicle</h2>
        <div className="control-group">
          <label>License Plate</label>
          <input
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />

          <label>Vehicle Size</label>
          <select
            value={vehicleSize}
            onChange={(e) => setVehicleSize(e.target.value)}
          >
            <option value="SMALL">SMALL</option>
            <option value="LARGE">LARGE</option>
            <option value="OVERSIZE">OVERSIZE</option>
          </select>

          <button onClick={handlePark}>Park</button>
        </div>
      </section>

      {/* EXIT */}
      <section className="panel">
        <h2>Exit Vehicle</h2>
        <div className="control-group">
          <label>License Plate</label>
          <input
            value={exitPlate}
            onChange={(e) => setExitPlate(e.target.value)}
          />
          <button onClick={handleExit}>Exit</button>
        </div>
      </section>

      <hr/>

      {/* STATUS */}
      <section>
        <h2>Parking Status</h2>
        {slots.length === 0 ? (
          <div className="empty-state">→ No parking lot initialized</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Slot</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>License Plate</th>
                  <th>Vehicle Type</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot.id}>
                    <td>[{String(slot.id + 1).padStart(2, "0")}]</td>
                    <td>{slot.size}</td>
                    <td
                      className={
                        slot.vehicle
                          ? "occupied-status"
                          : "available-status"
                      }
                    >
                      {slot.vehicle ? "[X] OCCUPIED" : "[ ] AVAILABLE"}
                    </td>
                    <td>
                      {slot.vehicle ? slot.vehicle.licensePlate : "---"}
                    </td>
                    <td>{slot.vehicle ? slot.vehicle.size : "---"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
