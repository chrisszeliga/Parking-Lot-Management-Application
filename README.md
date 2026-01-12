# Parking Lot Management Application

A full-stack Parking Lot Management application that allows users to initialize a parking lot, park vehicles, remove vehicles, and view parking slot status.

https://parking-lot-management-application.fly.dev/

Backend: Java, Spring Boot  
Frontend: React (Vite)  
Testing: JUnit


### Features

- Initialize a parking lot with a configurable number of slots
- Automatically assigns vehicles to appropriate slot sizes
- Supports vehicle entry and exit
- View real-time parking lot status
- REST API with a lightweight React frontend

---

## Running the Application

### Prerequisites
- Java 17+ (recommended: Java 21)
- Maven
- Node.js (v18+)
- npm


### Run Backend (Spring Boot)

```
mvn spring-boot:run
```

Backend runs at:
http://localhost:8080


### Run Frontend (React)

```
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

---

### API Endpoints

Base URL:
http://localhost:8080/parking

Method | Endpoint | Description
------ | -------- | -----------
POST | /init?totalSlots=N | Initialize parking lot
POST | /entry | Park a vehicle
POST | /exit?licensePlate=ABC-123 | Remove a vehicle
GET | /status | View parking status

---

### Testing

```
mvn test
```

Tests cover:
- Parking lot initialization
- Vehicle entry and exit logic
- Slot assignment rules

---

### Notes

- Parking lot size is configurable at runtime
- Smaller vehicles may occupy larger slots when needed
- Service layer is decoupled from Spring for easier testing
- CORS enabled for local frontend-backend communication

## Full Report
[Read the full report (PDF)](https://github.com/user-attachments/files/24557347/Christopher-Szeliga-Presentation-PDF.pdf)
