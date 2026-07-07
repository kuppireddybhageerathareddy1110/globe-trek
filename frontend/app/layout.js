import "./globals.css";

export const metadata = {
  title: "GlobeTrek | Cinematic Travel Booking",
  description:
    "Discover curated destinations, build smart itineraries, and book unforgettable trips with GlobeTrek.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
