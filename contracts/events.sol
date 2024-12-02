// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract TicketingSystem {
    struct UserIdentity {
        bytes32 emailHash;      // Hash of verified email
        bytes32 phoneHash;      // Hash of verified phone number
        bool isVerified;        // Verification status
    }
    
    struct UserProfile {
        string displayName;     // User's display name
        uint256[] attendedEvents; // Array of event IDs user has attended
        uint256 lastUpdated;    // Timestamp of last update
        bool isActive;          // Account status
    }
    
    // Mapping from user address to identity
    mapping(address => UserIdentity) private userIdentities;
    
    // Mapping from user address to profile
    mapping(address => UserProfile) private userProfiles;
    
    // Mapping to track if email is already used
    mapping(bytes32 => bool) private usedEmails;
    
    // Mapping to track if phone is already used
    mapping(bytes32 => bool) private usedPhones;
    
    // Mapping for Aadhaar number to wallet address
    mapping(bytes32 => address) private adharToWallet;

    // Events
    event UserRegistered(address indexed userAddress);
    event UserUpdated(address indexed userAddress, uint256 timestamp);
    event EventAttended(address indexed userAddress, uint256 indexed eventId);
    event NewEventCreated(uint256 totalTickets, uint256 ticketPrice);
    event TicketPurchased(address _eventAddress, uint256 _totalAmount, string seatType);
    
    // Error messages
    error InvalidIdentity();
    error AlreadyRegistered();
    error NotRegistered();
    
    // Register new user
    function registerUser(
        string memory email,
        string memory phone,
        string memory displayName,
        string memory adharNumber
    ) public {
        // Check if user is already registered
        if (userIdentities[msg.sender].isVerified) {
            revert AlreadyRegistered();
        }
        
        bytes32 emailHash = keccak256(abi.encodePacked(email));
        bytes32 phoneHash = keccak256(abi.encodePacked(phone));
        bytes32 adharHash = keccak256(abi.encodePacked(adharNumber));
        
        // Check if Aadhaar number, email, or phone is already used
        if (adharToWallet[adharHash] != address(0) || usedEmails[emailHash] || usedPhones[phoneHash]) {
            revert AlreadyRegistered();
        }
        
        // Create user identity
        userIdentities[msg.sender] = UserIdentity({
            emailHash: emailHash,
            phoneHash: phoneHash,
            isVerified: true
        });
        
        // Link Aadhaar number to wallet address
        adharToWallet[adharHash] = msg.sender;
        
        // Create user profile
         userProfiles[msg.sender] = UserProfile({
            displayName: displayName,
            attendedEvents: new uint256[](0),
            lastUpdated: block.timestamp,
            isActive: true
        });
        
        // Mark email and phone as used
        usedEmails[emailHash] = true;
        usedPhones[phoneHash] = true;
        
        emit UserRegistered(msg.sender);
    }
    
    // Update user profile
    function updateProfile(string memory newDisplayName) public {
        if (!userIdentities[msg.sender].isVerified) {
            revert NotRegistered();
        }
        
        userProfiles[msg.sender].displayName = newDisplayName;
        userProfiles[msg.sender].lastUpdated = block.timestamp;
        
        emit UserUpdated(msg.sender, block.timestamp);
    }
    
    // Add attended event
    function addAttendedEvent(uint256 eventId) public {
        if (!userIdentities[msg.sender].isVerified) {
            revert NotRegistered();
        }
        
        userProfiles[msg.sender].attendedEvents.push(eventId);
        userProfiles[msg.sender].lastUpdated = block.timestamp;
        
        emit EventAttended(msg.sender, eventId);
    }
    
    // Get user profile
    function getUserProfile(address userAddress) 
        public 
        view 
        returns (
            string memory displayName,
            uint256[] memory attendedEvents,
            uint256 lastUpdated,
            bool isActive
        ) 
    {
        if (!userIdentities[userAddress].isVerified) {
            revert NotRegistered();
        }
        
        UserProfile memory profile = userProfiles[userAddress];
        return (
            profile.displayName,
            profile.attendedEvents,
            profile.lastUpdated,
            profile.isActive
        );
    }
    
    // Get own profile
    function getMyProfile() 
        public 
        view 
        returns (
            string memory displayName,
            uint256[] memory attendedEvents,
            uint256 lastUpdated,
            bool isActive
        ) 
    {
        return getUserProfile(msg.sender);
    }
    
    // Verify if user exists and is active
    function verifyUser(address userAddress) public view returns (bool) {
        return userIdentities[userAddress].isVerified && 
               userProfiles[userAddress].isActive;
    }
    
    // Verify if current user is registered
    function isRegistered() public view returns (bool) {
        return userIdentities[msg.sender].isVerified;
    }

    //************************************************************************************************//
    //******************************Event logic from here*************************************************//
    //************************************************************************************************//

    struct Event {
        address organizer;
        string title;
        string description;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 ticketsSold;
        address[] buyers;
        address[] waitingList;
        string[] seatTypes; // NEW: Added seat types for the event
    }

    uint256 public numberOfEvents;
    address[] public eventAddresses;
    mapping(address => Event) public eventMapping;

    // Create an event with seat types
    function createEvent(
        uint256 _totalTickets, 
        uint256 _ticketPrice,
        string memory _title,
        string memory _description,
        string[] memory _seatTypes // NEW: Accept seat types as input
    ) public returns (address) {
        require(_totalTickets > 0, "Total tickets must be greater than 0.");
        require(userIdentities[msg.sender].isVerified, "Only registered users can create events.");

        bytes32 randomBytes = keccak256(
            abi.encodePacked(
                block.timestamp,
                msg.sender
            )
        );

        address _eventAddress = address(uint160(uint256(randomBytes)));

        Event memory newEvent = Event(
            msg.sender,
            _title,
            _description,
            _ticketPrice,
            _totalTickets,
            0,
            new address[](_totalTickets), 
            new address[](_totalTickets),
            _seatTypes // NEW: Store seat types
        );

        eventMapping[_eventAddress] = newEvent;
        eventAddresses.push(_eventAddress);
        numberOfEvents++;
        emit NewEventCreated(_totalTickets, _ticketPrice);
        return _eventAddress;
    }

    // Get event details
    function getEvent(address _eventAddress) public view returns (Event memory) {
        require(eventMapping[_eventAddress].organizer != address(0), "Event does not exist");
        return eventMapping[_eventAddress];
    }

    // Get all events
    function getAllEvents() public view returns (Event[] memory) {
        Event[] memory events = new Event[](numberOfEvents);
        for (uint256 i = 0; i < numberOfEvents; i++) {
            events[i] = eventMapping[eventAddresses[i]];
        }
        return events;
    }
    
    // Get available tickets for an event
    function getAvailableTickets(address _eventAddress) public view returns (uint256) {
        Event storage _event = eventMapping[_eventAddress];
        require(_event.organizer != address(0), "Event does not exist");
        return _event.totalTickets - _event.ticketsSold;
    }

    // Get attendee list of an event
    function getAttendeeList(address _eventAddress) public view returns (address[] memory) {
        Event storage _event = eventMapping[_eventAddress];
        require(_event.organizer != address(0), "Event does not exist");
        return _event.buyers;
    }

    // Purchase tickets with a seat type selection
    function purchaseTicket(address _eventAddress, uint256 _ticketCount, string memory seatType) public payable {
        require(_ticketCount > 0 && _ticketCount <= 5, "Invalid ticket count");
        require(userIdentities[msg.sender].isVerified, "User not registered");
        
        Event storage _event = eventMapping[_eventAddress];
        require(_event.organizer != address(0), "Event does not exist");
        require(msg.value == _ticketCount * _event.ticketPrice, "Incorrect payment amount");

        // Validate the seat type
        bool validSeatType = false;
        for (uint256 i = 0; i < _event.seatTypes.length; i++) {
            if (keccak256(abi.encodePacked(_event.seatTypes[i])) == keccak256(abi.encodePacked(seatType))) {
                validSeatType = true;
                break;
            }
        }
        require(validSeatType, "Invalid seat type.");

        for (uint256 i = 0; i < _ticketCount; i++) {
            if (_event.totalTickets > _event.ticketsSold) {
                _event.buyers.push(msg.sender);
                _event.ticketsSold += 1;
            } else {
                _event.waitingList.push(msg.sender);
            }
        }

        emit TicketPurchased(_eventAddress, msg.value, seatType);
    }
}
