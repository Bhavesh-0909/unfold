"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ticketPrice: "",
    totalTickets: "",
    seatTypes: "",
    imageUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      // Connect wallet
      const provider = new BrowserProvider(ethereum);
      const signer =await provider.getSigner();

      // Load contract
      const abi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || "[]");
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Convert ticket price to Wei
      const ticketPriceInWei = ethers.parseEther(formData.ticketPrice);

      // Pass seat types as an array
      const seatTypesArray = formData.seatTypes.split(",");

      // Call smart contract
      const tx = await contract.createEvent(
        Number(formData.totalTickets),
        ticketPriceInWei,
        formData.title,
        formData.description,
        seatTypesArray
      );

      await tx.wait();
      alert("Event created successfully!");
      setFormData({ title: "", description: "", ticketPrice: "", totalTickets: "", seatTypes: "", imageUrl: "" });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event. Check the console for details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
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
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Image link for the event"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
