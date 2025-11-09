import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

// 💚 Animations
const breathe = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
`;

// 🧱 Styled Components
const OfferWrapper = styled.div`
  background: transparent;
  border-radius: 20px;
  padding: 50px 20px;
  margin: 40px auto;
  text-align: center;
  max-width: 700px;
  color: white;
  transition: all 0.5s ease;
`;

const Heading = styled.h1`
  background: black;
  color: white;
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 24px;
  margin-bottom: 25px;
  opacity: ${(props) => (props.fadeOut ? 0 : 1)};
  transition: opacity 1s ease;
`;

const SubHeading = styled.h3`
  background: black;
  color: white;
  display: block;
  width: fit-content;
  margin: 0 auto 12px auto;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
`;

const PriceCard = styled.div`
  background-color: ${(props) =>
    props.expired ? "#555" : props.type === "red" ? "#d61f30" : "#1e7b4d"};
  color: white;
  padding: 45px 50px;
  border-radius: 20px;
  text-align: center;
  display: block;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.4);
  margin: 20px auto;
  width: 340px;
  animation: ${(props) =>
    props.type === "green" && !props.expired
      ? css`${breathe} 4s infinite`
      : "none"};

  @media (max-width: 480px) {
    width: 90%;
    padding: 35px 20px;
  }
`;

const Price = styled.div`
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DigitBox = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 10px 12px;
  min-width: 35px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  margin: 2px;
`;

const TimerWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: black;
`;

const TimerCard = styled.div`
  background: black;
  color: white;
  border-radius: 8px;
  padding: 12px 18px;
  min-width: 55px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
`;

const Availability = styled.p`
  color: #d4af37;
  margin-top: 15px;
  font-size: 16px;
`;

// 🧠 Component
const PricingOfferCard = ({
  price,
  discountedPrice,
  offerDuration,
  experienceId,
  isDealActive = true, // toggle prop
}) => {
  const [timeLeft, setTimeLeft] = useState(offerDuration);
  const [expired, setExpired] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // 🕒 Timer Logic (only runs when deal is active)
  useEffect(() => {
    if (!isDealActive) return; // Skip timer if no deal is active

    const savedEndTime = localStorage.getItem(`offerEndTime_${experienceId}`);
    const now = Date.now();

    let endTime;
    if (savedEndTime && parseInt(savedEndTime, 10) > now) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      endTime = now + offerDuration * 1000;
      localStorage.setItem(`offerEndTime_${experienceId}`, endTime);
    }

    const interval = setInterval(() => {
      const remaining = Math.floor((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(interval);
        setExpired(true);
        setFadeOut(true);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [experienceId, offerDuration, isDealActive]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  // 💡 Regular Mode (no discount, no timer)
  if (!isDealActive) {
    return (
      <OfferWrapper>
        <Heading>Starting From</Heading>
        <PriceCard type="green">
          <Price>
            <span style={{ fontSize: "30px", marginRight: "6px" }}>$</span>
            {Math.floor(price || 0)
              .toString()
              .split("")
              .map((digit, i) => (
                <DigitBox key={i}>{digit}</DigitBox>
              ))}
            <span style={{ fontSize: "18px", marginLeft: "6px" }}>
              per person
            </span>
          </Price>
        </PriceCard>
        <Heading>Price Negotiable on larger groups</Heading>
      </OfferWrapper>
    );
  }

  // 💥 Deal Mode (with countdown)
  return (
    <OfferWrapper>
      <Heading fadeOut={fadeOut}>
        {expired
          ? "😔 Sorry, you missed this offer."
          : "You have 5 minutes to get the best price offer"}
      </Heading>

      {/* 🔴 Full Price */}
      <SubHeading>Full Price</SubHeading>
      <PriceCard type="red" expired={false}>
        <Price>
          <span style={{ fontSize: "30px", marginRight: "6px" }}>$</span>
          {Math.floor(price || 0)
            .toString()
            .split("")
            .map((digit, i) => (
              <DigitBox key={i}>{digit}</DigitBox>
            ))}
          <span style={{ fontSize: "18px", marginLeft: "6px" }}>per person</span>
        </Price>
      </PriceCard>

      {/* 🟢 Discounted Price */}
      <SubHeading>Best Price</SubHeading>
      <PriceCard type="green" expired={expired}>
        <Price>
          <span style={{ fontSize: "30px", marginRight: "6px" }}>$</span>
          {Math.floor(discountedPrice || 0)
            .toString()
            .split("")
            .map((digit, i) => (
              <DigitBox key={i}>{digit}</DigitBox>
            ))}
          <span style={{ fontSize: "18px", marginLeft: "6px" }}>per person</span>
        </Price>
      </PriceCard>

      {/* ⏰ Timer Section */}
      <SubHeading>
        {expired ? "Offer Expired" : "Time Left to Secure This Offer"}
      </SubHeading>
      <TimerWrapper>
        <TimerCard>{minutes[0]}</TimerCard>
        <TimerCard>{minutes[1]}</TimerCard>
        <span style={{ fontSize: "32px", margin: "0 6px" }}>:</span>
        <TimerCard>{seconds[0]}</TimerCard>
        <TimerCard>{seconds[1]}</TimerCard>
      </TimerWrapper>

      {!expired && (
        <Availability>
          Limited Availability — Only a few spots left this week
        </Availability>
      )}
    </OfferWrapper>
  );
};

export default PricingOfferCard;
