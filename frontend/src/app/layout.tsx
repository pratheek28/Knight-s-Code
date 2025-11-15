import "./globals.css";
import { UnifrakturMaguntia } from "next/font/google";
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
const unifraktur = UnifrakturMaguntia({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-unifraktur', 
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={unifraktur.variable}> 
      <body className={inter.className}>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>

        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}