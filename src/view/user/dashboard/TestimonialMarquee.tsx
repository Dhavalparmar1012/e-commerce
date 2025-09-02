'use client';
import Marquee from 'react-fast-marquee';
import TestimonialCard from './TestimonialCard';

const TestimonialMarquee = ({ items, direction = 'left' }: { items: any[]; direction?: 'left' | 'right' }) => (
  <Marquee pauseOnHover gradient={false} direction={direction} speed={40}>
    {items.map((item, index) => (
      <TestimonialCard key={index} item={item} />
    ))}
  </Marquee>
);

export default TestimonialMarquee;
