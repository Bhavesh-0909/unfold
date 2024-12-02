export const contractABI =[
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