import "./globals.css";
import { UnifrakturMaguntia } from "next/font/google";
import { ReactQueryClientProvider } from "@/utils/react-query";

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
    // Apply the font class globally via the CSS variable
    <html lang="en" className={unifraktur.variable}> 
      <body className="font-sans">
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}