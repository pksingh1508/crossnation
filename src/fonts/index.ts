import { 
  Geist, 
  Geist_Mono, 
  Inter, 
  Poppins, 
  Montserrat, 
  Open_Sans,
  Roboto,
  Playfair_Display 
} from "next/font/google";

// Original fonts
export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Popular fonts for different use cases

// Inter - Excellent for body text and UI elements
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Poppins - Great for headings and modern designs
export const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

// Montserrat - Perfect for headings and buttons
export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// Open Sans - Highly readable for body text
export const fontOpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

// Roboto - Clean and modern for all purposes
export const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

// Playfair Display - Elegant serif for headings
export const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});
