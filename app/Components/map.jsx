"use client";
import React, { useRef, useEffect, useState } from "react";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import Box from "@mui/material/Box";

const FEROKE = { lng: 75.8481732, lat: 11.1824855 };
const ZOOM = 14;
const MAP_LINK = "https://www.google.com/maps?q=11.1824855,75.8481732";
const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapError, setMapError] = useState(!MAPTILER_API_KEY);
  const fallbackMapLink = `https://www.google.com/maps?q=${FEROKE.lat},${FEROKE.lng}&z=${ZOOM}&output=embed`;

  useEffect(() => {
    let mounted = true;
    let marker;
    if (!MAPTILER_API_KEY) {
      return undefined;
    }

    import("@maptiler/sdk")
      .then((maptilersdk) => {
        if (!mounted || !mapContainer.current) return;

        maptilersdk.config.apiKey = MAPTILER_API_KEY;
        map.current = new maptilersdk.Map({
          apiKey: MAPTILER_API_KEY,
          container: mapContainer.current,
          style: "base-v4",
          center: [FEROKE.lng, FEROKE.lat],
          zoom: ZOOM,
          cooperativeGestures: true,
        });

        const markerElement = document.createElement("a");
        markerElement.href = MAP_LINK;
        markerElement.target = "_blank";
        markerElement.rel = "noopener noreferrer";
        markerElement.className = "custom-map-marker";
        markerElement.textContent = "Redcrescent";
        markerElement.setAttribute("aria-label", "Open Redcrescent in Google Maps");
        markerElement.setAttribute("title", "Open Redcrescent in Google Maps");

        marker = new maptilersdk.Marker({ element: markerElement })
          .setLngLat([Feroke.lng, Feroke.lat])
          .addTo(map.current);

        map.current.once("error", () => {
          if (mounted) setMapError(true);
        });
      })
      .catch(() => {
        if (mounted) setMapError(true);
      });


    return () => {
      mounted = false;
      marker?.remove();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="map-wrap">
      {mapError ? (
        <>
          <iframe
            className="map-fallback"
            src={fallbackMapLink}
            title="Redcrescent location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="map-fallback-link" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </>
      ) : (
        <Box
          ref={mapContainer}
          className="map relative z-50 h-[28rem] w-full sm:h-[37.5rem]"
          sx={{ marginLeft: 0 }}
        />
      )}
    </div>
  );
}
