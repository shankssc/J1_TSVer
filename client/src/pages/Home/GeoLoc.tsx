import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// Replace with your Google Places API key
const API_KEY = 'AIzaSyAh4gyCyJgrHyfBzakD7R30Mpdyp6uyEPU';

const CurrentLocation = () => {
  const [streetAddress, setStreetAddress] = useState('');

  useEffect(() => {
    const getLocationAndAddress = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      Location.getCurrentPositionAsync({})
        .then(position => {
          const { latitude, longitude } = position.coords;

          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                const formattedAddress = data.results[0].formatted_address;
                setStreetAddress(formattedAddress);
                console.log("Address is ", streetAddress);
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Geolocation error:', error);
        });
    };

    getLocationAndAddress();
  }, []);

  return <>{streetAddress}</>;
};

export default CurrentLocation;
