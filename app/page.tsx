// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/3rd_Home.jpeg"   // We'll place it in public folder
        alt="Invoice Builder Background"
        fill
        className="object-cover"
        priority
      />
      
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-4 tracking-tight">
          Welcome to <span className="text-blue-400">InvoiceBuilder</span>
        </h1>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Professional invoice management system for your business
        </p>
        <a 
          href="/auth/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}