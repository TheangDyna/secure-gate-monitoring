## Project Description

This project develops an offline face recognition system with the following functionalities, designed to operate without internet dependency, ensuring secure and efficient monitoring, identification, and administrative capabilities.

### Functionalities

1. **First Main Gate Monitoring**:
   - One camera to detect and count oil trucks and other vehicles (cars, motorbikes, etc.) entering and exiting.
   - Logs counts in SQLite database for real-time analytics.
2. **Second Main Gate Monitoring**:
   - One camera to detect and count people entering and exiting.
   - Logs counts in SQLite database for real-time analytics.
3. **Office Gate Identification with Check-in/Check-out**:
   - Users click “Check-in” or “Check-out” on a kiosk to initiate face recognition.
   - Camera scans and identifies users as staff (pre-registered) or guests.
   - Guests register on the kiosk if unrecognized, storing face embeddings in SQLite.
   - System confirms action and logs entry/exit times for staff and guests.
4. **Admin Authentication**:
   - Secure login with username and password for access to sensitive features and dashboards.
5. **Multi-Screen Display**:
   - **General Dashboard**: Real-time monitoring of vehicle and people counts, analytics.
   - **Admin Dashboard**: Manages system configurations, staff records, and logs (authentication required).
   - **Kiosk Interface**: Handles guest registration and check-in/check-out.
6. **Database**:
   - SQLite for lightweight, serverless storage of user profiles, face embeddings, check-in/out logs, vehicle/people counts, and admin credentials.
7. **Technology Stack**:
   - Next.js for performant frontend and backend integration.
   - face-api.js for face recognition at Office Gate.
   - YOLOv8 for vehicle counting at First Main Gate and people counting at Second Main Gate.

### Design Goals

- **Offline Operation**: No internet dependency, deployed on local hardware (e.g., Raspberry Pi).
- **Security**: Encrypted SQLite storage, bcrypt-hashed admin credentials.
- **Performance**: Face recognition <2 seconds, real-time dashboard updates.
- **Scalability**: Supports up to 1,000 staff, 500 daily guests, and high vehicle/people traffic.
