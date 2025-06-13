'use client';

import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  linkUrl?: string;
}

export default function Card({ title, description, linkUrl }: CardProps) {
  const cardContent = (
    <div className="relative w-full max-w-md h-96 overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Moving gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 via-purple-100/10 to-pink-100/10 animate-gradient-x"></div>
      
      {/* Enhanced Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/15 to-white/10 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl" />
      
      {/* Additional glass layer for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-2xl" />
      
      {/* Subtle animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out rounded-2xl"></div>
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col items-start p-8 space-y-6 z-10">
        {/* Title with enhanced styling */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-black/90 drop-shadow-md tracking-tight">
            {title}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-black/70 to-black/40 rounded-full shadow-sm"></div>
        </div>
        
        {/* Description with enhanced styling */}
        <div className=" h-full max-h-[calc(100%-80px)] pr-2 w-full">
          <p className="text-black/80 text-lg max-w-md text-left drop-shadow-sm leading-relaxed line-clamp-8">
            {description} 
            
          </p>
          <p className='text-teal-900 mt-0.5 '>(Click to learn more)</p>
        </div>
      </div>
      
      {/* Subtle highlight effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-transparent to-transparent" />
    </div>
  );

  return linkUrl ? (
    <Link href={linkUrl} className="block hover:no-underline">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}