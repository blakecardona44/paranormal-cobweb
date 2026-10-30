'use client';

import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
});

// 6377 Clark Avenue, Suite 275, Dublin, CA 94568
const COORDS: [number, number] = [-121.906, 37.709];

const LocationMap: React.FC = () => {
  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-100">
        <a
          href="https://www.google.com/maps/search/?api=1&query=6377+Clark+Avenue+Suite+275+Dublin+CA+94568"
          target="_blank"
          rel="noreferrer"
          className="text-[#3182c1] underline"
        >
          View 6377 Clark Avenue, Suite 275, Dublin, CA 94568 on Google Maps
        </a>
      </div>
    );
  }
  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{ height: '400px', width: '100%' }}
      center={COORDS}
    >
      <Marker coordinates={COORDS}>
        <div style={{ width: 30, height: 30, background: 'red', borderRadius: '50%' }} />
      </Marker>
    </Map>
  );
};

export default LocationMap;
