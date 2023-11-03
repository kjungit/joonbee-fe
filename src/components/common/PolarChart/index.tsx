'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
type PolarChartProps = {
  data: number[];
};
export const PolarChart = ({ data }: PolarChartProps) => {
  const [currentSeries, setCurrentSeries] = useState([21, 17, 15, 10, 12, 17, 21, 22]);
  const chartData = {
    series: currentSeries,
    options: {
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      labels: ['JavaScript', 'TypeScript', 'React', 'Vue', '네트워크', 'cs', '프로젝트'],
    },
  };
  useEffect(() => {
    setCurrentSeries(data);
  }, [data]);

  return (
    <div id="chart" className="w-[350px]">
      <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" />
    </div>
  );
};
