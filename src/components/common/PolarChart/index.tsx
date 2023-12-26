'use client';
import { CategoryInfoProps } from '@/hooks/useUserInfo';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
type PolarChartProps = {
  data: CategoryInfoProps[];
};
export const PolarChart = ({ data }: PolarChartProps) => {
  const [currentSeries, setCurrentSeries] = useState([21, 17, 15, 10, 12, 17, 21, 22]);
  const [currentLabels, setCurrentLabels] = useState([
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    '네트워크',
    'cs',
    '프로젝트',
  ]);
  const chartData = {
    series: currentSeries,
    options: {
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      labels: currentLabels,
    },
  };
  useEffect(() => {
    const count_list = data.map(item => item.categoryCount);
    const name_list = data.map(item => item.categoryName);
    setCurrentSeries(count_list);
    setCurrentLabels(name_list);
  }, [data]);

  return (
    <div id="chart" className="w-[280px]">
      <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" />
    </div>
  );
};
