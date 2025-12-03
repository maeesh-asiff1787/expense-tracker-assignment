💰 Expensify - Smart Expense Tracker

Student Name: Maeesh Asif

Student ID: S1600179

Module: Mobile Applications Development

A modern expense tracking application built with React Native, Expo, and NativeWind.

✨ Key Features

📝 Smart Logging: Add expenses with Title, Amount, Category, and Date.

📅 Backdating: Manually input past dates; list sorts automatically.

📊 Visual Categories: Expenses are automatically tagged with icons (🍔, 🚗, 🛍️).

💾 Data Persistence: User data and expenses are saved permanently on the device.

🔐 Authentication: Simulated login flow (accepts any email address).

📸 Screenshots & Technical Breakdown

Authentication Flow

Main Dashboard

<img src="docs/screenshots/login.jpg" width="250" />

<img src="docs/screenshots/homepage.jpg" width="250" />

Secure Entry Point



This screen demonstrates the app's initial state, guarding user data behind a simulated login. It features a clean, responsive form managed via the global Context API. Once a valid email is entered, the app updates the global user state and redirects to the protected dashboard, preventing unauthorized access to financial data.

Dynamic Visualization



The core hub of the application. It automatically calculates total spending using array reduction logic. The "Spending by Category" section aggregates data in real-time. The list below utilizes FlatList for optimized performance, rendering transactions with specific visual icons (🍔, 🚗) based on the category selected.

Smart Data Entry

Profile & Persistence

<img src="docs/screenshots/add-function.jpg" width="250" />

<img src="docs/screenshots/signout-profile.jpg" width="250" />

Backdating & Logic



A comprehensive form designed for flexibility. Beyond standard title and amount fields, it features a Backdating Input (YYYY-MM-DD), allowing users to log past expenses. The app logic automatically re-sorts the main list chronologically based on this date. Category selectors update the UI state instantly before saving.

Session Management



This screen manages the persistent user session. It displays logged-in user details retrieved directly from AsyncStorage. Critical features include 'Sign Out' (clearing session state) and 'Reset All Data' (wiping local storage), giving users full control over their data footprint on the device.

🚀 How to Run

Clone the repo:

git clone [https://github.com/maeesh-asiff1787/expense-tracker-assignment.git](https://github.com/maeesh-asiff1787/expense-tracker-assignment.git)
cd expense-tracker-assignment



Install dependencies:

npm install



Start the app:

npx expo start -c



Test: Scan the QR code with the Expo Go app on your phone.

🛠️ Tech Stack

Framework: React Native (Expo Router)

Styling: NativeWind (Tailwind CSS)

State: React Context API

Storage: AsyncStorage