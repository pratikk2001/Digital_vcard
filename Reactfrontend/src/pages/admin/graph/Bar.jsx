import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import useMediaQuery from '@mui/material/useMediaQuery';

const BarAnimation = () => {
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');

  // Adjust chart width and height based on screen size
  const chartWidth = isSmallScreen ? 300 : isMediumScreen ? 600 : 900;
  const chartHeight = isSmallScreen ? 200 : 250;

  const chartSetting = {
    yAxis: [
      {
        label: '',
        tickValues: [0, 20, 40, 60, 80, 100],
        tickFormat: (value) => `${value}`,
      },
    ],
    width: chartWidth,
    height: chartHeight,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const dataset = [
    { totalUsers: 80, activeUsers: 50, month: 'Jan' },
    { totalUsers: 90, activeUsers: 60, month: 'Feb' },
    { totalUsers: 100, activeUsers: 70, month: 'Mar' },
    { totalUsers: 120, activeUsers: 90, month: 'Apr' },
    { totalUsers: 150, activeUsers: 110, month: 'May' },
    { totalUsers: 200, activeUsers: 140, month: 'Jun' },
    { totalUsers: 250, activeUsers: 180, month: 'Jul' },
    { totalUsers: 300, activeUsers: 200, month: 'Aug' },
    { totalUsers: 350, activeUsers: 230, month: 'Sep' },
    { totalUsers: 400, activeUsers: 250, month: 'Oct' },
    { totalUsers: 450, activeUsers: 300, month: 'Nov' },
    { totalUsers: 500, activeUsers: 350, month: 'Dec' },
  ];

  const valueFormatter = (value) => `${value}`;

  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 text-center">
        User Statistics
      </h2>
      <div className="overflow-x-auto">
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            { dataKey: 'totalUsers', label: 'Total Users', valueFormatter },
            { dataKey: 'activeUsers', label: 'Active Users', valueFormatter },
          ]}
          animation={{ enabled: true, duration: 500, easing: 'ease-out' }}
          {...chartSetting}
        />
      </div>
    </div>
  );
};

export default BarAnimation;
