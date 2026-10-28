
export const destinations = [
  {
    name: "Ooty",
    subtitle: "Nilgiri Hills",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Kodaikanal",
    subtitle: "Pine forests & lakes",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Goa",
    subtitle: "Sun, sand & resorts",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Coorg",
    subtitle: "Coffee plantations",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Puducherry",
    subtitle: "French quarters",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Jaipur",
    subtitle: "The Pink City",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=600&q=85",
  },
];

const roomImages = {
  standard:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
  deluxe:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
  suite:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85",
};

const makeRooms = (hotelId, basePrice) => [
  {
    id: `${hotelId}-standard`,
    name: "Standard Room",
    detail: "2 guests · Comfortable bed · Private bathroom",
    capacity: 2,
    price: basePrice,
    image: roomImages.standard,
    images: [roomImages.standard],
  },
  {
    id: `${hotelId}-deluxe`,
    name: "Deluxe Room",
    detail: "3 guests · Extra space · Premium amenities",
    capacity: 3,
    price: Math.round(basePrice * 1.3),
    image: roomImages.deluxe,
    images: [roomImages.deluxe],
  },
  {
    id: `${hotelId}-suite`,
    name: "Family Suite",
    detail: "4 guests · Spacious suite · Family-friendly comfort",
    capacity: 4,
    price: Math.round(basePrice * 1.7),
    image: roomImages.suite,
    images: [roomImages.suite],
  },
];

