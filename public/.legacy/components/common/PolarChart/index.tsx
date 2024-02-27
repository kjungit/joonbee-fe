'use client';
import { CategoryInfoProps } from '../../../hooks/useUserInfo';
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

  const chartDataDefault = {
    series: [1, 2, 3, 4, 5, 6],
    options: {
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      labels: ['', '', '', '', '', ''],
    },
  };
  useEffect(() => {
    const count_list = data.map(item => item.categoryCount);
    const name_list = data.map(item => item.categoryName);
    setCurrentSeries(count_list);
    setCurrentLabels(name_list);
    console.log(currentSeries);
    console.log(currentLabels);
  }, [data]);

  return (
    <>
      {data.length === 0 ? (
        <div id="chart" className="w-[280px] relative">
          <div className="opacity-50">
            <ReactApexChart
              options={chartDataDefault.options}
              series={chartDataDefault.series}
              type="polarArea"
            />
          </div>
          <p className="w-full absolute -translate-x-1/2 p-7 -translate-y-1/2 left-1/2 top-1/2 font-bold">
            질문이 없어요!
          </p>
        </div>
      ) : (
        <div id="chart" className="w-[280px]">
          <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" />
        </div>
      )}
    </>
  );
};
