# 🌍 Travel Planner – Full-Stack Web Application

Travel Planner is a full-stack web application that allows users to search for travel destinations, view destination details, explore travel options, and create personal travel itineraries.  

The application is built with **React** on the frontend and **Django REST Framework** on the backend, with secure integration of third-party travel APIs.

---

## 🚀 Features

### Destination Search
- Search for destinations by city name or keyword
- Fetches real travel data via the Amadeus API
- Displays:
  - City name
  - Country
  - City (IATA) code

### Destination Details
- View detailed information for a selected destination
- Displays:
  - City information
  - Top attractions (basic/placeholder)
  - Hotel accommodations **or** flight offers
  - Optional weather information

### Itinerary Planner
- Create travel itineraries
- Add destinations with start and end dates
- View and delete saved itineraries
- Data persisted via backend database

### Responsive UI
- Mobile-friendly and desktop-friendly design
- Built with Tailwind CSS for clean and consistent styling

### Secure API Handling
- Third-party API keys are stored securely in the backend
- Frontend communicates only with the Django API

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Django
- Django REST Framework
- SQLite (initial development)
- Python Requests
- django-cors-headers

### External APIs
- Amadeus API (Destinations, Hotels or Flights)
- OpenWeatherMap API (optional)

---

## 📁 Project Structure

```text
travel-planner/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── travel/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── services/
│   │       └── amadeus.py
│   ├── backend/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
