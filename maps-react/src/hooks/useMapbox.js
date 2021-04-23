import mapboxgl from 'mapbox-gl'
import { useRef, useState, useEffect, useCallback } from 'react'
import { v4 } from 'uuid'

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXBvZGFjYSIsImEiOiJja251bHg4bXEwYzRjMnVsZ2U2aThmcmFuIn0.kKKzJPQ8nvrT984RbPfdUw'

export const useMapbox = puntoInicial => {
  //referencia al div del mapa
  const setRef = useCallback(node => {
    mapaDiv.current = node
  }, [])
  const mapaDiv = useRef()

  //referencia a los marcadores
  const marcadores = useRef({})

  //mapa y coordenadas
  const mapa = useRef()
  const [cords, setCords] = useState(puntoInicial)

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    })
    mapa.current = map
  }, [puntoInicial])

  useEffect(() => {
    mapa.current?.on('move', () => {
      const { lng, lat } = mapa.current.getCenter()
      setCords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      })
    })
    return mapa.current?.off('move')
  }, [])
  //agregar marcadores al hacer click
  useEffect(() => {
    mapa.current?.on('click', ev => {
      const { lng, lat } = ev.lngLat
      const marker = new mapboxgl.Marker()
      marker.id = v4()
      marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true)

      marcadores.current[marker.id] = marker
    })
    return mapa.current?.off('move')
  }, [])
  return {
    cords,
    setRef,
    marcadores,
  }
}
