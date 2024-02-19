import React, { useEffect, useState } from 'react';

const GeoLocationComponent = () => {
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const showPosition = (position) => {
    const { latitude, longitude } = position.coords;
    const updatedLocation = {
      ...location,
      coordinates: [latitude, longitude],
    };
    setLocation(updatedLocation);
  };

  return (
    <div>
      <h1>Geolocation Example</h1>
      {location.coordinates.length > 0 && (
        <div>
          <p>cordinates: {location.coordinates[0]},{location.coordinates[1]}</p>
         
        </div>
      )}
    </div>
  );
};

export default GeoLocationComponent;