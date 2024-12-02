// src/pages/concert-page/[eventId].tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ConcertPage = () => {
  const [eventDetails, setEventDetails] = useState<any>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId;

  useEffect(() => {
    if (!eventId) return;

    setEventDetails({
      id: eventId,
      title: `Concert for Event ID: ${eventId}`,
      description: `This is a sample description for the event with ID ${eventId}.`,
      ticketPrice: 0.1,
    });
  }, [eventId]);

  if (!eventDetails) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">{eventDetails.title}</h1>
        <p>{eventDetails.description}</p>
        <div className="mt-4">
          <strong>Ticket Price:</strong> {eventDetails.ticketPrice} ETH
        </div>

        <div className="purchase-section mt-6">
          <h3 className="text-lg font-bold">Purchase Tickets</h3>
          <button
            onClick={() => alert(`Purchasing tickets for Event ${eventId}`)}
            className="mt-4 bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
          >
            Purchase Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConcertPage;