import { Sora, Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-numeric",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "GameZone — Book Sports Facilities",
  description:
    "Book premium sports facilities — turf, football fields, badminton courts, swimming lanes, and tennis courts. Your game, your time, your turf.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="gamezone-dark"
      className={`${sora.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "font-[var(--font-body)]",
          }}
        />
      </body>
    </html>
  );
}
