package org.parkinglot.controller;

import org.parkinglot.model.Slot;
import org.parkinglot.model.Vehicle;
import org.parkinglot.service.ParkingLotService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/parking")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkingLotController {

    private ParkingLotService service;

    /// Initialization / Resetting Service Endpoint

    @PostMapping("/init")
    public String init(@RequestParam int totalSlots) {
        this.service = new ParkingLotService(totalSlots);
        return "Parking lot initialized with " + totalSlots + " slots";
    }

    /// Vehicle Endpoints

    @PostMapping("/entry")
    public boolean vehicleEntry(@RequestBody Vehicle vehicle) {
        if (service == null)
            return false;
        return service.vehicleEntry(vehicle);
    }

    @PostMapping("/exit")
    public boolean vehicleExit(@RequestParam String licensePlate) {
        if (service == null)
            return false;
        return service.vehicleExit(licensePlate);
    }

    @GetMapping("/status")
    public List<Slot> getStatus() {
        if (service != null)
            return service.getSlots();
        else
            return Collections.emptyList();
    }
}

