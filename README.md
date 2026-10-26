# E-Commerce Store

A full-stack e-commerce web application built with React and Flask. The project includes a product catalogue, individual product pages, a shopping cart, and an order confirmation interface.

## Features

- Browse products and view product details
- Navigate between shop and product pages
- Manage shopping cart quantities
- Display product images, prices, and descriptions
- Flask REST API for retrieving product data
- SQLite database for product storage
- Responsive React frontend

## Tech Stack

**Frontend**
- React
- React Router
- Vite
- CSS

**Backend**
- Python
- Flask
- Flask-CORS
- SQLite

## Project Structure

```text
ecommerce-store/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── store.db
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install Python and Node.js on your computer.

### 1. Start the backend

Open a terminal in the project root:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

### 2. Start the frontend

Open a second terminal in the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend health |
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/<product_id>` | Retrieve a product by ID |

## Notes

- The SQLite database is included to provide sample product data.
- The Python virtual environment and Node.js dependencies are excluded from version control.
- The frontend and backend must both be running for the application to work locally.

## Future Improvements

- Add user authentication
- Implement checkout and payment processing
- Connect a production database
- Deploy the frontend and backend

## Author

Ebenezer Ekuful

GitHub: https://github.com/EbbsOnline3/
