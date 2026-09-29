import "./globals.css";

export const metadata = {
  title: "Hotel Management Demo - Dynamic Agent | Aura Grand Palace",
  description:
    "Luxury hotel management demo featuring Antigravity 3D spatial aesthetic, floating architecture, and a dynamic Dumb UI / Smart Backend AI agent communicating via n8n webhooks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-midnight-950 text-slate-100 min-h-screen selection:bg-gold-500 selection:text-midnight-950 antialiased">
        {/* Ambient Spatial Lighting Elements */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gold-500/[0.04] blur-[140px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-600/[0.06] blur-[160px] pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
