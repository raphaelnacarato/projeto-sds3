import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import { SaleSum } from '../types/sale';

import api from '../services/api';

type ChartData = {
   labels: string[];
   series: number[];
}

const DonutChart = () => {
   const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

   useEffect(() => {
      async function loadAmountBySeller() {
         const res = await api.get('/sales/amount-by-seller');

         const data = res.data as SaleSum[];

         const myLabels = data.map(sale => sale.sellerName);
         const mySeries = data.map(sale => sale.sum);

         setChartData({ labels: myLabels, series: mySeries });
      };

      loadAmountBySeller();
   }, [])



   const options = {
      legend: {
         show: true
      }
   }

   return (
      <Chart
         options={{ ...options, labels: chartData.labels }}
         series={chartData.series}
         type='donut'
         height="240"
      />
   );
};

export default DonutChart;
