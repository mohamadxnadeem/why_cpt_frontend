import React, { useEffect } from 'react';

const TripAdvisorWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.jscache.com/wejs?wtype=selfserveprop&uniq=282&locationId=26640569&lang=en_ZA&rating=true&nreviews=4&writereviewlink=true&popIdx=true&iswide=true&border=true&display_version=2';
    script.async = true;
    script.onload = () => { window.trkSelfServeProp(); };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="TA_selfserveprop282" className="TA_selfserveprop">
      <ul id="aaC3j6ytqGG" className="TA_links w7ig3EN">
        <li id="AAbDdFiKg" className="Drjx7Lww">
          <a target="_blank" href="https://www.tripadvisor.co.za/Attraction_Review-g312659-d26640569-Reviews-Mohamad-Cape_Town_Central_Western_Cape.html" rel="noreferrer">
            <img src="https://www.tripadvisor.co.za/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" alt="TripAdvisor"/>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TripAdvisorWidget;

