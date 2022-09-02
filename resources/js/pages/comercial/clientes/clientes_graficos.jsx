import ReactReact, {useState, useEffect}  from 'react'

function Clientes_graficos({clientes, periodo}) {
    const [dados, setDados]=useState([]);
    const inicio = periodo.inicio;
    const fim = periodo.fim;


    


  useEffect(() => {
    axios.get(`comercial/clientes/graficos/${periodo}`
    ).then(res=>{
      if(res.status === 200)
      {
        let resultado=res.data.graficos; 

        
        let datasAux=[];

        resultado.map((item)=>{
         
          let data = (item.data_emissao).slice(0, 7);
         
          let findIndex =false;
            
           datasAux.forEach((element)=>{
                if( data in element){
                    findIndex =true;
                }
            })
          
          if(findIndex){
              datasAux.forEach((element, index)=>{
                if( data in element){
                 (datasAux[index][data]).push(item)
                }
              })

          }else{
              
            datasAux.push({ [data] : [item] })
           
           
          }
        })
           
          //console.log(datasAux);
          setDados(datasAux);
        
      }
    });
}, []);


const GRAFICOS_HTML=dados.map((data)=>{
        let subdados=data[Object.keys(data)[0]];
        //console.log("data", Object.keys(data)[0])
        
        let totalReceitaMensal=0
        return (
          
            <tr>
                <th className='graficos__legenda--x' scope="row">{Object.keys(data)[0]}</th>
                
                {

                  clientes.map((cliente)=>{
                    //  console.log("cliente", cliente.co_usuario)
                      
                       let totalReceitacliente=0
                        subdados.map((item)=>{
                          if(cliente.co_cliente===item.co_cliente){
                            totalReceitacliente += item.valor - (item.valor*item.total_imp_inc/100);
                          }
                        })
                        totalReceitacliente=Math.round((totalReceitacliente) * 100) / 100 ;
                        totalReceitaMensal += totalReceitacliente;
                        console.log(totalReceitacliente)
                        return(
                            <>
                            <td className='graficos__td' style={{height: `calc(((${totalReceitacliente} * 32rem /320000 ))`}} > 
                                <span class="data ">{totalReceitacliente} </span>
                               
                             </td> 
                            </>
                        )
                     }) 
                }

                
            </tr>  
        )
      })


      const GRAFICO_LEGENDA = clientes.map((c)=>{
        return(

              <li>
                  {c.no_fantasia}
              </li>
        )
      })



  return (

    <div>
       
      <table id="custom-effect" class="graficos charts-css column show-labels show-data-on-hover show-primary-axis show-10-secondary-axes show-data-axes multiple data-spacing-10 reverse-data reverse-dataset ">
        
        <thead className='graficos__thead'>
          <tr>
           
          </tr>
        </thead>
        <tbody className=' graficos__tbody'>
          
          {GRAFICOS_HTML}

      </tbody>
            <div className='legenda charts-legenda-css  u-margin-top-small'>
                  <h2 className='legenda__titulo'>Legendas</h2>
                  <ul className='legenda__ul'>
                      <ol>
                          {GRAFICO_LEGENDA}
                      </ol>
                  </ul>
             </div>
    </table>

    </div>
    
  )
}

export default Clientes_graficos