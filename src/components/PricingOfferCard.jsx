import React from "react";
import styled from "styled-components";
import { useCurrency } from "../contexts/CurrencyContext";

/* Styling */
const Wrapper = styled.div`
  text-align: center;
  margin: 40px auto;
  max-width: 700px;
`;

const PriceCardWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
`;

const PriceTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 12px;
`;

const PriceValue = styled.div`
  font-size: 44px;
  font-weight: 800;
  color: #0b5b33;
  margin-bottom: 4px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #777;
`;

const CurrencySelector = styled.select`
  margin-top: 15px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
`;

const PricingOfferCard = ({ price }) => {
  const { currency, setCurrency, currencies, format } = useCurrency();

  return (
    <Wrapper>
      <PriceCardWrapper>
        <PriceTitle>Private Chauffeur Price Starting From</PriceTitle>

        <PriceValue>{format(price)}</PriceValue>

        <Label>Price Includes vehicle, driver, fuel and toll fees</Label>
        <Label>Price Excludes National Park Tickets, Activities and Meals</Label>

        <CurrencySelector
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          aria-label="Choose currency"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.symbol} {c.label}
            </option>
          ))}
        </CurrencySelector>
      </PriceCardWrapper>
    </Wrapper>
  );
};

export default PricingOfferCard;
