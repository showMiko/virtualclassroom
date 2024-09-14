"use client"
import React from 'react';
import HeroSection from './components/LandingPageComponents/HeroSection';
import WhatWeDo from './components/LandingPageComponents/WhatWeDo';

const Home = () => {
    return (
      <div className='p-2'>
      <HeroSection/>
      <WhatWeDo/>
    </div>
  );
};

export default Home;
