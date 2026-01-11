const BASE_URL = "http://localhost:8080/parking";

export async function initParking(totalSlots) {
  const res = await fetch(`${BASE_URL}/init?totalSlots=${totalSlots}`, { method: "POST" });
  return res.text();
}

export async function parkVehicle(vehicle) {
  const res = await fetch(`${BASE_URL}/entry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  return res.json();
}

export async function exitVehicle(licensePlate) {
  const res = await fetch(`${BASE_URL}/exit?licensePlate=${licensePlate}`, { method: "POST" });
  return res.json();
}

export async function getStatus() {
  const res = await fetch(`${BASE_URL}/status`);
  return res.json();
}