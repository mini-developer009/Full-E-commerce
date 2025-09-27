'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiRaindrop,
  WiBarometer,
  WiDayCloudy,
} from 'react-icons/wi';
import { MdLocationOn } from 'react-icons/md';

interface WeatherData {
  current_condition: [
    {
      temp_C: string;
      FeelsLikeC: string;
      humidity: string;
      pressure: string;
      visibility: string;
      windspeedKmph: string;
      weatherDesc: { value: string }[];
      localObsDateTime: string;
    }
  ];
  nearest_area: [
    {
      areaName: { value: string }[];
      country: { value: string }[];
    }
  ];
  weather: [
    {
      astronomy: [
        {
          sunrise: string;
          sunset: string;
        }
      ];
    }
  ];
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/weather')
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl bg-gray-300" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  const current = weather.current_condition[0];
  const location = weather.nearest_area[0];
  const astronomy = weather.weather[0].astronomy[0];

  return (
    <Card className="w-full">
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        <div className="flex items-center gap-4">
          <MdLocationOn size={34} className="text-[#00bd6d]" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">
              {location.areaName[0].value}, {location.country[0].value}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {current.localObsDateTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiDayCloudy size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Condition</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {current.weatherDesc[0].value}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiThermometer size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {current.temp_C}°C (Feels like {current.FeelsLikeC}°C)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiHumidity size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {current.humidity}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiStrongWind size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {current.windspeedKmph} km/h
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiBarometer size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {current.pressure} hPa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiSunrise size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Sunrise</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {astronomy.sunrise}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiSunset size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Sunset</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {astronomy.sunset}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WiRaindrop size={42} className="text-[#00bd6d]" />
          <div>
            <p className="text-sm text-gray-500">Visibility</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {current.visibility} km
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
