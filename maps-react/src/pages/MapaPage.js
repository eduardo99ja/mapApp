import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXBvZGFjYSIsImEiOiJja251bHg4bXEwYzRjMnVsZ2U2aThmcmFuIn0.kKKzJPQ8nvrT984RbPfdUw'

const puntoInicial = {
  lng: 5,
  lat: 34,
  zoom: 10,
}
export const MapaPage = () => {
  const mapaDiv = useRef()

  const [mapa, setMapa] = useState(null)

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    })
    setMapa(map)
  }, [])

  return (
    <>
      <div ref={mapaDiv} className='map-container'></div>
    </>
  )
}
