export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://globe-trek.onrender.com/api";

export const fallbackDestinations = [
  {
    id: 101,
    name: "Santorini Solar Escape",
    location: "Santorini, Greece",
    description:
      "Cliffside suites, caldera sailing, whitewashed villages, and sunset dinners designed for slow luxury.",
    price: 1899,
    rating: 4.9,
    days: 6,
    nights: 5,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85",
    vibe: "Luxury",
  },
  {
    id: 102,
    name: "Kyoto Lantern Route",
    location: "Kyoto, Japan",
    description:
      "Temple walks, tea ceremonies, bamboo groves, ryokan stays, and chef-led market evenings.",
    price: 2240,
    rating: 4.8,
    days: 7,
    nights: 6,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85",
    vibe: "Culture",
  },
  {
    id: 103,
    name: "Patagonia Edge Trek",
    location: "El Chalten, Argentina",
    description:
      "Glacier viewpoints, guided hikes, basecamp meals, and rugged landscapes with premium logistics.",
    price: 2790,
    rating: 4.95,
    days: 9,
    nights: 8,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
    vibe: "Adventure",
  },
  {
    id: 104,
    name: "Marrakech Atlas Circuit",
    location: "Marrakech, Morocco",
    description:
      "Design riads, souk tastings, desert camps, mountain passes, and artisan-led city immersion.",
    price: 1540,
    rating: 4.7,
    days: 5,
    nights: 4,
    image:
      "https://images.unsplash.com/photo-1539020140153-e8c237112e53?w=1200&q=85",
    vibe: "Culture",
  },
  {
    id: 105,
    name: "Bali Blue Reset",
    location: "Uluwatu, Indonesia",
    description:
      "Surf cliffs, private villas, wellness rituals, waterfall hikes, and beach clubs with flexible pacing.",
    price: 1320,
    rating: 4.85,
    days: 6,
    nights: 5,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=85",
    vibe: "Wellness",
  },
  {
    id: 106,
    name: "Iceland Aurora Loop",
    location: "Reykjavik, Iceland",
    description:
      "Northern lights, geothermal lagoons, ice caves, black-sand beaches, and expert winter routing.",
    price: 2460,
    rating: 4.9,
    days: 8,
    nights: 7,
    image:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&q=85",
    vibe: "Adventure",
  },
];

export async function fetchDestinations(query = "") {
  const endpoint = query
    ? `${API_BASE}/destinations?q=${encodeURIComponent(query)}`
    : `${API_BASE}/destinations`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) && data.length ? data : fallbackDestinations;
  } catch {
    return fallbackDestinations.filter((destination) => {
      const needle = query.toLowerCase();
      return (
        !needle ||
        destination.name.toLowerCase().includes(needle) ||
        destination.location.toLowerCase().includes(needle) ||
        destination.vibe.toLowerCase().includes(needle)
      );
    });
  }
}
