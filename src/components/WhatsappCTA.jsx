import styled from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

const CTAWrapper = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 45px 35px;
  text-align: center;
  margin: 70px auto;
  max-width: 880px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
`;

const CTATitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: #111;
  margin-bottom: 12px;
`;

const CTASub = styled.p`
  font-size: 17px;
  color: #444;
  margin-bottom: 28px;
  line-height: 1.6;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #187049;
  color: #fff;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.25s ease-in-out;

  &:hover {
    background: #145b3a;
    transform: translateY(-2px);
  }
`;

const WhatsappCTA = () => {
  return (
    <CTAWrapper>
      <CTATitle>Have Questions or Want to Book Instantly?</CTATitle>
      <CTASub>
        Message your Cape Town travel concierge directly on WhatsApp. Fast replies.
      </CTASub>

      <CTAButton href="https://wa.link/r5z0sb" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={22} /> Chat on WhatsApp
      </CTAButton>
    </CTAWrapper>
  );
};

export default WhatsappCTA;