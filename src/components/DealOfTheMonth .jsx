import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Deal1Image from '../assets/images/item-background/sedandeal.png';
import Deal2Image from '../assets/images/item-background/carrierdeal.png';

// Styled components
const DealSection = styled.div`
    padding: 50px;
    background-color: #f9f9f9;
    text-align: center;

    @media (max-width: 768px) {
        padding: 20px;
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
    padding: 30px;
    text-align: center;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    @media (max-width: 768px) {
        width: 100%;
        padding: 20px;
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
    const [isExpired, setIsExpired] = useState(false);

    // Set the deal to expire at 10 PM today in South African Time (UTC+2)
    const getDealEndTime = () => {
        const now = new Date();
        const dealEndTime = new Date();
        dealEndTime.setHours(22, 0, 0, 0); // Set time to 10:00 PM of the current day
        if (now > dealEndTime) {
            dealEndTime.setDate(dealEndTime.getDate() + 1); // Move to the next day if it's past 10 PM
        }
        return dealEndTime;
    };

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const dealEndTime = getDealEndTime();
            const difference = dealEndTime - now;
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            } else {
                setIsExpired(true);
                timeLeft = { hours: 0, minutes: 0, seconds: 0 };
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
            <Heading>{isExpired ? "Deal Expired" : "Today's Deal"}</Heading>
            <Paragraph>
                {isExpired
                    ? "Sorry you missed this deal, follow us on social media to find out when we have another deal."
                    : "Book now before this deal expires to secure today's exclusive deal! You can choose any date for your tour or experience."}
            </Paragraph>
            <CountdownSection>
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
            <DealCards>
                <DealCard>
                    <img src={Deal1Image} alt="Deal 1" />
                    <h3>Cape Point Tour with Audi A4</h3>
                    <div className="pax">Seats: 4 Passengers</div>
                    <div className="price">
                        <span className="usual-price">Usual Price: R3500</span>
                        <span className="price-now">Price Now: R2850</span>
                        <div className="you-save">You Save: R650</div>
                    </div>
                </DealCard>

                <DealCard>
                    <img src={Deal2Image} alt="Deal 2" />
                    <h3>Stellenbosch winelands tour with Mercedes V Class</h3>
                    <div className="pax">Seats: 6 Passengers</div>
                    <div className="price">
                        <span className="usual-price">Usual Price: R6500</span>
                        <span className="price-now">Price Now: R4950</span>
                        <div className="you-save">You Save: R1550</div>
                    </div>
                </DealCard>
            </DealCards>
        </DealSection>
    );
};

export default DealOfTheMonth;
