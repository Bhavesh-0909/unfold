"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const HomePage = () => {
  const [events, setEvents] = useState<any[]>([]);

  // Fetch events asynchronously inside useEffect
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(); // Use appropriate Ethereum RPC provider
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
        const abi = process.env.NEXT_PUBLIC_CONTRACT_ABI
          ? JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI)
          : [];
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
        title: "Rock Concert",
        description: "A thrilling rock concert with live performances.",
        ticketPrice: "0.05",
        totalTickets: "1000",
        ticketsSold: "200",
        imageUrl: "https://example.com/rock-concert.jpg",
      },
      {
        eventId: "2",
        title: "Tech Conference",
        description: "A cutting-edge technology conference with industry leaders.",
        ticketPrice: "0.03",
        totalTickets: "500",
        ticketsSold: "150",
        imageUrl: "https://example.com/tech-conference.jpg",
      },
      {
        eventId: "3",
        title: "Art Exhibition",
        description: "An exhibition showcasing the finest art from around the world.",
        ticketPrice: "0.02",
        totalTickets: "300",
        ticketsSold: "50",
        imageUrl: "https://example.com/art-exhibition.jpg",
      },
    ];

    setEvents(sampleEvents);

    // Optionally call fetchEvents() if you want to fetch from the smart contract
    // fetchEvents();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