const hotelData = [
  {
    id: "ooty-001",
    name: "The Mountain Mist Resort",
    city: "Ooty",
    country: "India",
    location: "Ooty, Tamil Nadu, India",
    price: 4200,
    rating: 4.8,
    reviews: 286,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85",
    description:
      "A peaceful mountain retreat surrounded by the beautiful Nilgiri Hills.",
    amenities: ["Free Wi-Fi", "Mountain View", "Restaurant", "Parking"],
    type: "Resort",
    featured: true,
  },
  {
    id: "ooty-002",
    name: "Nilgiri Heritage Stay",
    city: "Ooty",
    country: "India",
    location: "Ooty, Tamil Nadu, India",
    price: 3200,
    rating: 4.5,
    reviews: 174,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85",
    description:
      "A charming heritage-style stay for couples and families.",
    amenities: ["Free Wi-Fi", "Garden", "Breakfast", "Parking"],
    type: "Heritage Hotel",
    featured: true,
  },
  {
    id: "kodaikanal-001",
    name: "Pine Forest Retreat",
    city: "Kodaikanal",
    country: "India",
    location: "Kodaikanal, Tamil Nadu, India",
    price: 3800,
    rating: 4.7,
    reviews: 213,
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
    description:
      "A cosy hideaway near pine forests and scenic mountain trails.",
    amenities: ["Forest View", "Restaurant", "Free Wi-Fi", "Parking"],
    type: "Resort",
    featured: true,
  },
  {
    id: "kodaikanal-002",
    name: "Lakeview Comfort Suites",
    city: "Kodaikanal",
    country: "India",
    location: "Kodaikanal, Tamil Nadu, India",
    price: 2900,
    rating: 4.4,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    description:
      "A comfortable base for exploring Kodaikanal Lake and the hills.",
    amenities: ["Lake View", "Room Service", "Free Wi-Fi", "Breakfast"],
    type: "Hotel",
    featured: false,
  },
  {
    id: "chennai-001",
    name: "Marina Bay City Hotel",
    city: "Chennai",
    country: "India",
    location: "Chennai, Tamil Nadu, India",
    price: 3600,
    rating: 4.6,
    reviews: 324,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    description:
      "A modern city hotel with convenient access to Chennai attractions.",
    amenities: ["Swimming Pool", "Restaurant", "Free Wi-Fi", "Gym"],
    type: "City Hotel",
    featured: true,
  },
  {
    id: "chennai-002",
    name: "Coromandel Coast Suites",
    city: "Chennai",
    country: "India",
    location: "Chennai, Tamil Nadu, India",
    price: 2800,
    rating: 4.3,
    reviews: 191,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
    description:
      "Relax in a welcoming hotel suited to business and leisure trips.",
    amenities: ["Restaurant", "Airport Transfer", "Free Wi-Fi", "Parking"],
    type: "Hotel",
    featured: false,
  },
  {
    id: "pondicherry-001",
    name: "French Quarter Boutique Stay",
    city: "Puducherry",
    country: "India",
    location: "Puducherry, India",
    price: 3400,
    rating: 4.7,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
    description:
      "A boutique escape near colourful streets, cafés, and the promenade.",
    amenities: ["Courtyard", "Free Wi-Fi", "Breakfast", "Restaurant"],
    type: "Boutique Hotel",
    featured: true,
  },
  {
    id: "coorg-001",
    name: "Coffee Estate Hideaway",
    city: "Coorg",
    country: "India",
    location: "Coorg, Karnataka, India",
    price: 4500,
    rating: 4.8,
    reviews: 267,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=85",
    description:
      "A nature-inspired retreat surrounded by greenery and coffee estates.",
    amenities: ["Garden", "Restaurant", "Nature Trails", "Parking"],
    type: "Resort",
    featured: true,
  },
  {
    id: "munnar-001",
    name: "Emerald Tea Valley Resort",
    city: "Munnar",
    country: "India",
    location: "Munnar, Kerala, India",
    price: 4100,
    rating: 4.7,
    reviews: 248,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    description:
      "Wake up to rolling green hills and the fresh air of tea country.",
    amenities: ["Mountain View", "Restaurant", "Free Wi-Fi", "Parking"],
    type: "Resort",
    featured: false,
  },
  {
    id: "bangalore-001",
    name: "Garden City Grand",
    city: "Bengaluru",
    country: "India",
    location: "Bengaluru, Karnataka, India",
    price: 3900,
    rating: 4.5,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    description:
      "A contemporary stay for business travellers and city explorers.",
    amenities: ["Gym", "Restaurant", "Free Wi-Fi", "Business Centre"],
    type: "Business Hotel",
    featured: false,
  },
  {
    id: "hyderabad-001",
    name: "Deccan Palace Hotel",
    city: "Hyderabad",
    country: "India",
    location: "Hyderabad, Telangana, India",
    price: 3300,
    rating: 4.4,
    reviews: 219,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    description:
      "A comfortable city stay with easy access to dining and landmarks.",
    amenities: ["Restaurant", "Free Wi-Fi", "Parking", "Room Service"],
    type: "City Hotel",
    featured: false,
  },
  {
    id: "goa-001",
    name: "Palm Shore Beach Resort",
    city: "Goa",
    country: "India",
    location: "North Goa, Goa, India",
    price: 5200,
    rating: 4.8,
    reviews: 391,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
    description:
      "A relaxed beachside resort for sunny days and coastal evenings.",
    amenities: ["Beach Access", "Swimming Pool", "Restaurant", "Spa"],
    type: "Beach Resort",
    featured: true,
  },
  {
    id: "mysore-001",
    name: "Royal Heritage Residency",
    city: "Mysuru",
    country: "India",
    location: "Mysuru, Karnataka, India",
    price: 2600,
    rating: 4.3,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    description:
      "A welcoming stay for discovering palaces, markets, and local culture.",
    amenities: ["Restaurant", "Free Wi-Fi", "Parking", "Breakfast"],
    type: "Heritage Hotel",
    featured: false,
  },
  {
    id: "jaipur-001",
    name: "Pink City Haveli",
    city: "Jaipur",
    country: "India",
    location: "Jaipur, Rajasthan, India",
    price: 3700,
    rating: 4.7,
    reviews: 284,
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85",
    description:
      "Experience Rajasthan's colourful heritage in a traditional-style stay.",
    amenities: ["Courtyard", "Restaurant", "Free Wi-Fi", "Cultural Tours"],
    type: "Heritage Hotel",
    featured: false,
  },
  {
    id: "delhi-001",
    name: "Capital Avenue Hotel",
    city: "New Delhi",
    country: "India",
    location: "New Delhi, Delhi, India",
    price: 4300,
    rating: 4.5,
    reviews: 346,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    description:
      "A polished city hotel for sightseeing, shopping, and business travel.",
    amenities: ["Gym", "Restaurant", "Free Wi-Fi", "Airport Transfer"],
    type: "City Hotel",
    featured: false,
  },
  {
    id: "mumbai-001",
    name: "Harbour Lights Hotel",
    city: "Mumbai",
    country: "India",
    location: "Mumbai, Maharashtra, India",
    price: 5600,
    rating: 4.6,
    reviews: 407,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    description:
      "A stylish urban base for exploring Mumbai's waterfront and food scene.",
    amenities: ["City View", "Restaurant", "Gym", "Free Wi-Fi"],
    type: "Luxury Hotel",
    featured: false,
  },
  {
    id: "jaipur-002",
    name: "Desert Rose Retreat",
    city: "Jaisalmer",
    country: "India",
    location: "Jaisalmer, Rajasthan, India",
    price: 3100,
    rating: 4.6,
    reviews: 178,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
    description:
      "A warm desert-inspired stay for exploring forts and golden dunes.",
    amenities: ["Restaurant", "Terrace", "Cultural Tours", "Parking"],
    type: "Heritage Hotel",
    featured: false,
  },
  {
    id: "paris-001",
    name: "Maison Lumière",
    city: "Paris",
    country: "France",
    location: "Paris, France",
    price: 14500,
    rating: 4.8,
    reviews: 521,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    description:
      "A boutique Paris stay near cafés, galleries, and iconic city sights.",
    amenities: ["Free Wi-Fi", "Breakfast", "Concierge", "Room Service"],
    type: "Boutique Hotel",
    featured: true,
  },
  {
    id: "london-001",
    name: "The Kensington House",
    city: "London",
    country: "United Kingdom",
    location: "London, United Kingdom",
    price: 16800,
    rating: 4.7,
    reviews: 462,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
    description:
      "An elegant London base for museums, parks, and neighbourhood dining.",
    amenities: ["Restaurant", "Free Wi-Fi", "Gym", "Concierge"],
    type: "Luxury Hotel",
    featured: false,
  },
  {
    id: "dubai-001",
    name: "Desert Pearl Tower",
    city: "Dubai",
    country: "United Arab Emirates",
    location: "Dubai, United Arab Emirates",
    price: 15200,
    rating: 4.9,
    reviews: 612,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
    description:
      "A modern luxury escape with impressive city views and premium comforts.",
    amenities: ["Swimming Pool", "Spa", "Gym", "Restaurant"],
    type: "Luxury Hotel",
    featured: true,
  },
  {
    id: "bali-001",
    name: "Ubud Jungle Villas",
    city: "Ubud",
    country: "Indonesia",
    location: "Ubud, Bali, Indonesia",
    price: 8900,
    rating: 4.9,
    reviews: 438,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    description:
      "A tropical retreat surrounded by lush landscapes and Balinese charm.",
    amenities: ["Private Pool", "Spa", "Restaurant", "Garden"],
    type: "Villa Resort",
    featured: true,
  },
  {
    id: "singapore-001",
    name: "Marina Garden Hotel",
    city: "Singapore",
    country: "Singapore",
    location: "Singapore",
    price: 13700,
    rating: 4.7,
    reviews: 498,
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85",
    description:
      "A contemporary stay for exploring gardens, shopping, and city attractions.",
    amenities: ["Swimming Pool", "Gym", "Restaurant", "Free Wi-Fi"],
    type: "City Hotel",
    featured: false,
  },
  {
    id: "tokyo-001",
    name: "Sakura Central Stay",
    city: "Tokyo",
    country: "Japan",
    location: "Tokyo, Japan",
    price: 11900,
    rating: 4.6,
    reviews: 387,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
    description:
      "A convenient modern hotel for exploring Tokyo's lively districts.",
    amenities: ["Free Wi-Fi", "Restaurant", "Laundry", "Transit Access"],
    type: "City Hotel",
    featured: false,
  },
  {
    id: "bali-002",
    name: "Seminyak Sunset Resort",
    city: "Seminyak",
    country: "Indonesia",
    location: "Seminyak, Bali, Indonesia",
    price: 9700,
    rating: 4.8,
    reviews: 354,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
    description:
      "A stylish coastal resort close to beach sunsets and local restaurants.",
    amenities: ["Swimming Pool", "Beach Access", "Spa", "Restaurant"],
    type: "Beach Resort",
    featured: false,
  },
  {
    id: "newyork-001",
    name: "Manhattan Skyline Suites",
    city: "New York",
    country: "United States",
    location: "New York, United States",
    price: 19500,
    rating: 4.7,
    reviews: 583,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=85",
    description:
      "A city-centre stay close to famous landmarks, restaurants, and theatres.",
    amenities: ["Gym", "Restaurant", "City View", "Free Wi-Fi"],
    type: "City Hotel",
    featured: false,
  },
  {
    id: "maldives-001",
    name: "Azure Lagoon Resort",
    city: "Malé",
    country: "Maldives",
    location: "Malé, Maldives",
    price: 28000,
    rating: 4.9,
    reviews: 291,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
    description:
      "A tropical island escape with bright lagoons and a relaxed resort atmosphere.",
    amenities: ["Beach Access", "Spa", "Restaurant", "Water Sports"],
    type: "Island Resort",
    featured: true,
  },
  {
    id: "zurich-001",
    name: "Alpine View Residence",
    city: "Zurich",
    country: "Switzerland",
    location: "Zurich, Switzerland",
    price: 21300,
    rating: 4.8,
    reviews: 314,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",
    description:
      "A refined European stay for lake views, mountain excursions, and city walks.",
    amenities: ["Mountain View", "Restaurant", "Free Wi-Fi", "Gym"],
    type: "Boutique Hotel",
    featured: false,
  },
];

export const hotels = hotelData.map((hotel) => ({
  ...hotel,

  // Keep both fields so existing components can use either name.
  pricePerNight: hotel.price,
  imageUrl: hotel.image,

  // Every hotel now has selectable rooms.
  rooms: makeRooms(hotel.id, hotel.price),
}));

export default hotels;
