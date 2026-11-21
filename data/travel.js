
window.TRAVEL_DATA = {
  overview: {
    title: "The journey, connected",
    subtitle: "Every transfer, stay and booking in one place",

    
timeline: [
      {
        date: "Friday, December 4",
        title: "Arrivals in Bangkok",
        type: "flight",
        status: "confirmed",
        details: "Suraj arrives from Bhubaneswar at 6:00 PM; Garima arrives from Bengaluru at 3:20 PM.",
        note: "Separate non-stop flights into Suvarnabhumi Airport (BKK). Meet at the airport before travelling to Khaosan."
      },
      {
        date: "Friday, December 4",
        title: "Bangkok → Chiang Mai",
        type: "bus",
        status: "confirmed",
        details: "Overnight bus from Khaosan Next Step Journey Office to Chiang Mai Bus Terminal 3",
        departure: "9:00 PM",
        arrival: "7:30 AM, December 5",
        note: "Arrival time is tentative. Keep the bus ticket accessible and confirm the arrival details with the operator."
      },
      {
        date: "Saturday, December 5",
        title: "Arrive in Chiang Mai",
        type: "arrival",
        status: "confirmed",
        details: "Arrival at Chiang Mai Bus Terminal 3",
        note: "Proceed to ibis Styles Chiang Mai. Confirm early check-in or luggage storage."
      },
      {
        date: "December 5–9",
        title: "Chiang Mai & Northern Thailand",
        type: "stay",
        status: "confirmed",
        details: "Four nights at ibis Styles Chiang Mai",
        note: "Use the hotel as the base for the northern Thailand itinerary. Arrange luggage storage before checkout on December 9."
      },
      {
        date: "Wednesday, December 9",
        title: "Chiang Mai → Bangkok",
        type: "flight",
        status: "confirmed",
        details: "Thai AirAsia FD 3426 · Chiang Mai (CNX) → Don Mueang (DMK)",
        departure: "9:20 PM",
        arrival: "10:40 PM",
        note: "Leave for Chiang Mai Airport around 6:00–6:30 PM after collecting luggage. Bangkok arrival is at Don Mueang Airport (DMK)."
      },
      {
        date: "December 9–13",
        title: "Bangkok",
        type: "stay",
        status: "to-confirm",
        details: "Four nights in Bangkok",
        note: "The holiday continues in Bangkok. Accommodation and the city itinerary are to be added."
      },
      {
        date: "Sunday, December 13",
        title: "Bangkok → Bhubaneswar",
        type: "flight",
        status: "confirmed",
        details: "IndiGo 6E 1066 · Suvarnabhumi (BKK) → Bhubaneswar (BBI)",
        departure: "10:15 AM",
        arrival: "11:35 AM",
        note: "Check-in closes at 9:00 AM. Allow sufficient time to reach Suvarnabhumi Airport."
      }
    ]
  },

  flights: [
    {
      id: "bbi-bkk",
      title: "Bhubaneswar → Bangkok",
      date: "Friday, December 4",
      route: {
        from: "Bhubaneswar (BBI · Terminal 2)",
        to: "Suvarnabhumi (BKK)"
      },
      departure: "1:50 PM",
      arrival: "6:00 PM",
      airline: "IndiGo",
      flightNumber: "6E 1065",
      status: "confirmed",
      passengers: ["Suraj"],
      baggage: "7 kg cabin + 20 kg check-in",
      notes: [
        "Non-stop flight · 2 hours 40 minutes.",
        "Check-in closes at 12:35 PM.",
        "A320 aircraft."
      ]
    },
    {
      id: "blr-bkk",
      title: "Bengaluru → Bangkok",
      date: "Friday, December 4",
      route: {
        from: "Bengaluru (BLR · Terminal 2)",
        to: "Suvarnabhumi (BKK)"
      },
      departure: "9:45 AM",
      arrival: "3:20 PM",
      airline: "Air India Express",
      flightNumber: "IX 896",
      status: "confirmed",
      passengers: ["Garima"],
      baggage: "7 kg cabin + 20 kg check-in",
      notes: [
        "Non-stop flight · 4 hours 5 minutes.",
        "Garima arrives separately from Suraj."
      ]
    },
    {
      id: "cnx-dmk",
      title: "Chiang Mai → Bangkok",
      date: "Wednesday, December 9",
      route: {
        from: "Chiang Mai (CNX · Terminal 2)",
        to: "Don Mueang (DMK · Terminal 2)"
      },
      departure: "9:20 PM",
      arrival: "10:40 PM",
      airline: "Thai AirAsia",
      flightNumber: "FD 3426",
      status: "confirmed",
      passengers: ["Suraj", "Garima"],
      baggage: "Suraj: 15 kg check-in · Garima: 20 kg check-in",
      notes: [
        "Non-stop flight · 1 hour 20 minutes.",
        "Suraj: seat 25F.",
        "Garima: seat 25E.",
        "7 kg cabin baggage each.",
        "Both passengers have Zero Change Fee add-ons and insurance.",
        "Arrives at Don Mueang, not Suvarnabhumi."
      ]
    },
    {
      id: "bkk-bbi",
      title: "Bangkok → Bhubaneswar",
      date: "Sunday, December 13",
      route: {
        from: "Suvarnabhumi (BKK)",
        to: "Bhubaneswar (BBI · Terminal 2)"
      },
      departure: "10:15 AM",
      arrival: "11:35 AM",
      airline: "IndiGo",
      flightNumber: "6E 1066",
      status: "confirmed",
      passengers: ["Suraj"],
      baggage: "7 kg cabin + 20 kg check-in",
      notes: [
        "Non-stop flight · 2 hours 50 minutes.",
        "Check-in closes at 9:00 AM.",
        "A320 aircraft."
      ]
    }
  ],


  buses: [
    {
      id: "bkk-cnx",
      title: "Bangkok → Chiang Mai",
      date: "Friday, December 4",
      operator: "Next Step Journey",
      departure: {
        location: "Khaosan Next Step Journey Office, Bangkok",
        time: "9:00 PM"
      },
      arrival: {
        location: "Chiang Mai Bus Terminal 3",
        time: "7:30 AM, December 5"
      },
      passengers: 2,
      status: "confirmed",
      notes: [
        "Overnight bus journey.",
        "Two tickets booked.",
        "Arrival time is estimated; confirm with the operator.",
        "Keep the booking confirmation accessible before boarding."
      ]
    }
  ],


  accommodation: [
    {
      id: "chiang-mai-hotel",
      city: "Chiang Mai",
      name: "ibis Styles Chiang Mai",
      checkIn: "Saturday, December 5",
      checkOut: "Wednesday, December 9",
      nights: 4,
      address: "",
      bookingReference: "",
      status: "confirmed",
      website: "https://all.accor.com/hotel/8108/index.en.shtml",
      document: "",
      notes: [
        "Confirm early check-in or luggage storage on arrival.",
        "Arrange luggage storage after checkout on December 9.",
        "Collect luggage before leaving for the airport."
      ]
    }
  ],

  transfers: [   
    {
      id: "bkk-khaosan",
      title: "Suvarnabhumi Airport → Khaosan",
      date: "Friday, December 4",
      type: "self-arranged",
      status: "to-arrange",
      pickup: "Suvarnabhumi Airport (BKK)",
      destination: "Khaosan Next Step Journey Office",
      notes: [
        "Choose Bolt or Airport Rail Link / public transport.",
        "Garima arrives at 3:20 PM; Suraj arrives at 6:00 PM.",
        "Allow time for immigration, baggage collection and the airport transfer.",
        "Reach the bus departure point before 9:00 PM."
      ]
    },
    {
      id: "mae-kampong",
      title: "Mae Kampong day trip",
      date: "Sunday, December 6",
      type: "private-car",
      status: "to-book",
      pickup: "ibis Styles Chiang Mai",
      destination: "Mae Kampong Village",
      notes: ["Confirm pickup time and return arrangements."]
    },
    {
      id: "doi-inthanon",
      title: "Doi Inthanon day trip",
      date: "Monday, December 7",
      type: "private-car",
      status: "to-book",
      pickup: "ibis Styles Chiang Mai",
      destination: "Doi Inthanon National Park",
      notes: [
        "Confirm Kew Mae Pan guided trail arrangements.",
        "Confirm the car covers all planned stops."
      ]
    },
    {
      id: "chiang-rai",
      title: "Chiang Rai day trip",
      date: "Tuesday, December 8",
      type: "private-car",
      status: "to-book",
      pickup: "ibis Styles Chiang Mai",
      destination: "Chiang Rai",
      notes: [
        "Confirm all four planned stops with the driver.",
        "Allow time for the White Temple costume photoshoot."
      ]
    },
    {
      id: "mon-jam",
      title: "Optional Mon Jam excursion",
      date: "Wednesday, December 9",
      type: "private-car",
      status: "optional",
      pickup: "ibis Styles Chiang Mai",
      destination: "Mon Jam and Ying Yong Flower Garden",
      notes: [
        "Not part of the default itinerary.",
        "Consider only if energy, weather and transport arrangements allow.",
        "Arrange a guaranteed return to Chiang Mai by mid-afternoon.",
        "Do not compromise the 6:00–6:30 PM airport departure buffer.",
        "Alpaca Sheep Farm is included."
      ]
    },
    {
      id: "chiang-mai-airport",
      title: "Hotel → Chiang Mai Airport",
      date: "Wednesday, December 9",
      type: "airport-transfer",
      status: "to-arrange",
      pickup: "ibis Styles Chiang Mai",
      destination: "Chiang Mai International Airport",
      departure: "Around 6:00–6:30 PM",
      notes: [
        "Collect stored luggage from the hotel before departure.",
        "Keep the airport departure buffer protected.",
        "Thai AirAsia FD 3426 departs at 9:20 PM from Terminal 2.",
        "The flight arrives at Don Mueang Airport (DMK), Bangkok."
      ]
    },
  ],

  documents: {
    introduction: "Keep your travel documents organised and accessible.",

    categories: [
      {
        id: "identity",
        title: "Identity & entry",
        items: [
          {
            id: "passport",
            title: "Passport",
            status: "to-add",
            file: ""
          },
          {
            id: "tdac",
            title: "Thailand Digital Arrival Card (TDAC)",
            status: "to-complete",
            file: ""
          },
          {
            id: "visa",
            title: "Visa / entry documentation",
            status: "to-check",
            file: ""
          }
        ]
      },
      {
        id: "transport",
        title: "Transport tickets",
        items: [
          {
            id: "bus-ticket",
            title: "Bangkok → Chiang Mai bus ticket",
            status: "to-add",
            file: ""
          },
          {
            id: "flight-ticket",
            title: "Chiang Mai → Bangkok flight ticket",
            status: "to-add",
            file: ""
          }
        ]
      },
      {
        id: "stays",
        title: "Accommodation vouchers",
        items: [
          {
            id: "cm-hotel-voucher",
            title: "Chiang Mai hotel voucher",
            status: "to-add",
            file: ""
          },
          {
            id: "bkk-hotel-voucher",
            title: "Bangkok hotel voucher",
            status: "to-add",
            file: ""
          }
        ]
      },
      {
        id: "other",
        title: "Other essentials",
        items: [
          {
            id: "insurance",
            title: "Travel insurance",
            status: "to-add",
            file: ""
          },
          {
            id: "bookings",
            title: "Tour and transfer confirmations",
            status: "to-add",
            file: ""
          }
        ]
      }
    ]
  }
};
