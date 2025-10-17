import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styled, { keyframes } from "styled-components";
import Rating from "./Rating";
import { motion, useInView } from "framer-motion";

// 🖼️ Image Imports
import jana from "../assets/images/blog/jana.jpg";
import tim from "../assets/images/blog/tim.jpg";
import rachel from "../assets/images/blog/becca.jpg";
import marie from "../assets/images/blog/marie.jpg";
import micheal from "../assets/images/blog/micheal.jpg";
import dan from "../assets/images/blog/dan.jpg";
import achmat from "../assets/images/blog/achmat.png";
import luka from "../assets/images/blog/luka.png";
import noor from "../assets/images/blog/noor.png";
import renad from "../assets/images/blog/renad.png";
import yaasir from "../assets/images/blog/yaasir.png";
import billy from "../assets/images/blog/mampuru.png";
import jones from "../assets/images/blog/jones.png";
import yusra from "../assets/images/blog/yusra.png";
import moz from "../assets/images/blog/moz.png";
import kazi from "../assets/images/blog/Allen and Kazi.png";
import aashish from "../assets/images/blog/Aashish.jpg";
import kresmir from "../assets/images/blog/kresmir.jpg";
import lungi from "../assets/images/blog/lungi.jpg";
import mampuru from "../assets/images/blog/mampuru.jpg";
import gunnar from "../assets/images/blog/mr gunnar.jpg";
import ru from "../assets/images/blog/ru.jpg";
import ruth from "../assets/images/blog/ruth.jpg";
import saad from "../assets/images/blog/saad.jpg";
import sarah from "../assets/images/blog/sarah.jpg";
import tuleen from "../assets/images/blog/tuleen.jpg";
import yasmin from "../assets/images/blog/yasmin.jpg";
import asad from "../assets/images/blog/asad.jpg";
import jodi from "../assets/images/blog/jodi.jpg";
import nicolas from "../assets/images/blog/nicholas.jpg";
import nadine from "../assets/images/blog/nadine.jpg";

