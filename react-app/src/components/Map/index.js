import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"
const Map = () => {
  return (
    <div>
      <GoogleMap defualtZoom={10} defaultCenter={{ lat: 45.421532, lng: -75.697189 }} />
    </div>
  )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))

export default Map
