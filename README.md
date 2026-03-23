<div align="center">
  <img width="1200" height="475" alt="AgriSage Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # 🌾 AgriSage: The Unified Agriculture Platform
  **Empowering India's Farmers with Intelligent Insights & Live Market Data**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
  [![Gemini AI](https://img.shields.io/badge/Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
</div>

---

## 🚀 AgriSage MVP: The Core Foundation

The goal of the MVP is to solve the three most immediate "pain points" for a farmer: **Price Uncertainty**, **Weather Risk**, and **Lack of Expert Advice**.

### 1. Core "Must-Have" Features (Functional Now)
*   🛰️ **Real-Time Mandi Discovery**: A searchable interface to get live prices for major commodities (Wheat, Paddy, Cotton, etc.) using AI-grounded web data.
*   🌤️ **Hyper-Local Weather Forecast**: A 5-day precision forecast with humidity and wind speed data to guide irrigation and harvesting schedules.
*   🤖 **Ask AI Advisor (Multilingual)**: A chat interface where farmers can ask questions in their regional language and get instant, science-backed agricultural advice.
*   📊 **Regional Performance Pulse**: A data-driven dashboard (Radar/Bar charts) comparing regional efficiency to help farmers understand where they stand compared to national benchmarks.

### 2. The "MVP Tech" (The Engine)
*   ⚡ **Gemini 2.5 Flash Integration**: Using LLMs to scrape and structure live agricultural data from the web (eliminating the need for expensive, static database subscriptions).
*   📱 **Responsive Web App**: A mobile-first design that works on low-end smartphones and varying network conditions (2G/3G/4G).
*   🌐 **Multi-Language Support**: English and Hindi support as the baseline for the MVP launch.
*   💾 **MySQL Database Integration**: Secure storage for user profiles and account persistence.

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MySQL Server**

### Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/TanayKapoor21/Agrisage-The-Unified-Ariculture-Platform.git
    cd Agrisage-The-Unified-Ariculture-Platform
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create/Update `.env.local` in the root directory:
    ```env
    GEMINI_API_KEY=your_api_key_here
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=agrisage
    ```

4.  **Database Setup**
    Run the following SQL in your MySQL client:
    ```sql
    CREATE DATABASE agrisage;
    USE agrisage;
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        location VARCHAR(100) NOT NULL,
        farmSize VARCHAR(50),
        primaryCrops TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

5.  **Run the Platform**
    You need to run both the frontend and the backend:

    **Start Backend Server:**
    ```bash
    npm run server
    ```

    **Start Frontend (Vite):**
    ```bash
    npm run dev
    ```

    The app will be available at **http://localhost:3000**.

---

## 🗺️ The Roadmap: Beyond the MVP

To show that AgriSage has "legs," we are planning the following phases:

### Phase 2 (The "Should-Haves")
*   🔍 **Crop Health Scanner**: Integrating CNN (Convolutional Neural Networks) for real-time pest/disease detection via the camera.
*   ♻️ **Stubble Marketplace**: Connecting farmers with biomass energy plants to monetize farm waste.

### Phase 3 (The "Vision")
*   💎 **Carbon Credit Wallet**: A blockchain-linked wallet where farmers earn and trade carbon credits for sustainable practices.
*   🔌 **IoT Integration**: Connecting with low-cost soil sensors for automated "Smart Advisor" suggestions.

---

## 👥 Meet the Team

| Name | Role |
| :--- | :--- |
| **Tanay Kapoor** | Core Developer / AI Integration |
| **Akash Yadav** | Backend Developer / Database |
| **Kanika Yadav** | Frontend Architect / UI Design |
| **Srasthti Chauhan** | Data Analyst / Market Intelligence |

### 📚 Mentorship & Guidance
A special thanks to our mentors for their invaluable guidance:
*   **Dr. Anuradha Dhull**
*   **Asha Sohal**

---

<div align="center">
  <p>Built with ❤️ for the farming community.</p>
  <p>© 2026 AgriSage Team</p>
</div>
