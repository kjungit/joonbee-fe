'use client';

import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
type SliderProps = {
  children: ReactNode;
  direction?: boolean;
};
export const AutoSlider = ({ children, direction = false }: SliderProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 8,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true,
    rtl: direction,
  };

  return (
    <Slider className="flex justify-between w-[2000px] h-[120px] font-bold text-sm " {...settings}>
      {children}
    </Slider>
  );
};
