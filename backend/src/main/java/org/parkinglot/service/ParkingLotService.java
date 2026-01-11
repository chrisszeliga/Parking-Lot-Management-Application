package org.parkinglot.service;

import org.parkinglot.model.Slot;
import org.parkinglot.model.SlotSize;
import org.parkinglot.model.Vehicle;

import java.util.*;

public class ParkingLotService {
    private final List<Slot> slots = new ArrayList<>();
    // Vehicle license plate -> slot id vehicle is in
    private final Map<String, Integer> vehicles = new HashMap<>();

    // Ratios for distributing parking slots
    private static final double SMALL_RATIO = 0.25;
    private static final double LARGE_RATIO = 0.55;
    private static final double OVERSIZE_RATIO = 0.20;

    private final int smallSlots;
    private int largeSlots;
    private final int oversizedSlots;


    public ParkingLotService(int totalSlots) {
        smallSlots = (int) Math.floor(totalSlots * SMALL_RATIO);
        largeSlots = (int) Math.floor(totalSlots * LARGE_RATIO);
        oversizedSlots = (int) Math.floor(totalSlots * OVERSIZE_RATIO);

        // Add remainder to large slots
        int remainder = totalSlots - (smallSlots + largeSlots + oversizedSlots);
        largeSlots += remainder;

        int slotId = 0;
        for (int i = 0; i < smallSlots; i++)
            slots.add(new Slot(slotId++, SlotSize.SMALL));

        for (int i = 0; i < largeSlots; i++)
            slots.add(new Slot(slotId++, SlotSize.LARGE));

        for (int i = 0; i < oversizedSlots; i++)
            slots.add(new Slot(slotId++, SlotSize.OVERSIZE));
    }


    public List<Slot> getSlots() {
        return slots;
    }


    public int getSmallSlots() {
        return smallSlots;
    }


    public int getLargeSlots() {
        return largeSlots;
    }


    public int getOversizedSlots() {
        return oversizedSlots;
    }


    public Map<String, Integer> getVehicles() {
        return vehicles;
    }


    /// Returns success or failure
    /// Edge case: let smaller sized vehicles park in larger sized slots
    public boolean vehicleEntry(Vehicle vehicle) {
        // Vehicle already in a parking slot
        if (vehicles.get(vehicle.getLicensePlate()) != null)
            return false;

        for (Slot s : slots) {
            if (s.isEmpty() && s.getSize().ordinal() >= vehicle.getSize().ordinal()) {
                vehicles.put(vehicle.getLicensePlate(), s.getId());
                s.setVehicle(vehicle);
                return true;
            }
        }
        return false;
    }


    public boolean vehicleExit(String licensePlate) {
        // Check if vehicle exists, with attempted removal
        if (!vehicles.containsKey(licensePlate))
            return false;

        // license plate -> slot id -> slot object
        Slot slot = slots.get(vehicles.get(licensePlate));
        vehicles.remove(licensePlate);
        slot.setVehicle(null);

        return true;
    }
}
