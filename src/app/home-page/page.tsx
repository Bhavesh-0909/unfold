"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      // Connect wallet
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // Load contract
      const abi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || "[]");
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Fetch all events
      const eventsData = await contract.getAllEvents();
      const formattedEvents = eventsData.map((event: any) => ({
        organizer: event.organizer,
        title: event.title,
        description: event.description,
        ticketPrice: ethers.utils.formatEther(event.ticketPrice),
        totalTickets: event.totalTickets.toString(),
        ticketsSold: event.ticketsSold.toString(),
        imageUrl: event.imageUrl, // Assuming this is stored in the contract
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-xl font-bold">Event Manager</h1>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
            onClick={() => (window.location.href = "/create-event")}
          >
            Create Event
          </button>
        </div>
      </nav>

      {/* Categories */}
      <div className="flex justify-center space-x-4 p-6 bg-gray-700">
        <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Music</button>
        <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Tech</button>
        <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Sports</button>
        <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">Education</button>
      </div>

      {/* Events */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="bg-gray-800 rounded shadow-md overflow-hidden">
              {/* Event Image */}
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              {/* Event Details */}
              <div className="p-4">
                <h2 className="text-lg font-bold">{event.title}</h2>
                <p className="text-sm text-gray-400">{event.description}</p>
                <p className="mt-2 text-yellow-400">Price: {event.ticketPrice} ETH</p>
                <p className="text-gray-400">
                  Tickets: {event.ticketsSold}/{event.totalTickets}
                </p>
                <button
                  className="mt-4 w-full bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                  onClick={() => (window.location.href = `/concert-page?eventId=${index}`)}
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
