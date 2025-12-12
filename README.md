# Medicine Management WebApp

A web application to help users, especially elderly people, manage their medicines, track doses, and receive reminders for each medication at the right time.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Firebase Setup](#firebase-setup)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This web application helps users manage their medicines efficiently by providing:

- Timely reminders for each medicine
- Tracking of doses taken
- Easy management of multiple medications
- Notifications and alerts for missed doses

---

## Features

- User registration and authentication
- Add, update, and delete medicines
- Schedule reminders for medicine intake
- Responsive UI built with React.js and Bootstrap
- Firebase backend for authentication, storage, and database

---

## Tech Stack

**Frontend:** HTML, CSS, JavaScript, React.js  
**Backend:** Firebase (Auth, Firestore, Storage)  
**Database:** Firestore  
**Hosting:** Firebase Hosting (optional)  

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore Database**, **Authentication (Email/Password)**, and **Storage**.
3. Copy your Firebase configuration and replace the placeholders in the project:

```javascript
// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
````
4. Save and restart your app.

## Project Structure:
```arch:
├── components/         # Reusable components
│   ├── NewMeds/        # Components for adding new medicines
│   ├── connexion.js    # Login functionality
│   ├── delete.js       # Delete medicine logic
│   ├── firebase.js     # Firebase configuration
│   ├── label.js        # Label components
│   ├── login.js        # Login page
│   ├── modal.js        # Modal dialogs
│   ├── profile.js      # User profile page
│   ├── register.js     # Registration page
│   ├── signInWithGoogle.js
│   ├── signInWithApple.js
│   ├── CSS files       # Stylesheets: connexion.css, modal.css, profile.css, label.css, style.css
│   └── Images          # color2.jpg, user.jpg
│
├── pages/              # App pages
├── Hospital/           # Hospital/doctor related components
├── Home/               # Home page components
├── NewMeds/            # New medicine management components
├── Repay/              # Reimbursement functionality
├── images/             # Assets and images used in the app
├── App.js              # Main React component
├── App.css             # Global app styles
├── App.test.js         # Test cases for the app
├── index.css           # Base styles
└── google.png          # Asset for Google login button
```
## Setup:
## Installation

Clone this repository:

```bash
git clone https://github.com/Elmahfoud-Oul/Medicine_Management_WebApp.git
```

Navigate to the project folder:
```bash
cd Medicine_Management_WebApp
```

Install dependencies:
```bash
npm install
npm start
```

## Special Thanks: 
I want take the chance to thank you the developers made collab for this project 
 **ELMAHFOUD OULHADJ** <br>
  **ELMAHFOUD OULHADJ**<br>
   **MOHAMMED BEN ELMIZI** <br>
    **MOUSSA LAADMI**><br>

## MIT License:

Copyright (c) 2025 El Mahfoud Oulhadj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


