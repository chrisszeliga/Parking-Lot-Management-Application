package org.parkinglot.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

// methodName_expectedBehavior_condition naming format
public class SlotTest {
    @Test
    void Slot_ShouldReturnCorrectIdAndSizeAndVehicle() {
        Slot slot = new Slot(1, SlotSize.LARGE);

        assertEquals(1, slot.getId());
        assertEquals(SlotSize.LARGE, slot.getSize());
        assertNull(slot.getVehicle());
    }

    @Test
    void slot_ShouldBeEmptyInitially() {
        Slot slot = new Slot(1, SlotSize.LARGE);
        assertTrue(slot.isEmpty());
    }

    @Test
    void setVehicle_ShouldStoreVehicle() {
        Slot slot = new Slot(1, SlotSize.LARGE);
        Vehicle vehicle = new Vehicle("ABC-123", VehicleSize.LARGE);

        slot.setVehicle(vehicle);

        assertFalse(slot.isEmpty());
        assertEquals(vehicle, slot.getVehicle());
    }

    @Test
    void setVehicle_ShouldReplaceExistingVehicle() {
        Slot slot = new Slot(1, SlotSize.SMALL);
        Vehicle v1 = new Vehicle("ABC-123", VehicleSize.SMALL);
        Vehicle v2 = new Vehicle("XYZ-789", VehicleSize.SMALL);

        slot.setVehicle(v1);
        slot.setVehicle(v2);

        assertEquals(v2, slot.getVehicle());
    }
}
