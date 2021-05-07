import { useState, useEffect } from 'react';

import api from '../services/api';
import { SalePage } from '../types/sale';
import { formatLocalDate } from '../utils/format';

const DataTable = () => {
   const [page, setPage] = useState<SalePage>({
      first: true,
      last: true,
      number: 0,
      totalElements: 0,
      totalPages: 0
   });

   useEffect(() => {
      async function loadData() {
         const res = await api.get(`sales?page=0&size=15&sort=date,desc`);

         setPage(res.data);
      };

      loadData();

   }, [page]);

   return (
      <div className="table-responsive">
         <table className="table table-striped table-sm">
            <thead>
               <tr>
                  <th>Data</th>
                  <th>Vendedor</th>
                  <th>Clientes visitados</th>
                  <th>Negócios fechados</th>
                  <th>Valor</th>
               </tr>
            </thead>
            <tbody>
               {page.content?.map(item => {
                  return (
                     <tr key={item.id}>
                        <td>{formatLocalDate(item.date, 'dd/MM/yyyy')}</td>
                        <td>{item.seller.name}</td>
                        <td>{item.visited}</td>
                        <td>{item.deals}</td>
                        <td>{item.amount.toFixed(2)}</td>
                     </tr>
                  )
               })}

            </tbody>
         </table>
      </div>
   );
};

export default DataTable;
