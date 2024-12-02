'use client';
import React, { useState } from 'react';
import { ethers } from 'ethers';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ email, name, aadhar, otp, password });
    };

    const handleotp = async () => {
        const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email';
        const options = {
          method: 'POST',
          headers: {'X-Api-Key': process.env.NEXT_PUBLIC_X_API_KEY, 'Content-Type': 'application/json'},
          body: `{"email":${email}}`
        }
        
        try {
          const response = await fetch(url, options);
          setToken(response.token);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
    }

    const verifyOtp = async () => {
        const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email/verify';
        const options = {
          method: 'POST',
          headers: {'X-Api-Key': process.env.NEXT_PUBLIC_X_API_KEY, 'Content-Type': 'application/json'},
          body: `{"email":${email},"otp":${otp},"token":${token}}`
        };
    
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setWalletAddress(account);                
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask is not installed');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
                <h1 className="text-2xl font-bold text-center text-white">Signup</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email:</label>
                        <div className='w-full flex gap-2'>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                        <button onClick={handleotp} className='bg-blue-600 rounded-md'>Send Otp</button>
                        </div>
                        
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Aadhar No.:</label>
                        <input
                            type="text"
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
                        >
                            Connect MetaMask
                        </button>
                        {walletAddress && (
                            <p className="mt-2 text-sm text-green-400">Wallet Address: {walletAddress}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;