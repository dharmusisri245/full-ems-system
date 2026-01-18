// import { useEffect, useState, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";
// import L, { Map as LeafletMap } from "leaflet";
// import "leaflet/dist/leaflet.css";

// /* ------------ Fix default Marker Icon (required for Vite) ------------ */
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// /* ------------ Custom marker icon ------------ */
// const customIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// /* ------------ Types ------------ */
// interface MarkerItem {
//   id: number;
//   title: string;
//   position: [number, number];
// }

// interface ClickSelectorProps {
//   onSelect: (coords: { lat: number; lng: number }) => void;
// }

// interface FlyToPositionProps {
//   position: [number, number];
// }

// /* ------------ FlyToPosition Component ------------ */
// function FlyToPosition({ position }: FlyToPositionProps) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.flyTo(position, 13, { duration: 1 });
//     }
//   }, [position, map]);

//   return null;
// }

// /* ------------ Click-to-select Component ------------ */
// function ClickSelector({ onSelect }: ClickSelectorProps) {
//   const [pos, setPos] = useState<[number, number] | null>(null);

//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       setPos([lat, lng]);
//       onSelect({ lat, lng });
//     },
//   });

//   return pos ? (
//     <Marker position={pos} icon={customIcon}>
//       <Popup>
//         <b>Selected</b>  
//         <div>Lat: {pos[0].toFixed(6)}</div>
//         <div>Lng: {pos[1].toFixed(6)}</div>
//       </Popup>
//     </Marker>
//   ) : null;
// }

// /* ------------ Initial Markers ------------ */
// const initialMarkers: MarkerItem[] = [
//   { id: 1, title: "Delhi", position: [28.6139, 77.209] },
//   { id: 2, title: "Noida", position: [28.7041, 77.1025] },
//   { id: 3, title: "Ghaziabad", position: [28.5355, 77.391] },
// ];

// /* ------------ MAIN COMPONENT ------------ */
// export default function AdvancedMap() {
//   const [markers, setMarkers] = useState<MarkerItem[]>(initialMarkers);
//   const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
//     null
//   );
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResultPos, setSearchResultPos] =
//     useState<[number, number] | null>(null);

//   const mapRef = useRef<LeafletMap | null>(null);

//   /* ------------ Go to My Location ------------ */
//   const goToMyLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const coords: [number, number] = [
//           pos.coords.latitude,
//           pos.coords.longitude,
//         ];

//         setMarkers((prev) => [
//           ...prev,
//           { id: Date.now(), title: "You are here", position: coords },
//         ]);

//         mapRef.current?.flyTo(coords, 13, { duration: 1 });
//       },
//       (err) => alert("Error: " + err.message)
//     );
//   };

//   /* ------------ Search (Nominatim API) ------------ */
//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery) return;

//     try {
//       const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//         searchQuery
//       )}&format=json&limit=1`;

//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.length === 0) return alert("No results found!");

//       const lat = parseFloat(data[0].lat);
//       const lon = parseFloat(data[0].lon);

//       setSearchResultPos([lat, lon]);

//       setMarkers((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           title: data[0].display_name,
//           position: [lat, lon],
//         },
//       ]);
//     } catch (err) {
//       alert("Search failed");
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* <h2 className="text-lg font-bold mb-4">Advanced Map (TypeScript)</h2> */}

//       {/* Controls */}
//       <div className="flex gap-3 mb-2">
//         <button
//           onClick={goToMyLocation}
//           className="px- py- bg-blue-600 text-white rounded"
//         >
//           📍 My Location
//         </button>

//         <form onSubmit={handleSearch} className="flex gap-2">
//           <input
//             className="px-3 py-2 border rounded"
//             placeholder="Search place"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="px-3 py-2 bg-gray-800 text-white rounded">
//             🔎 Search
//           </button>
//         </form>
//       </div>

//       {/* Map */}
//       <MapContainer
//         center={[28.6139, 77.209]}
//         zoom={11}
//         style={{ height: "520px", width: "100%" }}
//         whenCreated={(map) => (mapRef.current = map)}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         {searchResultPos && <FlyToPosition position={searchResultPos} />}

//         {markers.map((m) => (
//           <Marker key={m.id} position={m.position} icon={customIcon}>
//             <Popup>
//               <b>{m.title}</b>
//               <div>Lat: {m.position[0]}</div>
//               <div>Lng: {m.position[1]}</div>
//             </Popup>
//           </Marker>
//         ))}

