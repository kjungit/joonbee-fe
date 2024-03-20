'use client';
import { userInfoState } from '@/recoils/user/userInfo/atom';
import { CategoryInfoProps } from '@/types/user';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';

export const PolarChart = () => {
  const userInfo = useRecoilValue(userInfoState);

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
      legend: {
        show: false,
      },
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
    const count_list = userInfo.categoryInfo.map(item => item.categoryCount);
    const name_list = userInfo.categoryInfo.map(item => item.categoryName);
    setCurrentSeries(count_list);
    setCurrentLabels(name_list);
    console.log(currentSeries);
    console.log(currentLabels);
  }, [userInfo.categoryInfo]);

  return (
    <>
      {userInfo.categoryInfo.length === 0 ? (
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
        <div id="chart" className="w-[220px]">
          <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" />
        </div>
      )}
    </>
  );
};
