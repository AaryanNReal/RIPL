'use client';

import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export function ContactInfo() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black text-oakwood sm:text-4xl">Get In Touch</h2>
          <div className="mt-4 h-1 w-20 bg-ashwood mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Here's how you can reach us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Location */}
          

          {/* Contact */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-oakwood/10 mb-4">
              <PhoneIcon className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h3>
            <p className="text-gray-600 mb-1">
              <a href="tel:+11234567890" className="hover:text-oakwood transition-colors">
                +1 (123) 456-7890
              </a>
            </p>
            <p className="text-gray-600">
              <a href="mailto:info@oakwoodashwood.com" className="hover:text-oakwood transition-colors">
                info@oakwoodashwood.com
              </a>
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Emergency: +1 (123) 987-6543</p>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-oakwood/10 mb-4">
              <ClockIcon className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Working Hours</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between max-w-xs mx-auto">
                <span>Monday - Friday</span>
                <span className="text-oakwood font-medium">8am - 6pm</span>
              </li>
              <li className="flex justify-between max-w-xs mx-auto">
                <span>Saturday</span>
                <span className="text-oakwood font-medium">9am - 4pm</span>
              </li>
              <li className="flex justify-between max-w-xs mx-auto">
                <span>Sunday</span>
                <span className="text-ashwood">Closed</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              * Holiday hours may vary
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        
      </div>
    </section>
  );
}