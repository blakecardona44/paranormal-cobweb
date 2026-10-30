'use client';

import React, { ReactNode } from 'react';
import Footer from 'src/components/landing-pages-main/Footer';
import Navbar from 'src/components/landing-pages-main/Navbar';
import WhatsappFloatButton from 'src/components/WhatsappFloatButton';
import JivoChat from 'src/components/JivoChat';

interface LandingLayoutProps {
  children: ReactNode;
  isSticky?: boolean;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="relative bg-[#F2F2F2]">
      <Navbar />
      {children}
      <WhatsappFloatButton />
      <JivoChat />
      <Footer />
    </div>
  );
};

export default LandingLayout;
