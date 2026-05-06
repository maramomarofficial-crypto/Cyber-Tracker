import "./globals.css";
import Navbar from '@/components/Navbar'; 
export const metadata = {
  title: "Cyber Tracker ",
  description: "track your study",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        {/* EL NAVBAR */}
        <Navbar /> 
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}