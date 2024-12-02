"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";

// Define interfaces for type safety
interface FormData {
  title: string;
  description: string;
  ticketPrice: string;
  totalTickets: string;
  seatTypes: string;
}

const CreateEvent: React.FC = () => {
  // Initial state for form data
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    ticketPrice: "",
    totalTickets: "",
    seatTypes: "",
  });

  const CONTRACT_ABI= [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        }
      ],
      "name": "addAttendedEvent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "AlreadyRegistered",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_totalTickets",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_ticketPrice",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_seatTypes",
          "type": "string[]"
        }
      ],
      "name": "createEvent",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "InvalidIdentity",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotRegistered",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "eventId",
          "type": "uint256"
        }
      ],
      "name": "EventAttended",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalTickets",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ticketPrice",
          "type": "uint256"
        }
      ],
      "name": "NewEventCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_eventAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_ticketCount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "seatType",
          "type": "string"
        }
      ],
      "name": "purchaseTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "phone",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "displayName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "adharNumber",
          "type": "string"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_eventAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_totalAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "seatType",
          "type": "string"
        }
      ],
      "name": "TicketPurchased",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newDisplayName",
          "type": "string"
        }
      ],
      "name": "updateProfile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "UserUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "eventAddresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "eventMapping",
      "outputs": [
        {
          "internalType": "address",
          "name": "organizer",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "ticketPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalTickets",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ticketsSold",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllEvents",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "organizer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "ticketPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalTickets",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ticketsSold",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "buyers",
              "type": "address[]"
            },
            {
              "internalType": "address[]",
              "name": "waitingList",
              "type": "address[]"
            },
            {
              "internalType": "string[]",
              "name": "seatTypes",
              "type": "string[]"
            }
          ],
          "internalType": "struct TicketingSystem.Event[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_eventAddress",
          "type": "address"
        }
      ],
      "name": "getAttendeeList",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_eventAddress",
          "type": "address"
        }
      ],
      "name": "getAvailableTickets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_eventAddress",
          "type": "address"
        }
      ],
      "name": "getEvent",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "organizer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "ticketPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalTickets",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ticketsSold",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "buyers",
              "type": "address[]"
            },
            {
              "internalType": "address[]",
              "name": "waitingList",
              "type": "address[]"
            },
            {
              "internalType": "string[]",
              "name": "seatTypes",
              "type": "string[]"
            }
          ],
          "internalType": "struct TicketingSystem.Event",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyProfile",
      "outputs": [
        {
          "internalType": "string",
          "name": "displayName",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "attendedEvents",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "lastUpdated",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserProfile",
      "outputs": [
        {
          "internalType": "string",
          "name": "displayName",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "attendedEvents",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "lastUpdated",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfEvents",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "verifyUser",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const CONTRACT_ADDRESS= '0x7E95445986b62a8dDd769f8a3897B0025FDd86bB'  

  // State to track wallet connection
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);

  // Sepolia testnet chain ID
  const SEPOLIA_CHAIN_ID = '0xaa36a7';

  // Contract ABI (you'll need to replace this with the actual ABI)
  

  // Function to check and switch to Sepolia network
  const checkNetwork = async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert("MetaMask is not installed!");
      return false;
    }

    try {
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain:', chainId);

      if (chainId !== SEPOLIA_CHAIN_ID) {
        try {
          // Request to switch to Sepolia
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
          });
        } catch (switchError: any) {
          // If the chain hasn't been added to MetaMask, add it
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: SEPOLIA_CHAIN_ID,
                  chainName: 'Sepolia Testnet',
                  nativeCurrency: {
                    name: 'SepoliaETH',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: ['https://rpc.sepolia.org'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io/']
                }]
              });
            } catch (addError) {
              console.error("Could not add Sepolia network", addError);
              alert("Failed to add Sepolia network. Please add it manually.");
              return false;
            }
          } else {
            console.error(switchError);
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      console.error("Error checking network:", error);
      return false;
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      // Request account access
      await ethereum.request({ method: 'eth_requestAccounts' });
      
      // Verify network
      const networkChecked = await checkNetwork();
      if (networkChecked) {
        setIsWalletConnected(true);
        alert("Wallet connected successfully!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet");
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Create event function
  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure wallet is connected and on correct network
    if (!isWalletConnected) {
      alert("Please connect wallet first!");
      return;
    }

    // Network check
    const networkChecked = await checkNetwork();
    if (!networkChecked) {
      alert("Please switch to Sepolia network!");
      return;
    }

    try {
      const { ethereum } = window as any;
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Prepare transaction parameters
      const totalTickets = parseInt(formData.totalTickets);
      const ticketPriceInWei = ethers.parseEther(formData.ticketPrice);
      const seatTypesArray = formData.seatTypes.split(",").map(type => type.trim());

      // Call contract method to create event
      const tx = await contract.createEvent(
        totalTickets,
        ticketPriceInWei,
        formData.title,
        formData.description,
        seatTypesArray
      );

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log("Event created successfully!", receipt);
      
      // Get the new event address from the transaction receipt
      const eventAddress = receipt.logs[0].address;
      console.log("New Event Address:", eventAddress);

      // Reset form
      setFormData({
        title: "",
        description: "",
        ticketPrice: "",
        totalTickets: "",
        seatTypes: "",
      });

      alert(`Event created successfully! Event Address: ${eventAddress}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Check console for details.");
    }
  };

  // Effect to check network on component mount
  useEffect(() => {
    checkNetwork();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Event on Sepolia</h1>
      
      {!isWalletConnected && (
        <div className="mb-4">
          <button 
            onClick={connectWallet}
            className="w-full p-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Connect Wallet
          </button>
        </div>
      )}

      <form onSubmit={createEvent} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Ticket Price (in ETH)</label>
          <input
            type="number"
            step="0.01"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Total Tickets</label>
          <input
            type="number"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Seat Types (comma-separated)</label>
          <input
            type="text"
            name="seatTypes"
            value={formData.seatTypes}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="e.g., Gold, Silver, Platinum"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isWalletConnected}
          className={`w-full p-2 mt-4 font-semibold rounded ${
            isWalletConnected 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          {isWalletConnected ? 'Create Event' : 'Connect Wallet First'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

