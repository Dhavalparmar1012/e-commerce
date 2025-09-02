import React from 'react';
import { SwiperMainContainer } from './SwiperCard.styled';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';

export const images = [
  'images/Mehndi_latest/Bridal_hand/Bridal_hand_1.jpg',
  'images/Mehndi_latest/Bridal_hand/Bridal_hand_5.jpg',
  'images/Mehndi_latest/Bridal_hand/Bridal_hand_6.jpg',
  'images/Mehndi_latest/Bridal_hand/Bridal_hand_10.jpg',
  'images/Mehndi_latest/Bridal_hand/Bridal_hand_12.jpg',
];

const SwiperCard = () => {
  return (
    <SwiperMainContainer>
      <Box className="container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          initialSlide={2}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container"
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Box component="img" src={imageUrl} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </SwiperMainContainer>
  );
};

export default SwiperCard;
