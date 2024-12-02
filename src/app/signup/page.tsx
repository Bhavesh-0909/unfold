'use client';
import React, { useState } from 'react';

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
        console.log({ email, name, aadhar, otp, password, walletAddress });
    };

    const handleotp = async () => {
        if(email === '') {
            alert('Please enter email');
            return;
        }
        console.log(email);
        console.log(process.env.NEXT_PUBLIC_X_API_KEY);
        const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email';
        const options = {
            method: 'POST',
            headers: {
                'X-Api-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
                'Authorization': process.env.NEXT_PUBLIC_X_API_KEY || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        };

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error('Failed to send OTP');
            }
            
            const data = await response.json();
            console.log(data);
            setToken(data.data.token);
            alert('OTP sent successfully');
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('Error sending OTP');
        }
    };

    const verifyOtp = async () => {
        console.log({ email, otp, token });
        const url = 'https://sandbox-api.okto.tech/api/v1/authenticate/email/verify';
        const options = {
            method: 'POST',
            headers: {
                'X-Api-Key': process.env.NEXT_PUBLIC_X_API_KEY || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email, 
                otp, 
                token 
            })
        };

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error('Failed to verify OTP');
            }
            console.log(response);
            
            const data = await response.json();
            console.log(data);
            alert('OTP verified successfully');
        } catch (error) {
            console.error(error);
            alert('Error verifying OTP');
        }
    };

    const connectWallet = async () => {
        // TypeScript-safe check for Ethereum provider
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            try {
                const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setWalletAddress(account);
                alert('Wallet connected successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to connect wallet');
            }
        } else {
            alert('MetaMask is not installed');
        }
    };

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
                                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                            <button 
                                type="button"
                                onClick={handleotp} 
                                className='bg-blue-600 rounded-md px-3 py-2 text-white'
                            >
                                Send Otp
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Aadhar No.:</label>
                        <input
                            type="text"
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">OTP:</label>
                        <div className='w-full flex gap-2'>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                            <button 
                                type="button"
                                onClick={verifyOtp} 
                                className='bg-green-600 rounded-md px-3 py-2 text-white'
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-indigo-200"
                            required
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