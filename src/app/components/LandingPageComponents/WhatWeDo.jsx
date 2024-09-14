"use client";
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Cards from './Cards';
import LectureDemo from './LectureDemo';
import { Card } from 'antd';

const WhatWeDo = () => {
  const sections = [
    { image: '/Landing Image.avif', content: <>
        <div className="p-4 flex justify-center flex-col items-center">
          <div className='mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center'>
            Admins and Instructors Can Add and Manage ClassRoom and Resources
          </div>
        </div>
        <div className='flex gap-2 flex-wrap justify-center flex-shrink shrink'>
          <Cards title={"Physics"} description={"Access The Lectures and Sessions of the Physics class"} avatar={"https://api.dicebear.com/7.x/miniavs/svg?seed=2"}/>
          <Cards title={"Computer"} description={"Access The Computer Science class"} avatar={"https://api.dicebear.com/7.x/miniavs/svg?seed=3"}/>
          <Cards title={"Electronics"} description={"Access The Electronics class content"} avatar={"https://api.dicebear.com/7.x/miniavs/svg?seed=6"}/>
        </div>
        </>},
    { image: '/Landing Image2.jpg', content: 
      <>
                <div className='mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center'>All your Books and Sessions</div>
      <LectureDemo/> 
      </>
  
  },
    { image: '/Landing Image3.avif', content: 
    <div>
      <div className='mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center'>Access Your Lectures</div>
      <Card hoverable
      >
      <img src='/Lecture.png'/>
      </Card>
      </div>  
    },
  ];

  return (
    <div className="flex flex-col space-y-10 overflow-hidden">
      {sections.map((section, index) => (
        <ScrollRevealSection key={index} image={section.image} content={section.content} index={index} />
      ))}
    </div>
  );
};

const ScrollRevealSection = ({ image, content, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const translateDirection = index % 2 === 0 ? '-translate-x-20' : 'translate-x-20';
  const translateClass = inView ? 'translate-x-0' : translateDirection;
  
  return (
    <div ref={ref} className={`flex flex-col md:flex-row justify-between items-center transition-transform duration-700 overflow-hidden ${translateClass}`}>
      {index === 0 ? (
        <>
          <img src={image} alt="" className="w-full md:w-1/2" />
          <div className={`transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
            {content}
          </div>
        </>
      ) : (
        index===1?
        <>
          <img src={image} alt="" className="w-full md:w-1/2 block md:hidden lg:hidden xl:hidden 2xl:hidden sm:block" />
          <div className={`transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'} overflow-hidden w-[100%]`}>
            <div className='p-10'>{content}</div>
          </div>
          <img src={image} alt="" className="w-full md:w-1/2 hidden md:block lg:block xl:block 2xl:block sm:hidden" />
        </>
        :
        <>
          <img src={image} alt="" className="w-full md:w-1/2" />
          <div className={`transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
            {content}
          </div>
        </>
      )}
    </div>
  );
};

export default WhatWeDo;