// 🧾 Testimonial Data
const testimonials = [
  { cover_photo: kazi, name: "Kazi", title: "England", rating: 5, comment: "Highly recommend touring Cape Town with a local guide than trying to plan all the logistics yourself. Thank you to the team at WhyCapeTown" },
  { cover_photo: yaasir, name: "Yaasir", title: "England", rating: 5, comment: "Cape Town one of the cities that you can never get board of with such great vibes, people, positive energy and endless adventures that can be done apart from the food that you can always enjoy with a reasonable price and all thanks to the best Cape Town tour guide @whycapetown" },
  { cover_photo: jana, name: "Jana", title: "South Africa", rating: 5, comment: "This tour is a must, you get to see the majority of the beautiful spots in Cape Town in one day! Nadeem is great, talking with him was fun and he was very considerate and kind he even helped out another person when his car was out of water. He took amazing pictures of us and of others because he was asked to do so a lot 😂" },
  { cover_photo: dan, name: "Dan", title: "Jaques", rating: 4.7, comment: "An absolute must-do in Cape Town! The tour took us to hidden gems, and I felt like I was in a different world. The Cape Peninsula's beauty is indescribable. If you want a once-in-a-lifetime experience, this is it" },
  { cover_photo: tim, name: "Tim", title: "England", rating: 5, comment: "Nadeem was a great guide! We had an amazing day sightseeing, including a fantastic little stop for fish chips. A very chilled out and relaxing drive in some of the most amazing scenery." },
  { cover_photo: rachel, name: "Rachel", title: "USA", rating: 4, comment: "Good guide. Took us to all the places we wanted to see and talked about some of the history. Provided snacks and water for the trip." },
  { cover_photo: marie, name: "Marie", title: "Netherlands", rating: 4, comment: "Mohammed Nadeem gave us lots of time to enjoy the whole day. He had a comfortable vehicle and great snacks for the road!" },
  { cover_photo: micheal, name: "Micheal", title: "England", rating: 5, comment: "What a perfect tour, gave us a much better appreciation of the beautiful sights of Cape Town and the surrounding areas. It was a packed tour but we never felt rushed and had plenty of time to explore." },
  { cover_photo: achmat, name: "Achmat", title: "England", rating: 5, comment: "Mohamad was a great guide, we booked a Cape Point tour with him and then ended up booking a Stellenbosch tour as well!" },
  { cover_photo: noor, name: "Noor", title: "England", rating: 5, comment: "Everything in Cape Town looks like a wallpaper, what a beautiful city and great food! Thank you to Mohamad our tour guide for keeping us safe." },
  { cover_photo: luka, name: "Luka", title: "England", rating: 5, comment: "The Cape Point tour is must do! Scenic views and some cool spots along the way and even better if you got a private tour with Mohamad as your tour guide!" },
  { cover_photo: renad, name: "Renad", title: "England", rating: 4, comment: "Did a Cape Point Tour with Mohamad as my guide, but you need to pack in clothes for the beach, something to hike and jacket because Cape Town has all 4 seasons in 1 day!" },
  { cover_photo: billy, name: "Billy", title: "England", rating: 5, comment: "Mohamad is my go-to guide and chauffeur driver whenever I come to Cape Town. You can count on WhyCapeTown for a safe, fun and premium service!" },
  { cover_photo: jones, name: "Jones", title: "England", rating: 5, comment: "Thank you Mohamad for a wonderful Cape Point Experience. We even got to swim with some penguins at Boulders Beach!" },
  { cover_photo: yusra, name: "Yusra", title: "England", rating: 5, comment: "We booked a custom Winelands chauffeur drive with WhyCapeTown and Mo took us to some of the most amazing spots you have to visit." },
  { cover_photo: moz, name: "Mozna", title: "England", rating: 5, comment: "I booked a girls trip to Cape Town with my best friend and I booked all my tours with WhyCapeTown. Mo was professional, great photographer and made sure my friend and I were safe!" },
  { cover_photo: aashish, name: "Aashish", title: "England", rating: 5, comment: "We did a custom Stellenbosch Winelands tour and Cape Point on our honeymoon with WhyCapeTown and Mo was fun and professional." },
  { cover_photo: kresmir, name: "Kresmir", title: "Croatia", rating: 5, comment: "Life is all about having the best experiences, and you can’t go wrong with a trip to Cape Town especially if you have WhyCapeTown arrange your tours." },
  { cover_photo: lungi, name: "Lungi", title: "England", rating: 5, comment: "Mo from WhyCapeTown is my go-to chauffeur driver for airport transfers. Trustworthy, kind and reliable!" },
  { cover_photo: gunnar, name: "Gunnar", title: "Germany", rating: 5, comment: "Can always count on Mo to be on time for my airport transfers from Simons Town. Good conversation and trustworthy guy!" },
  { cover_photo: ruth, name: "Ruth", title: "England", rating: 5, comment: "We arranged all our tours with WhyCapeTown: safari drives, Winelands tour, Cape Peninsula tour and airport transfers!" },
  { cover_photo: saad, name: "Saad", title: "Morocco", rating: 5, comment: "5 stars for WhyCapeTown for arranging all of our experiences at the best prices!" },
  { cover_photo: sarah, name: "Sarah", title: "Morocco", rating: 4, comment: "Cape Town is a beautiful city, good food and great people! Thank you WhyCapeTown for the best experience." },
  { cover_photo: tuleen, name: "Tuleen", title: "Syria", rating: 5, comment: "Safe, fun and reliable! Mohamad showed me the best of the Cape! Thank you WhyCapeTown for a trip of a lifetime!" },
  { cover_photo: yasmin, name: "Yasmin", title: "Bahrain", rating: 5, comment: "Cape Town is the best, great weather, food and people! Need to come back to do the garden route!" },
  { cover_photo: nadine, name: "Nadine", title: "Bahrain", rating: 5, comment: "Best tour guide and photographer! Thank you for showing us the best of Cape Town!" },
  { cover_photo: nicolas, name: "Nicolas", title: "Bahrain", rating: 5, comment: "Highly recommend Mohamad from Cape Town for chauffeur services and tours!" },
  { cover_photo: jodi, name: "Jodi", title: "Bahrain", rating: 5, comment: "My go-to chauffeur for years now. Mo gets me there and back safely always. Highly recommend." },
  { cover_photo: asad, name: "Asad", title: "Bahrain", rating: 5, comment: "Mohamad took us to all the top attractions and best restaurants in Cape Town!" }
];

// 💎 Styled Components
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.section`
  margin-top: 60px;
`;

const Heading = styled.h2`
  color: black;
  text-align: center;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeInUp} 0.6s ease both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ClientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;

const ClientImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #d4af37;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ClientName = styled.h5`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111;
`;

const ReviewComment = styled.p`
  font-size: 14px;
  color: #444;
  margin-top: 10px;
  line-height: 1.5;
`;

const Country = styled.span`
  font-size: 13px;
  color: #888;
`;

// ✨ Component
const TestimonialCarousel = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <Wrapper ref={ref}>
      <Heading>What Our Clients Say</Heading>
      <Swiper
        spaceBetween={25}
        breakpoints={{
          0: { slidesPerView: 1 },
          767: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
          1300: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ClientRow>
                <ClientImage src={item.cover_photo} alt={item.name} />
                <ClientInfo>
                  <ClientName>{item.name}</ClientName>
                  <Rating value={item.rating} color="#f8e825" />
                </ClientInfo>
              </ClientRow>
              <ReviewComment>"{item.comment}"</ReviewComment>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default TestimonialCarousel;
