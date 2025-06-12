'use client';

import Link from 'next/link';
import { useState } from 'react';
interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl?: string;
}

export default function Card({ imageUrl, title, description, linkUrl }: CardProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);


  const cardContent = (
    <div className="relative w-full max-w-md h-96 overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
      {/* Main Image */}
      <img 
        src={imgSrc} 
        alt={title}
        className="absolute w-full h-full object-cover"
        onError={() => setImgSrc('/placeholder-image.jpg')}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-2">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-white/90 text-lg">{description}</p>
      </div>
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