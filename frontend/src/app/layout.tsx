import "./globals.css";
// import { UnifrakturMaguntia } from "next/font/google";
import { Pirata_One } from 'next/font/google'; // 1. Import Pirata One
import { ReactQueryClientProvider } from "@/utils/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Merged metadata, prioritizing the mystical theme
export const metadata = {
  title: "Mystical Splash Screen",
  description: "Mystical entry page with custom gothic fonts and themes.",
};

type LayoutProps = {
  children: React.ReactNode;
};

// Configure the UnifrakturMaguntia font loader
// const unifraktur = UnifrakturMaguntia({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-unifraktur",
// });
const pirataOne = Pirata_One({
  weight: "400", // Pirata One only offers 400 weight
  subsets: ["latin"],
  variable: "--font-pirata-one", // Define the CSS variable
});


export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={pirataOne.variable}>
      <body className={pirataOne.className}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
