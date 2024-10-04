import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaMedium, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-4 mb-4">
            <Link href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-600 hover:text-blue-400 text-2xl transition-colors duration-300" />
            </Link>
            <Link href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-600 hover:text-blue-700 text-2xl transition-colors duration-300" />
            </Link>
            <Link href="https://medium.com/@yourcompany" target="_blank" rel="noopener noreferrer">
              <FaMedium className="text-gray-600 hover:text-black text-2xl transition-colors duration-300" />
            </Link>
            <Link href="https://youtube.com/c/yourcompany" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-gray-600 hover:text-red-600 text-2xl transition-colors duration-300" />
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            © {currentYear} YourCompanyName. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;