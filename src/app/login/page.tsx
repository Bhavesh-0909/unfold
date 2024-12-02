'use client';
import { useUser } from '@/context/useUser';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

declare global {
    interface Window {
        ethereum: any;
    }
}

const LoginPage: React.FC = () => {
    const {setWalletAddress} = useUser();
    const router = useRouter();

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                router.push('/');
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
            <button
                className="bg-blue-600 px-4 py-2 w-36 h-10 rounded text-white hover:bg-blue-700"
                onClick={connectWallet}
            >Connect wallet</button>
        </div>
    );
};

export default LoginPage;