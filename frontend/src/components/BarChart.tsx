import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import { SaleSuccess } from '../types/sale';
import api from '../services/api';
import { round } from '../utils/format';

type SeriesData = {
   name: string;
   data: number[];
}

type ChartData = {
   labels: {
      categories: string[];
   }
   series: SeriesData[];
}

const BarChart = () => {
   const [chartData, setChartData] = useState<ChartData>({ labels: { categories: [] }, series: [{ name: '', data: [] }] });

   useEffect(() => {
      async function loadSaleSuccess() {
         const res = await api.get('sales/success-by-seller');

         const data = res.data as SaleSuccess[];

         const myLabel = data.map(label => label.sellerName);
         const mySeries = data.map(serie => round((serie.deals / serie.visited) * 100, 1));

         setChartData({ labels: { categories: myLabel }, series: [{ name: '% Success', data: mySeries }] });
      }

      loadSaleSuccess();
   }, [])

   const options = {
      plotOptions: {
         bar: {
            horizontal: true,
         }
      },
   };

   return (
      <Chart
         options={{ ...options, xaxis: chartData.labels }}
         series={chartData.series}
         type='bar'
         height="240"
      />
   );
};

export default BarChart;
