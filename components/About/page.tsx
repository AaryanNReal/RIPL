'use client';

import Image from 'next/image';

export function AboutUs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-black font-bold text-oakwood sm:text-4xl">Our Story</h2>
          <div className="mt-4 h-1 w-20 bg-ashwood mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/south.webp" // Replace with your image path
              alt="Our team working together"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-oakwood/20"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Building Excellence Since <span className="text-oakwood">2010</span>
            </h3>
            
            <p className="text-gray-600">
              Founded with a passion for craftsmanship and attention to detail, our team at Oakwood & Ashwood has been delivering exceptional results for over a decade. What began as a small workshop has grown into a trusted name in quality design and construction.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 bg-ashwood rounded-full"></div>
                </div>
                <p className="ml-3 text-gray-600">
                  <span className="font-medium text-oakwood">Our Mission:</span> To create beautiful, functional spaces that stand the test of time while providing exceptional service to our clients.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-5 w-5 bg-ashwood rounded-full"></div>
                </div>
                <p className="ml-3 text-gray-600">
                  <span className="font-medium text-oakwood">Our Values:</span> Integrity, craftsmanship, sustainability, and client satisfaction are at the heart of everything we do.
                </p>
              </div>
            </div>

           
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-4xl text-black font-bold text-oakwood">12+</p>
            <p className="mt-2 text-gray-600">Years Experience</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <p className="text-4xl font-bold text-oakwood">250+</p>
            <p className="mt-2 text-gray-600">Projects Completed</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <p className="text-4xl font-bold text-oakwood">98%</p>
            <p className="mt-2 text-gray-600">Client Satisfaction</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <p className="text-4xl font-bold text-oakwood">15</p>
            <p className="mt-2 text-gray-600">Awards Won</p>
          </div>
        </div>
      </div>
    </section>
  );
}