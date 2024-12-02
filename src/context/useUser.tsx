'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    walletAddress: string;
    setWalletAddress: (address: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [walletAddress, setWalletAddress] = useState<string>('');

    return (
        <UserContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};