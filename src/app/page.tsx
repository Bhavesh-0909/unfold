"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "@/constants/contractABI"

const HomePage = () => {
  const [events, setEvents] = useState<any[]>([]);

  // Fetch events asynchronously inside useEffect
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(); // Use appropriate Ethereum RPC provider
        const contractAddress = CONTRACT_ADDRESS || "";
        const abi = CONTRACT_ABI;
        const contract = new ethers.Contract(contractAddress, abi, provider);

        const eventsData = await contract.getAllEvents();
        const formattedEvents = eventsData.map((event: any) => ({
          eventId: event.eventId.toString(),
          organizer: event.organizer,
          title: event.title,
          description: event.description,
          ticketPrice: ethers.formatEther(event.ticketPrice),
          totalTickets: event.totalTickets.toString(),
          ticketsSold: event.ticketsSold.toString(),
          imageUrl: event.imageUrl,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Sample events for testing purposes
    const sampleEvents = [
      {
        eventId: "1",
        title: "Art Exhibition",
        description: "An exhibition showcasing the finest art from around the world.",
        ticketPrice: "0.05",
        totalTickets: "1000",
        ticketsSold: "200",
        imageUrl: "https://imgs.search.brave.com/NiMrNVf2Pfj9i9fOhYed48xNRR61Lw72Q757W1dZTGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmlz/dGFydG11c2V1bS5v/cmcvd3AtY29udGVu/dC91cGxvYWRzL01h/Z2RhLW1lZGlhLXBy/ZXZpZXctcGljcy0x/MS5qcGc",
      },
      {
        eventId: "2",
        title: "Tech Conference",
        description: "A cutting-edge technology conference with industry leaders.",
        ticketPrice: "0.03",
        totalTickets: "500",
        ticketsSold: "150",
        imageUrl: "https://imgs.search.brave.com/UD36N_-wmCWg2FwTpkpkWmXG4bA76mN4MlKTUdLt49g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3hzdy5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMDYv/U1hTVzIwMjRfTGlz/YVN1UnlhblBhdGVs/X0tleW5vdGVfVHJh/dmlzUEJhbGxfRWRp/dGVkLTEuanBn",
      },
      {
        eventId: "3",
        title: "Rock Concert",
        description: "A thrilling rock concert with live performances.",
        ticketPrice: "0.02",
        totalTickets: "300",
        ticketsSold: "50",
        imageUrl: "https://imgs.search.brave.com/aD86grPrsuMenm35M-zYz37oBFXEjaVXIegrsiJnHco/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ2/NjM0ODg3L3Bob3Rv/L3JvY2stY29uY2Vy/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9NTU3ZmVHYU1v/eG1VcGRnOHdaQ0J2/T3pQcXlMaC01c1ZI/TW9sRlZDeU9PYz0",
      },
    ];

    setEvents(sampleEvents);

    // Optionally call fetchEvents() if you want to fetch from the smart contract
    // fetchEvents();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <nav className="flex justify-between items-center p-6 bg-gray-800">
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold">BookIT</h1>
        <a href="/music" className="text-gray-300 hover:text-white">
          Music
        </a>
        <a href="/movies" className="text-gray-300 hover:text-white">
          Movies
        </a>
        <a href="/concert" className="text-gray-300 hover:text-white">
          Concert
        </a>
        <a href="/tech" className="text-gray-300 hover:text-white">
          Tech
        </a>
      </div>
  
      <div className="flex items-center space-x-4 relative">
        <input
          type="text"
          placeholder="Search events..."
          className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
          onClick={() => (window.location.href = "/create-event")}
        >
          Create Event
        </button>
        <div className="relative">
          <button
            className="bg-gray-700 px-4 py-2 rounded text-white flex items-center space-x-2 hover:bg-gray-600"
            onClick={() => {
              const dropdown = document.getElementById("profile-dropdown");
              if (dropdown) dropdown.classList.toggle("hidden");
            }}
          >
            <span>Profile</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 9l-7.5 7.5L4.5 9"
              />
            </svg>
          </button>
  
          {/* Dropdown Menu */}
          <div
            id="profile-dropdown"
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg hidden"
          >
            <div className="px-4 py-2 border-b border-gray-700 text-sm">
              <p className="text-gray-300">Name: John Doe</p>
              <p className="text-gray-500 text-xs">
                0x1234...abcd (Sepolia)
              </p>
            </div>
            <a
              href="/profile"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              My Profile
            </a>
            <a
              href="/my-events"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              My Events
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              Settings
            </a>
            <button
              className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
              onClick={() => alert("Logged Out")}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event: {
            eventId: React.Key | null | undefined;
            imageUrl: string | undefined;
            title: string;
            description: string;
            ticketPrice: string;
            ticketsSold: string;
            totalTickets: string;
          }) => (
            <div key={event.eventId} className="bg-gray-800 rounded shadow-md overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{event.title}</h2>
                <p className="text-sm text-gray-400">{event.description}</p>
                <p className="mt-2 text-yellow-400">Price: {event.ticketPrice} ETH</p>
                <p className="text-gray-400">
                  Tickets: {event.ticketsSold}/{event.totalTickets}
                </p>
                <button
            className="mt-4 w-full bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
            onClick={() => (window.location.href = `/concert-page/${event.eventId}`)} // Updated to dynamic route
            >
             View Details
            </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
