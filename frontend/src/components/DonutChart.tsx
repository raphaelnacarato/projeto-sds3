import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import { SaleSum } from '../types/sale';

import api from '../services/api';

type ChartData = {
   labels: string[];
   series: number[];
}

const DonutChart = () => {
   const [sellers, setSellers] = useState<SaleSum[]>([]);

   // let chartData: ChartData = { labels: [], series: [] };

   useEffect(() => {
      async function loadAmountBySeller() {
         const { data } = await api.get('/sales/amount-by-seller');

         setSellers(data);
      };

      loadAmountBySeller();
   }, [])

   const series = sellers.map(sale => {
      return sale.sum;
   });

   const labels = sellers.map(sale => {
      return sale.sellerName;
   });

   const options = {
      legend: {
         show: true
      }
   }

   return (
      <Chart
         options={{ ...options, labels }}
         series={series}
         type='donut'
         height="240"
      />
   );
};

export default DonutChart;
