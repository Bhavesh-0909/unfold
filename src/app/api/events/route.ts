// app/api/events/route.ts
import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET() {
  try {
    const provider = new ethers.JsonRpcProvider(); // Use appropriate Ethereum RPC provider
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
    const abi = process.env.NEXT_PUBLIC_CONTRACT_ABI
      ? JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI)
      : [];
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const eventsData = await contract.getAllEvents();
    const events = eventsData.map((event: any) => ({
      eventId: event.eventId.toString(),
      organizer: event.organizer,
      title: event.title,
      description: event.description,
      ticketPrice: ethers.formatEther(event.ticketPrice),
      totalTickets: event.totalTickets.toString(),
      ticketsSold: event.ticketsSold.toString(),
      imageUrl: event.imageUrl,
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json([]);
  }
}
