# Hospital Management System - Backend

This is the backend API for the Hospital Management System, now using SQLite as the database.

## Features

- **SQLite Database**: No separate database server required
- **RESTful API**: Complete CRUD operations for all entities
- **Authentication**: JWT-based authentication
- **Email Integration**: Password reset functionality
- **CORS Enabled**: Ready for frontend integration

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   port=5000
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. **Run the Application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Database**
   - SQLite database file (`hospital.db`) will be automatically created
   - All tables will be created automatically on first run
   - No additional database setup required

## API Endpoints

### Admin Routes
- `GET /admin` - Get all admins
- `POST /admin/register` - Register new admin
- `POST /admin/login` - Admin login
- `PATCH /admin/:id` - Update admin
- `DELETE /admin/:id` - Delete admin
- `POST /admin/forgot` - Forgot password

### Doctor Routes
- `GET /doctors` - Get all doctors
- `POST /doctors/register` - Register new doctor
- `POST /doctors/login` - Doctor login
- `PATCH /doctors/:id` - Update doctor
- `DELETE /doctors/:id` - Delete doctor

### Patient Routes
- `GET /patients` - Get all patients
- `POST /patients/register` - Register new patient
- `POST /patients/login` - Patient login
- `PATCH /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient

### Nurse Routes
- `GET /nurses` - Get all nurses
- `POST /nurses/register` - Register new nurse
- `POST /nurses/login` - Nurse login
- `PATCH /nurses/:id` - Update nurse
- `DELETE /nurses/:id` - Delete nurse

### Other Routes
- `GET /appointments` - Get all appointments
- `POST /appointments` - Create appointment
- `GET /beds` - Get all beds
- `POST /beds` - Add new bed
- `GET /payments` - Get all payments
- `POST /payments` - Create payment
- `GET /prescriptions` - Get all prescriptions
- `POST /prescriptions` - Create prescription
- `GET /reports` - Get all reports
- `POST /reports` - Create report
- `GET /ambulances` - Get all ambulances
- `POST /ambulances` - Add ambulance
- `GET /hospitals` - Get hospital info
- `POST /hospitals` - Update hospital info

## Database Schema

The application uses the following main entities:
- **Admins**: Hospital administrators
- **Doctors**: Medical staff
- **Nurses**: Nursing staff
- **Patients**: Hospital patients
- **Appointments**: Patient appointments
- **Beds**: Hospital beds and rooms
- **Payments**: Payment records
- **Prescriptions**: Medical prescriptions
- **Reports**: Medical reports
- **Ambulances**: Emergency vehicles
- **Hospitals**: Hospital information

## Benefits of SQLite

- **No Installation**: No separate database server needed
- **Portable**: Single file database
- **Zero Configuration**: Works out of the box
- **Reliable**: ACID compliant
- **Fast**: Excellent performance for small to medium applications

## Troubleshooting

1. **Port Already in Use**: Change the port in `.env` file
2. **Database Errors**: Delete `hospital.db` file and restart
3. **CORS Issues**: Frontend should run on different port (default: 3000)

## Development

The application uses:
- **Express.js**: Web framework
- **Sequelize**: ORM for SQLite
- **JWT**: Authentication
- **Nodemailer**: Email functionality
- **CORS**: Cross-origin resource sharing
