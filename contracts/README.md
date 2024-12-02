### BookIT

**BookIT** is a web application for user authentication and wallet connection. It includes features like OTP-based email verification and MetaMask wallet integration, built with Next.js and React. 

---

## Features
- Email-based OTP authentication
- OTP verification with token handling
- MetaMask wallet connection
- Secure form submission for user details (Name, Aadhaar, etc.)

---

## Tech Stack
- **Frontend:** React, Next.js
- **API Integration:** Fetch API
- **Styling:** TailwindCSS
- **Blockchain:** MetaMask for Ethereum wallet connection
- **Environment Variables:** `.env` file for secure API key handling

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BookIT.git
   cd BookIT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   NEXT_PUBLIC_X_API_KEY=your_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

---

## Folder Structure
```
BookIT/
├── public/
├── src/
│   ├── app/
│   │   └── signup/
│   │       └── page.tsx   # Main Signup Page Component
├── .env                   # Environment Variables
├── package.json
├── tailwind.config.js      # TailwindCSS Configuration
└── README.md               # Documentation
```

---

## Key Features Implementation

### OTP Authentication

1. **Send OTP:**
   The `handleotp` function sends an OTP to the user's email using the Okto API.
   ```typescript
   const handleotp = async () => {
       const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email';
       const options = {
           method: 'POST',
           headers: {
               'X-Api-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ email }),
       };
       const response = await fetch(url, options);
       const data = await response.json();
       setToken(data.token);
   };
   ```

2. **Verify OTP:**
   The `verifyOtp` function validates the OTP with the Okto API.
   ```typescript
   const verifyOtp = async () => {
       const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email/verify';
       const options = {
           method: 'POST',
           headers: {
               'X-Api-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ email, otp, token }),
       };
       const response = await fetch(url, options);
       const data = await response.json();
   };
   ```

### MetaMask Wallet Connection

The `connectWallet` function connects the user's Ethereum wallet.
```typescript
const connectWallet = async () => {
    if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
    } else {
        alert('MetaMask is not installed');
    }
};
```

---

## Environment Variables

| Variable Name         | Description                    |
|-----------------------|--------------------------------|
| `NEXT_PUBLIC_X_API_KEY` | API Key for Okto authentication |

---

## How to Use

1. Enter your email and click **Send OTP**.
2. Input the OTP sent to your email and verify it.
3. Connect your MetaMask wallet.
4. Fill out the required details and click **Signup**.

---

## Screenshots

1. **Signup Page**  
   - User inputs email, name, Aadhaar, OTP, and password.
   - Includes a button to connect MetaMask wallet.
   
   ![Signup Page](https://via.placeholder.com/600x400) *(Add real screenshots)*

---

## Contribution

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Added feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.