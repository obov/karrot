import { useEffect, useState } from "react";

interface useCoordState {
  latitude: number | null;
  longitude: number | null;
}

const useCoords = () => {
  const [coords, setCoords] = useState<useCoordState>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
};
export default useCoords;
