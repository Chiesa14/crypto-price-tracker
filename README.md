# Crypto Price Tracker

The Crypto Price Tracker is a project designed to monitor the real-time prices of various cryptocurrencies, allowing users to stay updated on market fluctuations. Users can set personalized price thresholds to receive alerts when their chosen cryptocurrencies reach specific values, helping them make informed investment decisions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Running](#running)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Chiesa14/crypto-price-tracker.git
```

## Usage

1. **Setup the frondend:**

```bash
cd Frontend
```

```bash
npm install
```

Run the following command to start the frontend:

```bash
npm run dev
```

2. **Setup the backend:**

```bash
cd backend
```

```bash
npm run dev
```

- **Environment Variables**

To configure the application, create a **`.env`** file in the this **Backend** directory with the following variables:

```plaintext
PORT=5000
COINGECKO_API_URL=https://api.coingecko.com/api/v3/coins/markets
CRYPTO_IDS=bitcoin,ethereum,litecoin
CURRENCY=usd
```

Run the following command to start the backend:

```bash
nodemon server.js
```
