import React, { useState } from 'react';
import styled from 'styled-components';

const SecurityControl = ({ password, onSuccess }) => {
    const [inputCode, setInputCode] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setInputCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputCode === password) {
            onSuccess();
        } else {
            setError('Invalid code. Please try again.');
        }
    };

    return (
        <Container>
            <Card>
                <Title>Hey!</Title>
                <Title>This is a secret page!</Title>
                <Title>Enter your access code to view content</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Enter code"
                        value={inputCode}
                        onChange={handleChange}
                    />
                    {error && <Error>{error}</Error>}
                    <Button type="submit">Submit</Button>
                </Form>
            </Card>
        </Container>
    );
};

// Styled components
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Card = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: black; /* Set title color to black */
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const Error = styled.p`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

export default SecurityControl;
