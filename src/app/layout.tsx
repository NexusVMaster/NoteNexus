import ClerkConvexProvider from "@/components/ClerkConvexProvider";
import "../styles/globals.css"; // Tailwind or global CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkConvexProvider>
          {children}
        </ClerkConvexProvider>
      </body>
    </html>
  );
}