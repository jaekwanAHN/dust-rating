import axios from 'axios';
import { SIDO_GROUP } from '@/utils/constants';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

type Flag = null | '통신장애';

interface DustValues {
  pm10Value: string;
  pm25Value: string;
}

interface AirQualityScale extends DustValues {
  pm10Flag: Flag;
  pm25Flag: Flag;
}

interface AirQuality extends DustValues {
  stationName: string;
  pm10Grade: string;
  pm25Grade: string;
  dataTime: string;
}

export const getSidoAirQualities = async () => {
  try {
    return await Promise.all(
      SIDO_GROUP.map(async (sido) => {
        const response = await axios.get(
          `${VITE_AIR_QUALITY_URL}?sidoName=${sido.sidoName}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
        );

        if (response.status !== 200) {
          throw new Error('API 에러');
        }

        const airQuality = response.data.response.body.items.find(
          (scale: AirQualityScale) =>
            !scale.pm10Flag &&
            !scale.pm25Flag &&
            scale.pm10Value &&
            scale.pm25Value
        );

        return {
          sidoName: sido.sidoName,
          fineDustScale: Number(airQuality.pm10Value),
          fineDustGrade: Number(airQuality.pm10Grade),
          ultraFineDustScale: Number(airQuality.pm25Value),
          ultraFineDustGrade: Number(airQuality.pm25Grade),
        };
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const getSidoAirQuality = async (sido: string) => {
  try {
    const response = await axios.get(
      `${VITE_AIR_QUALITY_URL}?sidoName=${sido}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    const airQuality = response.data.response.body.items.find(
      (scale: AirQualityScale) =>
        !scale.pm10Flag && !scale.pm25Flag && scale.pm10Value && scale.pm25Value
    );

    return {
      cityName: airQuality.stationName,
      fineDustScale: Number(airQuality.pm10Value),
      fineDustGrade: Number(airQuality.pm10Grade),
      ultraFineDustScale: Number(airQuality.pm25Value),
      ultraFineDustGrade: Number(airQuality.pm25Grade),
      dataTime: airQuality.dataTime,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getCityAirQualities = async (sido: string) => {
  try {
    const response = await axios.get(
      `${VITE_AIR_QUALITY_URL}?sidoName=${sido}&pageNo=1&numOfRows=250&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    const airQualities = response.data.response.body.items.filter(
      (scale: AirQualityScale) =>
        !scale.pm10Flag && !scale.pm25Flag && scale.pm10Value && scale.pm25Value
    );

    return airQualities.map((airQuality: AirQuality) => ({
      cityName: airQuality.stationName,
      fineDustScale: Number(airQuality.pm10Value),
      fineDustGrade: Number(airQuality.pm10Grade),
      ultraFineDustScale: Number(airQuality.pm25Value),
      ultraFineDustGrade: Number(airQuality.pm25Grade),
      dataTime: airQuality.dataTime,
    }));
  } catch (error) {
    console.error(error);
  }
};