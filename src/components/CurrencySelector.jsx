import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCurrency } from "../contexts/CurrencyContext";

const Wrap = styled.div`
  position: fixed;
  right: 16px;
  bottom: 86px;
  z-index: 9000;
  font-family: inherit;

  @media (max-width: 480px) {
    right: 12px;
    bottom: 78px;
  }
`;

const Pill = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  color: #0b5b33;
  border: 1px solid rgba(11, 91, 51, 0.25);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16);
  }

  &:focus {
    outline: 2px solid #0b5b33;
    outline-offset: 2px;
  }
`;

const Symbol = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #0b5b33;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
`;

const Caret = styled.span`
  font-size: 10px;
  opacity: 0.7;
`;

const Menu = styled.div`
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  min-width: 240px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 6px;
  display: ${(p) => (p.open ? "block" : "none")};
`;

const MenuHeader = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #777;
  padding: 8px 10px 6px;
`;

const Option = styled.button`
  width: 100%;
  text-align: left;
  background: ${(p) => (p.$active ? "rgba(11,91,51,0.08)" : "transparent")};
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 10px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background: rgba(11, 91, 51, 0.08);
  }
`;

const OptSym = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? "#0b5b33" : "#f2f2f2")};
  color: ${(p) => (p.$active ? "#fff" : "#0b5b33")};
  font-weight: 700;
  font-size: 12px;
`;

const OptLabel = styled.span`
  flex: 1;
`;

const Check = styled.span`
  color: #0b5b33;
  font-weight: 700;
`;

const CurrencySelector = () => {
  const { currency, setCurrency, currencies, symbol } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <Wrap ref={ref}>
      <Menu open={open} role="listbox" aria-label="Choose currency">
        <MenuHeader>Display prices in</MenuHeader>
        {currencies.map((c) => {
          const active = c.code === currency;
          return (
            <Option
              key={c.code}
              $active={active}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              role="option"
              aria-selected={active}
            >
              <OptSym $active={active}>{c.symbol}</OptSym>
              <OptLabel>{c.label}</OptLabel>
              {active && <Check>✓</Check>}
            </Option>
          );
        })}
      </Menu>

      <Pill
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${currency}. Change currency.`}
      >
        <Symbol>{symbol}</Symbol>
        <span>{currency}</span>
        <Caret>{open ? "▾" : "▴"}</Caret>
      </Pill>
    </Wrap>
  );
};

export default CurrencySelector;
