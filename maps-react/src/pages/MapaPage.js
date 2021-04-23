import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXBvZGFjYSIsImEiOiJja251bHg4bXEwYzRjMnVsZ2U2aThmcmFuIn0.kKKzJPQ8nvrT984RbPfdUw'

const puntoInicial = {
  lng: -99.5308,
  lat: 19.4,
  zoom: 13,
}
export const MapaPage = () => {
  const mapaDiv = useRef()

  const [mapa, setMapa] = useState()
  const [cords, setCords] = useState(puntoInicial)

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    })
    setMapa(map)
  }, [])

  useEffect(() => {
    mapa?.on('move', () => {
      const { lng, lat } = mapa.getCenter()
      setCords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.getZoom().toFixed(2),
      })
    })
    return mapa?.off('move')
  }, [mapa])

  return (
    <>
      <div className='info__cords'>
        lng: {cords.lng} | lat: {cords.lat} | zoom: {cords.zoom}
      </div>
      <div ref={mapaDiv} className='map-container'></div>
    </>
  )
}
