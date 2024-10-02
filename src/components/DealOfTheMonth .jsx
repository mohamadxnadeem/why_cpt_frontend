// components/DealOfTheMonth.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Deal1Image from '../assets/images/item-background/sedandeal.png'; // Image for both deals
import Deal2Image from '../assets/images/item-background/carrierdeal.png'; // Image for both deals

// Styled components
const DealSection = styled.div`
    padding: 50px; /* Padding for desktop */
    background-color: #f9f9f9;
    text-align: center;

    @media (max-width: 768px) {
        padding: 20px; /* Padding for mobile */
    }
`;

const Heading = styled.h2`
    font-size: 36px;
    margin-bottom: 15px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 28px;
    }
`;

const Paragraph = styled.p`
    font-size: 18px;
    margin-bottom: 30px;
    color: #555;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const DealCards = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 40px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const DealCard = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 450px;
    padding: 30px; /* Padding inside each card for desktop */
    text-align: center;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    @media (max-width: 768px) {
        width: 100%;
        padding: 20px; /* Padding inside each card for mobile */
    }

    img {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    h3 {
        font-size: 26px;
        margin: 15px 0;

        @media (max-width: 768px) {
            font-size: 22px;
        }
    }

    .price {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .usual-price {
        color: #999;
        font-weight: normal;
        display: block;
        margin-bottom: 5px;
    }

    .price-now {
        color: #999;
        font-size: 18px;
        font-weight: normal;
    }

    .you-save {
        font-size: 28px;
        color: #e74c3c;
        font-weight: bold;
        margin-top: 10px;

        @media (max-width: 768px) {
            font-size: 24px;
        }
    }

    .pax {
        font-size: 16px;
        color: #777;
        margin-top: 10px;

        @media (max-width: 768px) {
            font-size: 14px;
        }
    }
`;

const CountdownSection = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        margin-top: 30px;
    }
`;

const TimerBlock = styled.div`
    background-color: black;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    margin: 0 10px;

    @media (max-width: 768px) {
        padding: 15px;
        margin: 0 5px;
        font-size: 20px;
    }

    span {
        display: block;
        font-size: 40px;

        @media (max-width: 768px) {
            font-size: 30px;
        }
    }

    small {
        font-size: 16px;
        font-weight: normal;

        @media (max-width: 768px) {
            font-size: 12px;
        }
    }
`;

const DealOfTheMonth = () => {
    const [timeLeft, setTimeLeft] = useState({});
    const dealEndTime = new Date('2024-10-31T23:59:59'); // Set the deal end time

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = dealEndTime - new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <DealSection>
            <Heading>Deal of the Month</Heading>
            <Paragraph>Any full day tour and chauffeur drive with the vehicles below:</Paragraph>
            <DealCards>
                {/* First Deal Card */}
                <DealCard>
                    <img src={Deal1Image} alt="Deal 1" />
                    <h3>Audi A4</h3>
                    <div className="pax">Seats: 4 Passengers</div>
                    <div className="price">
                        <span className="usual-price">Usual Price: R3500</span>
                        <span className="price-now">Price Now: R2850</span>
                        <div className="you-save">You Save: R650</div>
                    </div>
                </DealCard>

                {/* Second Deal Card */}
                <DealCard>
                    <img src={Deal2Image} alt="Deal 2" />
                    <h3>Mercedes V Class</h3>
                    <div className="pax">Seats: 8 Passengers</div>
                    <div className="price">
                        <span className="usual-price">Usual Price: R6500</span>
                        <span className="price-now">Price Now: R4950</span>
                        <div className="you-save">You Save: R1550</div>
                    </div>
                </DealCard>
            </DealCards>

            {/* Countdown Timer Below Cards */}
            <CountdownSection>
                <TimerBlock>
                    <span>{timeLeft.days || '0'}</span>
                    <small>Days</small>
                </TimerBlock>
                <TimerBlock>
                    <span>{timeLeft.hours || '0'}</span>
                    <small>Hours</small>
                </TimerBlock>
                <TimerBlock>
                    <span>{timeLeft.minutes || '0'}</span>
                    <small>Minutes</small>
                </TimerBlock>
                <TimerBlock>
                    <span>{timeLeft.seconds || '0'}</span>
                    <small>Seconds</small>
                </TimerBlock>
            </CountdownSection>
        </DealSection>
    );
};

export default DealOfTheMonth;
