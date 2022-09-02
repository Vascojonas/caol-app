import React, {useState, useEffect} from 'react'

import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';

function clientes_pizza({clientes, periodo}) {
   
//console.log(periodo);

   const [data, setData]=useState([]);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#0018FE', '#00C90F', '#FFBAA8', '#F70429'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {`${(percent * 100).toFixed(0)}%`}
          </text>
      );
  };


  useEffect(() => {
   axios.get(`comercial/clientes/graficos/${periodo}`
   ).then(res=>{
     if(res.status === 200)
     {
       let resultado=res.data.graficos; 

         let aux =[];
         clientes.map((cliente)=>{

               let receita=0;
               resultado.map((item)=>{
                  //console.log("Consulta",item);
                  if(item.co_cliente===cliente.co_cliente){
                      receita += item.valor - (item.valor*item.total_imp_inc/100);
                  }
               })
               //console.log(cliente);
             let nome = cliente.no_fantasia;
             receita = Math.round((receita) * 100) / 100 ;  

             if(receita){
                aux.push({name: nome, value: receita})               
             }

         });
          
         //console.log(aux);
         setData(aux);
       
     }
   });
}, []);




  return (
      <>
          <div>
               <h1>Relatorio do ano {periodo}</h1>
              <div class="row d-flex justify-content-center text-center">
                  <hr />
                  
                      
                          <PieChart width={800} height={800} >
                              <Legend layout="vertical" verticalAlign="bottom" align="top" />
                              <Pie
                                  data={data}
                                  cx="50%"
                                  cy="30%"
                                  
                                  labelLine={false}
                                  label={renderCustomizedLabel}
                                  outerRadius={200}
                     
                                  dataKey="value"
                              >
                                  {data.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                              </Pie>
                          </PieChart>

                  </div>
              
          </div>
      </>
  )
}

export default clientes_pizza