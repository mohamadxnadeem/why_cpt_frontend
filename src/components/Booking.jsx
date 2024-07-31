import React, { useState } from 'react';
import Slider from 'react-slider';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    days: '',
    people: '',
    accommodation: 'hotel',
    beds: '',
    budget: 1000
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSliderChange = (value) => {
    setFormData({
      ...formData,
      budget: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you can add the functionality to submit the form data to your backend
  };

  return (
    <div>
      <h2 className="tf-title-heading style-2 mg-bt-12">
        Let's plan your trip to Cape Town
      </h2>

      <div className="form-inner">
        <form id="contactform" noValidate="novalidate" className="form-submit" onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            tabIndex="1"
            aria-required="true"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            id="email"
            name="email"
            tabIndex="2"
            aria-required="true"
            type="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            id="contactNumber"
            name="contactNumber"
            tabIndex="3"
            aria-required="true"
            type="tel"
            placeholder="Your Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            id="days"
            name="days"
            tabIndex="4"
            aria-required="true"
            type="number"
            placeholder="Number of Days"
            value={formData.days}
            onChange={handleChange}
            required
          />
          <input
            id="people"
            name="people"
            tabIndex="5"
            aria-required="true"
            type="number"
            placeholder="Number of People"
            value={formData.people}
            onChange={handleChange}
            required
          />
          <select
            id="accommodation"
            name="accommodation"
            tabIndex="6"
            aria-required="true"
            value={formData.accommodation}
            onChange={handleChange}
            required
          >
            <option value="hotel">Hotel</option>
            <option value="private">Private Accommodation</option>
          </select>
          <input
            id="beds"
            name="beds"
            tabIndex="7"
            aria-required="true"
            type="number"
            placeholder="Number of Beds"
            value={formData.beds}
            onChange={handleChange}
            required
          />
          <label htmlFor="budget">Budget: ${formData.budget}</label>
          <Slider
            id="budget"
            className="slider"
            min={1000}
            max={10000}
            value={formData.budget}
            onChange={handleSliderChange}
            aria-labelledby="budget"
          />
          <button className="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
