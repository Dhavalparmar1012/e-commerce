import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const SwiperMainContainer = styled(Box)(({ theme }) => ({
  '& .container': {
    maxWidth: '124rem !important',
    margin: '0 auto !important',
  },
  '& .heading': {
    padding: '1rem 0 !important',
    fontSize: '3.5rem !important',
    textAlign: 'center !important',
  },
  '& .swiper_container': {
    height: '30rem !important',
    padding: '1rem 0 !important',
    position: 'relative !important',
  },
  '& .swiper-slide': {
    width: '592px !important',
    height: '672px !important',
    position: 'relative !important',
    '& img': {
      width: '592px !important',
      height: '460px !important',
      borderRadius: '60px !important',
      objectFit: 'cover !important',
    },
  },

  [theme.breakpoints.down(787)]: {
    '& .swiper-slide': {
      width: '400px !important',
      '& img': {
        width: '400px !important',
      },
    },
  },

  '& .swiper-slide-shadow-left, & .swiper-slide-shadow-right': {
    display: 'none !important',
  },
  '& .slider-controler': {
    position: 'relative !important',
    bottom: '2rem !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    '& .swiper-button-next': {
      left: '58% !important',
      transform: 'translateX(-58%) !important',
    },
    '& .swiper-button-prev': {
      left: '42% !important',
      transform: 'translateX(-42%) !important',
    },
    '& .slider-arrow': {
      background: 'var(--white) !important',
      width: '3.5rem !important',
      height: '3.5rem !important',
      borderRadius: '50% !important',
      filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1)) !important',
      '& ion-icon': {
        fontSize: '2rem !important',
        color: '#222224 !important',
      },
    },
  },
  '& .swiper-pagination': {
    position: 'relative !important',
    width: '15rem !important',
    bottom: '1rem !important',
    '& .swiper-pagination-bullet': {
      filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1)) !important',
    },
    '& .swiper-pagination-bullet-active': {
      background: 'var(--primary) !important',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .swiper_container': {
      height: '26rem !important',
    },
    '& .swiper-slide': {
      width: '250px !important',
      height: '365px !important',
      '& img': {
        width: '250px !important',
        height: '365px !important',
        borderRadius: '14px !important',
      },
    },
    '& .slider-controler .swiper-button-next': {
      left: '80% !important',
      transform: 'translateX(-80%) !important',
    },
    '& .slider-controler .swiper-button-prev': {
      left: '20% !important',
      transform: 'translateX(-20%) !important',
    },
  },
  [theme.breakpoints.up(1028)]: {
    '& .swiper-slide.swiper-slide-prev.swiper-slide-visible': {
      transitionDuration: '0ms',
      transform: 'translate3d(298px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -2,
    },
    '& .swiper-slide.swiper-slide-visible.swiper-slide-next': {
      transitionDuration: '0ms',
      transform: 'translate3d(-298px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -1,
    },
  },
  [theme.breakpoints.down(1028)]: {
    '& .swiper-slide.swiper-slide-prev.swiper-slide-visible': {
      transitionDuration: '0ms',
      transform: 'translate3d(298px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -2,
    },
    '& .swiper-slide.swiper-slide-visible.swiper-slide-next': {
      transitionDuration: '0ms',
      transform: 'translate3d(-298px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -1,
    },
  },
  [theme.breakpoints.down(775)]: {
    '& .swiper-slide.swiper-slide-prev.swiper-slide-visible': {
      transitionDuration: '0ms',
      transform: 'translate3d(165px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -2,
    },
    '& .swiper-slide.swiper-slide-visible.swiper-slide-next': {
      transitionDuration: '0ms',
      transform: 'translate3d(-165px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -1,
    },
  },
  [theme.breakpoints.down(430)]: {
    '& .swiper-slide.swiper-slide-prev.swiper-slide-visible': {
      transitionDuration: '0ms',
      transform: 'translate3d(138px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -2,
    },
    '& .swiper-slide.swiper-slide-visible.swiper-slide-next': {
      transitionDuration: '0ms',
      transform: 'translate3d(-138px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -1,
    },
  },
  [theme.breakpoints.down(380)]: {
    '& .swiper-slide.swiper-slide-prev.swiper-slide-visible': {
      transitionDuration: '0ms',
      transform: 'translate3d(169px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -2,
    },
    '& .swiper-slide.swiper-slide-visible.swiper-slide-next': {
      transitionDuration: '0ms',
      transform: 'translate3d(-168px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -1,
    },
  },
  [theme.breakpoints.down(325)]: {
    '& .swiper-slide': {
      width: '230px !important',
      height: '355px !important',
      '& img': {
        width: '230px !important',
        height: '355px !important',
      },
    },
    '& .swiper-slide.swiper-slide-prev.swiper-slide-visible': {
      transitionDuration: '0ms',
      transform: 'translate3d(171px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -2,
    },
    '& .swiper-slide.swiper-slide-visible.swiper-slide-next': {
      transitionDuration: '0ms',
      transform: 'translate3d(-170px, 0px, -250px) rotateX(0deg) rotateY(0deg) scale(1) !important',
      zIndex: -1,
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .slider-controler .swiper-button-next': {
      left: '70% !important',
      transform: 'translateX(-70%) !important',
    },
    '& .slider-controler .swiper-button-prev': {
      left: '30% !important',
      transform: 'translateX(-30%) !important',
    },
  },
}));
