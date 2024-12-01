'use client';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Error connecting to Metamask", error);
            }
        } else {
            alert('Metamask not detected. Please install Metamask extension.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-4xl mb-8">Login Page</h1>
            {account ? (
                <p className="text-xl">Connected account: {account}</p>
            ) : (
                <button 
                    onClick={connectWallet} 
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Connect Metamask Wallet
                </button>
            )}
        </div>
    );
};

export default LoginPage;