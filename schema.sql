-- AgriSage Database Schema
-- Database Name: Agrisage

CREATE DATABASE IF NOT EXISTS Agrisage;
USE Agrisage;

-- 1. Users Table (Core Auth & Profile)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    farm_size_acres DECIMAL(10,2),
    primary_crops TEXT, -- JSON or comma-separated list
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- 2. Crop Diagnostics Table (Computer Vision / Scanner results)
CREATE TABLE IF NOT EXISTS diagnostics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crop_name VARCHAR(100),
    health_status VARCHAR(50), -- e.g., Healthy, Infected
    infection_stage INT, -- 1-4
    pathogen_category VARCHAR(100), -- Fungal, Bacterial, Viral, etc.
    analysis_details TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Market Intelligence Table (Mandi Prices)
CREATE TABLE IF NOT EXISTS market_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commodity VARCHAR(100) NOT NULL,
    price_per_quintal DECIMAL(10,2) NOT NULL,
    mandi_location VARCHAR(100) NOT NULL,
    price_trend ENUM('up', 'down', 'stable'),
    recorded_date DATE NOT NULL,
    INDEX (commodity, recorded_date)
);

-- 4. Climate Insights Table (Precision Weather & Alerts)
CREATE TABLE IF NOT EXISTS climate_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    alert_type VARCHAR(50), -- e.g., High Temp, Heavy Rain, Humidity High
    severity ENUM('low', 'medium', 'high'),
    advisory TEXT,
    valid_until DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Waste Management Centers (Geospatial data)
CREATE TABLE IF NOT EXISTS waste_centers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    contact_number VARCHAR(20),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    waste_types_accepted TEXT, -- e.g., Stubble, Biomass, Compost
    is_active BOOLEAN DEFAULT TRUE
);

-- 6. Sustainable Portfolio (Carbon Credit Wallet)
CREATE TABLE IF NOT EXISTS carbon_credits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_credits DECIMAL(15,4) DEFAULT 0.0000,
    credits_earned_today DECIMAL(15,4) DEFAULT 0.0000,
    residue_monetized_tonnes DECIMAL(10,2) DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Agricultural Library (Localized Guides)
CREATE TABLE IF NOT EXISTS farming_guides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crop_name VARCHAR(100) NOT NULL,
    language_code VARCHAR(10) DEFAULT 'en', -- en, hi, ta, etc.
    sowing_time TEXT,
    soil_requirements TEXT,
    water_frequency TEXT,
    harvesting_tips TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
