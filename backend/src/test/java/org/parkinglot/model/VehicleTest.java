package org.parkinglot.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

// methodName_expectedBehavior_condition naming format
public class VehicleTest {
    @Test
    void vehicle_ShouldStoreLicensePlateAndSize() {
        Vehicle vehicle = new Vehicle("ABC-123", VehicleSize.SMALL);

        assertEquals("ABC-123", vehicle.getLicensePlate());
        assertEquals(VehicleSize.SMALL, vehicle.getSize());
    }

    @Test
    void ordinal_ShouldReturnCorrectValue_ForEachVehicleSize() {
        assertEquals(0, VehicleSize.SMALL.ordinal());
        assertEquals(1, VehicleSize.LARGE.ordinal());
        assertEquals(2, VehicleSize.OVERSIZE.ordinal());
    }

}
