import React from 'react'

import {  useMapbox } from '../hooks/useMapbox'


const puntoInicial = {
  lng: -99.5308,
  lat: 19.4,
  zoom: 13,
}
export const MapaPage = () => {
  const {setRef, cords } = useMapbox(puntoInicial)

  return (
    <>
      <div className='info__cords'>
        lng: {cords.lng} | lat: {cords.lat} | zoom: {cords.zoom}
      </div>
      <div ref={setRef} className='map-container'></div>
    </>
  )
}