//         <ClickSelector onSelect={setSelected} />
//       </MapContainer>

//       {/* Selected location display */}
//       {selected && (
//         <div className="mt-4 p-3 border rounded bg-gray-100">
//           <h4 className="font-bold">Selected Location</h4>
//           <p>Lat: {selected.lat}</p>
//           <p>Lng: {selected.lng}</p>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

/* ------------ Fix default Marker Icon ------------ */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* ------------ Custom marker icon ------------ */
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

/* ------------ Types ------------ */
interface MarkerItem {
  id: number;
  title: string;
  position: [number, number];
}

interface ClickSelectorProps {
  onSelect: (coords: { lat: number; lng: number }) => void;
}

interface FlyToPositionProps {
  position: [number, number];
}

interface AdvancedMapProps {
  locationQuery?: string; // receive from Header
}

/* ------------ FlyToPosition Component ------------ */
function FlyToPosition({ position }: FlyToPositionProps) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1 });
    }
  }, [position, map]);
  return null;
}

/* ------------ ClickSelector Component ------------ */
function ClickSelector({ onSelect }: ClickSelectorProps) {
  const [pos, setPos] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPos([lat, lng]);
      onSelect({ lat, lng });
    },
  });

  return pos ? (
    <Marker position={pos} icon={customIcon}>
      <Popup>
        <b>Selected</b>
        <div>Lat: {pos[0].toFixed(6)}</div>
        <div>Lng: {pos[1].toFixed(6)}</div>
      </Popup>
    </Marker>
  ) : null;
}

/* ------------ Initial Markers ------------ */
const initialMarkers: MarkerItem[] = [
  { id: 1, title: "Delhi", position: [28.6139, 77.209] },
  { id: 2, title: "Noida", position: [28.7041, 77.1025] },
  { id: 3, title: "Ghaziabad", position: [28.5355, 77.391] },
];

/* ------------ MAIN COMPONENT ------------ */
export default function AdvancedMap({ locationQuery }: AdvancedMapProps) {
  const [markers, setMarkers] = useState<MarkerItem[]>(initialMarkers);
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState(locationQuery || "");
  const [searchResultPos, setSearchResultPos] = useState<[number, number] | null>(
    null
  );

  const mapRef = useRef<LeafletMap | null>(null);

  /* ------------ Fly to new location whenever locationQuery changes ------------ */
  useEffect(() => {
    if (locationQuery) {
      setSearchQuery(locationQuery);
      searchLocation(locationQuery);
    }
  }, [locationQuery]);

  /* ------------ Search function ------------ */
  const searchLocation = async (query: string) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=1`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.length) {
        alert("No location found!");
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      setSearchResultPos([lat, lon]);
      setMarkers((prev) => [
        ...prev,
        { id: Date.now(), title: data[0].display_name, position: [lat, lon] },
      ]);
    } catch {
      alert("Search failed.");
    }
  };

  /* ------------ Go to My Location ------------ */
  const goToMyLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setMarkers((prev) => [
          ...prev,
          { id: Date.now(), title: "You are here", position: coords },
        ]);

        mapRef.current?.flyTo(coords, 13, { duration: 1 });
      },
      (err) => alert("Error: " + err.message)
    );
  };

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex gap-3 mb-2">
        {/* <button
          onClick={goToMyLocation}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          📍 My Location
        </button> */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery) searchLocation(searchQuery);
          }}
          className="flex gap-2"
        >
          {/* <input
            className="px-3 py-2 border rounded"
            placeholder="Search place"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
          {/* <button className="px-3 py-2 bg-gray-800 text-white rounded">
            🔎 Search
          </button> */}
        </form>
      </div>

      {/* Map */}
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={11}
        style={{ height: "520px", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {searchResultPos && <FlyToPosition position={searchResultPos} />}

        {markers.map((m) => (
          <Marker key={m.id} position={m.position} icon={customIcon}>
            <Popup>
              <b>{m.title}</b>
              <div>Lat: {m.position[0]}</div>
              <div>Lng: {m.position[1]}</div>
            </Popup>
          </Marker>
        ))}

        <ClickSelector onSelect={setSelected} />
      </MapContainer>

      {/* Selected location display */}
      {selected && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h4 className="font-bold">Selected Location</h4>
          <p>Lat: {selected.lat}</p>
          <p>Lng: {selected.lng}</p>
        </div>
      )}
    </div>
  );
}
