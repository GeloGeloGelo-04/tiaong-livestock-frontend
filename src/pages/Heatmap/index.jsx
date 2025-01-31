import React from "react";
import { tiaongPolygonCoordinates } from "../../polygon";
import { Box, Stack, Typography } from "@mui/material";
import { PageContainer } from "../../components/layout/PageContainer";
import { setLocFormat } from "../../utils/helper";
import {
  GoogleMap,
  HeatmapLayer,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  BRGY_COOR,
  LIVESTOCK,
  MORTALITY,
  TIAONG_BRGY,
} from "../../utils/constant";
import useData from "../../hooks/useData";

const GMAP_CENTER = {
  lat: 13.954276367408628,
  lng: 121.33907651130149,
};

const ALLOWED_BOUNDS = {
  north: GMAP_CENTER.lat + 0.07, // Upper bound (slightly north of center)
  south: GMAP_CENTER.lat - 0.12, // Lower bound (slightly south of center)
  west: GMAP_CENTER.lng - 0.08, // Left bound (slightly west of center)
  east: GMAP_CENTER.lng + 0.065, // Right bound (slightly east of center)
};
const GMAP_LIBRARIES = ["visualization"];

function Heatmap() {
  const { livestockData, totalLivestock } = useData();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    libraries: GMAP_LIBRARIES,
  });

  const [map, setMap] = React.useState(null);
  const [activeCategory, setActiveCategory] = React.useState("");
  const [activeLivestock, setActiveLivestock] = React.useState("");

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(12.5);
    map.setCenter(GMAP_CENTER);

    // Optionally restrict the draggable area
    map.setOptions({
      restriction: {
        latLngBounds: ALLOWED_BOUNDS,
        strictBounds: false, // If true, prevents dragging outside bounds
      },
    });

    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // React.useEffect(() => {
  //   if (map) {
  //     const marker = new window.google.maps.Marker({
  //       position: center,
  //       map: map,
  //       title: "Hello World!",
  //     });
  //   }
  // }, [map]);

  return isLoaded ? (
    <PageContainer
      titleText="Livestock Tiaong Heatmap"
      subText="Livestock Tiaong Heatmap"
    >
      <Stack direction="row" gap={2} height="100%">
        <Stack width="100%" height="100%" boxSizing="border-box" gap={1}>
          <Box
            border="1px solid #1976D2"
            width="100%"
            height={"100%"}
            borderRadius={2}
            overflow="hidden"
          >
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={GMAP_CENTER}
              zoom={12.5}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Polygon
                paths={tiaongPolygonCoordinates}
                options={{
                  strokeColor: "#1976D2",
                  strokeOpacity: 0.8,
                  strokeWeight: 1,
                  //   fillColor: "#FF0000",
                  fillOpacity: 0,
                }}
              />
              <HeatmapLayer
                data={
                  (livestockData &&
                    livestockData.map((obj) => ({
                      location: setLocFormat(
                        BRGY_COOR[obj?.barangay].lat,
                        BRGY_COOR[obj?.barangay].lng
                      ),
                      weight: obj?.[activeCategory]?.[activeLivestock] || 0.01,
                    }))) ||
                  []
                }
                options={{
                  radius: 50,
                  opacity: 0.8,
                }}
              />
            </GoogleMap>
          </Box>

          <Stack gap={2}>
            <Stack direction="row" width="100%" justifyContent="center" gap={2}>
              {LIVESTOCK.map((obj, i) => (
                <button
                  key={i}
                  variant="outlined"
                  className={`livestock-btn ${
                    obj.name?.toLowerCase() == activeLivestock &&
                    activeCategory == "livestock"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("livestock");
                    setActiveLivestock(obj.name?.toLowerCase());
                  }}
                >
                  <div className="hover" />

                  <img style={{ maxWidth: 42 }} src={obj?.img} alt={obj.name} />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    mt={1}
                    zIndex={1}
                  >
                    {obj.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={10}
                    zIndex={1}
                    color="#007bff"
                    fontWeight="bold"
                  >
                    Total: {totalLivestock?.livestock[obj.name?.toLowerCase()]}
                  </Typography>
                </button>
              ))}
            </Stack>
            <Stack direction="row" width="100%" justifyContent="center" gap={2}>
              {MORTALITY.map((obj, i) => (
                <button
                  key={i}
                  variant="outlined"
                  className={`livestock-btn mortality ${
                    obj.name?.toLowerCase() == activeLivestock &&
                    activeCategory == "mortality"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveCategory("mortality");
                    setActiveLivestock(obj.name?.toLowerCase());
                  }}
                >
                  <div className="hover" />

                  <img style={{ maxWidth: 32 }} src={obj?.img} alt={obj.name} />
                  <Typography
                    component="span"
                    variant="body2"
                    fontWeight={600}
                    mt={1}
                    zIndex={1}
                  >
                    {obj.name}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    fontSize={10}
                    zIndex={1}
                    color="#007bff"
                    fontWeight="bold"
                  >
                    Total: {totalLivestock?.mortality[obj.name?.toLowerCase()]}
                  </Typography>
                </button>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack boxSizing="border-box" minWidth={250} gap={2} py={3}>
          <Stack direction="row" gap={1} alignItems="center">
            <Box bgcolor="#FB312F" height={24} width={24} />
            <Typography variant="body2">
              High Frequency (100+ livestocks)
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Box bgcolor="#E3FB2D" height={24} width={24} />
            <Typography variant="body2">
              Moderate Frequency (50-99 livestocks)
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Box bgcolor="#82FE2B" height={24} width={24} />
            <Typography variant="body2">
              Low Frequency (0-49 livestocks)
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </PageContainer>
  ) : (
    <></>
  );
}

export default React.memo(Heatmap);
