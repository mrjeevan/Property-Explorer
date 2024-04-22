"use client";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress, GeocodeOptions } from "react-geocode";
import Spinner from "../spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import { IProperty } from "@/types/property";
import Zoom from "next-auth/providers/zoom";

type Props = { property: IProperty };

export default function PropertyMap({ property }: Props) {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    Zoom: 12,
    width: "100%",
    height: "500px",
  });

  setDefaults({
    key: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    language: "en",
    region: "es",
  } as GeocodeOptions);

  // console.log("property", property);
  return <div>PropertyMap</div>;
}
