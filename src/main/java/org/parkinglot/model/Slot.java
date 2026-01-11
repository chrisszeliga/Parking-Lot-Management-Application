package org.parkinglot.model;

public class Slot {
    private final int id;
    private final SlotSize size;
    private Vehicle vehicle;

    public Slot(int id, SlotSize size) {
        this.id = id;
        this.size = size;
        this.vehicle = null;
    }

    public int getId() {
        return id;
    }

    public SlotSize getSize() {
        return size;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public boolean isEmpty() {
        return vehicle == null;
    }
}
