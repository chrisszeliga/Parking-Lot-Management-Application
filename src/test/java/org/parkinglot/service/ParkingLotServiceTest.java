package org.parkinglot.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.parkinglot.model.Slot;
import org.parkinglot.model.Vehicle;
import org.parkinglot.model.VehicleSize;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ParkingLotServiceTest {

    private ParkingLotService parkingLot;

    @BeforeEach
    void setUp() {
        parkingLot = new ParkingLotService(10);
    }

    /// Initialization tests

    @Test
    void parkingLot_ShouldHaveCorrectNumberOfSlots() {
        List<Slot> slots = parkingLot.getSlots();
        assertEquals(10, slots.size());
    }

    @Test
    void parkingLot_ShouldDistributeSlotsAccordingToRatios() {
        long smallCount = parkingLot.getSmallSlots();
        long largeCount = parkingLot.getLargeSlots();
        long oversizeCount = parkingLot.getOversizedSlots();

        assertEquals(2, smallCount);    // 25% of 10
        assertEquals(6, largeCount);    // 55% of 10 + remainder
        assertEquals(2, oversizeCount); // 20% of 10
    }

    /// Vehicle entry tests

    @Test
    void vehicleEntry_ShouldSucceed_WhenSlotAvailable() {
        Vehicle vehicle = new Vehicle("ABC-123", VehicleSize.SMALL);
        boolean result = parkingLot.vehicleEntry(vehicle);

        assertTrue(result);
        assertEquals(1, parkingLot.getVehicles().size());
    }

    @Test
    void vehicleEntry_ShouldFail_WhenVehicleAlreadyParked() {
        Vehicle vehicle = new Vehicle("ABC-123", VehicleSize.SMALL);
        parkingLot.vehicleEntry(vehicle);

        boolean result = parkingLot.vehicleEntry(vehicle);
        assertFalse(result);
    }

    @Test
    void vehicleEntry_ShouldAllowSmallerVehicleInLargerSlot() {
        Vehicle vehicle = new Vehicle("SMALL1", VehicleSize.SMALL);
        // Assuming SMALL slots are full
        parkingLot.vehicleEntry(new Vehicle("SMALL2", VehicleSize.SMALL));
        parkingLot.vehicleEntry(new Vehicle("SMALL3", VehicleSize.SMALL));

        boolean result = parkingLot.vehicleEntry(vehicle);
        assertTrue(result); // Should park in first available LARGER slot
    }

    @Test
    void vehicleEntry_ShouldFail_WhenNoSlotAvailable() {
        // Fill all slots with LARGE vehicles
        for (Slot s : parkingLot.getSlots()) {
            parkingLot.vehicleEntry(new Vehicle("TEMP" + s.getId(), VehicleSize.SMALL));
        }

        Vehicle extraVehicle = new Vehicle("EXTRA", VehicleSize.LARGE);
        boolean result = parkingLot.vehicleEntry(extraVehicle);

        assertFalse(result);
    }

    /// Vehicle exit tests

    @Test
    void vehicleExit_ShouldSucceed_WhenVehicleExists() {
        Vehicle vehicle = new Vehicle("EXIT-123", VehicleSize.SMALL);
        parkingLot.vehicleEntry(vehicle);

        boolean result = parkingLot.vehicleExit(vehicle.getLicensePlate());
        assertTrue(result);
        assertEquals(0, parkingLot.getVehicles().size());
    }

    @Test
    void vehicleExit_ShouldFail_WhenVehicleDoesNotExist() {
        boolean result = parkingLot.vehicleExit("NON-EXISTENT");
        assertFalse(result);
    }

    @Test
    void vehicleExit_ShouldFreeUpSlotForNewVehicle() {
        Vehicle v1 = new Vehicle("CAR1", VehicleSize.SMALL);
        parkingLot.vehicleEntry(v1);

        parkingLot.vehicleExit(v1.getLicensePlate());

        Vehicle v2 = new Vehicle("CAR2", VehicleSize.SMALL);
        boolean result = parkingLot.vehicleEntry(v2);
        assertTrue(result);
    }

}