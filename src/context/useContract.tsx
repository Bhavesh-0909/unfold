'use client';
import React, { useContext, createContext, useState, useEffect } from "react";
import { Contract, BrowserProvider } from "ethers";
import { contractABI, contractAddress } from "@/config/contractABI";

// Define the type for the context value
interface ContractContextType  {
    contract: Contract | null;
    walletAddress: string | undefined;
    setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a more precise type
const ContractContext = createContext<ContractContextType | undefined>(undefined);

interface ContractProviderProps {
    children: React.ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
    const [contract, setContract] = useState<Contract | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | undefined>("");

    useEffect(() => {
        // Create contract instance when signer is available
        const createContractInstance = async () => {
            if (typeof window.ethereum === "undefined") {
                console.warn("MetaMask is not installed. Please install it to connect.");
                alert("MetaMask is not installed. Please install it to connect.");
                return;
            }

            try {
                // Ensure we have a wallet address
                if (!userData.current.walletAddress) {
                    console.warn("Wallet address not found");
                    return;
                }
                // Get the signer (you might need to adjust this based on your wallet connection logic)
                const provider = new BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();

                const network = await provider.getNetwork();
                if (Number(network.chainId) !== 11155111) {
                    alert("You are not connected to the Sepolia testnet. Please switch your network in MetaMask.");
                    console.warn("You are not connected to the Sepolia testnet. Please switch your network in MetaMask.");
                    return;
                }
                setWalletAddress(await signer.getAddress());

                // Create contract instance
                const contractInstance = new Contract(contractAddress, contractABI, signer);
                setContract(contractInstance);
            } catch (error) {
                console.error("Error creating contract instance:", error);
            }
        };

        const createUser = async () => {
            try {
                const tx = await contract.();
                await tx.wait();
                alert("User registered successfully");
            } catch (error) {
                console.error("Error registering user:", error);
            }
        };

        const getUser = async () => {
            try {
                const user = await contract.getUser();
                console.log(user);
            } catch (error) {
                console.error("Error getting user:", error);
            }
        };

        const updateUser = async () => {
            try {
                const tx = await contract.updateUser();
                await tx.wait();
                alert("User updated successfully");
            } catch (error) {
                console.error("Error updating user:", error);
            }
        };

        const 

        createContractInstance();
    }, [userData.current.walletAddress]);

    return (
        <ContractContext.Provider value={{contract, walletAddress, setWalletAddress}}>
            {children}
        </ContractContext.Provider>
    );
};

export const useContract = (): ContractContextType => {
    const context = useContext(ContractContext);
    if (context === undefined) {
        throw new Error("useContract must be used within a ContractProvider");
    }
    return context;
};