'use client';

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import 'tiny-slider/dist/tiny-slider.css';
import Image from 'next/image';

interface Review {
  title: string;
  img: string;
  body: string;
  author: string;
  rating: number;
}

const reviews: Review[] = [
  {
    title: 'A Financial Plan That Finally Made Sense',
    img: '/assets/images/client/01.jpg',
    body: 'Working with Elizabeth Martinez completely changed the way I approach my finances. She created a strategy that fits my goals, and I finally feel confident about my future.',
    author: 'Daniel K',
    rating: 5,
  },
  {
    title: 'Professional and Easy to Work With',
    img: '/assets/images/Ashley Rodriguez.jpg',
    body: "Elizabeth made every investment decision easy to understand. She's responsive, knowledgeable, and genuinely cares about helping her clients succeed financially.",
    author: 'Ashley Rodriguez',
    rating: 5,
  },
  {
    title: 'Outstanding Wealth Management',
    img: '/assets/images/client/02.jpg',
    body: "I've worked with several financial advisors over the years, but none have been as thorough and strategic as Ms. Martinez. My portfolio has never been stronger.",
    author: 'Amanda Brooks',
    rating: 5,
  },
  {
    title: 'Smart Business Financial Advice',
    img: '/assets/images/loreta Afonso.jpg',
    body: "Elizabeth helped me organize my business finances and identify growth opportunities I hadn't considered. The improvements have made a noticeable difference.",
    author: 'Loreta Afonso',
    rating: 5,
  },
  {
    title: 'Peace of Mind for My Family',
    img: '/assets/images/client/sara.jpg',
    body: "From retirement planning to tax strategies, Elizabeth provided practical advice that gave my family real financial security. I couldn't be happier with the results.",
    author: 'Sarah Mitchell',
    rating: 5,
  },
  {
    title: 'Life-Changing Financial Coaching',
    img: '/assets/images/frank.jpg',
    body: "I went from constantly worrying about debt to having a clear savings plan and financial confidence. Ms. Martinez's guidance has been truly life-changing.",
    author: 'Frank Adams',
    rating: 5,
  },
  {
    title: 'Consistent Results Over Time',
    img: '/assets/images/client/06.jpg',
    body: "What I appreciate most is Elizabeth's long-term approach. Her recommendations have consistently helped me grow my investments while managing risk effectively.",
    author: 'James Bennett',
    rating: 5,
  },
  {
    title: 'Reliable Investment Guidance',
    img: '/assets/images/peter.jpg',
    body: 'Every recommendation Elizabeth has made has been backed by solid research and thoughtful planning. I trust her judgment completely when it comes to my investments.',
    author: 'Peter Daniels',
    rating: 5,
  },
  {
    title: 'Worth Every Conversation',
    img: '/assets/images/client/03.jpg',
    body: "Ms. Martinez explains complex financial topics in a way that's easy to understand. Thanks to her advice, I've reached milestones I didn't think were possible.",
    author: 'Sophia Lewis',
    rating: 5,
  },
];
const settings = {
  container: '.tiny-two-item',
  controls: true,
  mouseDrag: true,
  loop: true,
  rewind: true,
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayTimeout: 3000,
  navPosition: 'bottom',
  controlsText: [
    '<svg stroke="currentColor" class="h-4 w-4 m-auto" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>',
    '<svg stroke="currentColor" class="h-4 w-4 m-auto" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>',
  ],
  nav: false,
  speed: 400,
  gutter: 0,
  responsive: {
    768: {
      items: 2,
    },
  },
};

interface StarIconProps {
  className?: string;
}

function StarIcon(props: StarIconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const Testimonials: React.FC = () => {
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      require('tiny-slider/src/tiny-slider').tns(settings);
    }
    isMounted.current = false;
  }, []);

  return (
    <section className="relative md:py-24 py-16 bg-zinc-50" id="testi">
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h6 className="text-[#0F8EC7] text-base font-medium uppercase mb-2">Testimonial</h6>
          <h3 className="mb-4 md:text-2xl text-xl font-medium">Client&apos;s Review</h3>
        </div>

        <div className="grid grid-cols-1 mt-8 relative">
          <div className="tiny-two-item">
            {reviews.map(({ author, body, rating, img }, idx) => (
              <div key={idx} className="tiny-slide">
                <div className="lg:flex p-6 lg:p-0 relative rounded-md shadow shadow-slate-200 bg-white overflow-hidden m-2">
                  <Image
                    className="w-24 h-24 lg:w-48 lg:h-auto lg:rounded-none rounded-full mx-auto object-cover object-center"
                    src={img}
                    alt=""
                    width={384}
                    height={512}
                  />
                  <div className="pt-6 lg:p-6 text-center lg:text-left space-y-4">
                    <p className="text-base text-slate-500">{body}</p>

                    <div>
                      <span className="text-[#0F8EC7] block mb-1">{author}</span>
                      <span className="flex justify-center lg:justify-start">
                        {Array.from({ length: 5 }, (_, index) => (
                          <StarIcon
                            key={index}
                            className={clsx(
                              'h-5 w-5',
                              rating > index ? 'fill-orange-300' : 'fill-gray-300'
                            )}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
