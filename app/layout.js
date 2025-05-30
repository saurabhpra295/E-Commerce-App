"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 


// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

export default function Layout({ children }) {
  return (
    <html>
      <body>
    <Provider store={store}>
      <Navbar />
      
      <main>{children}</main>
      <Footer />
    </Provider>
    </body>
    </html>
  );
}

 
