import ReactReact, {useState, useEffect}  from 'react'

function consultores_graficos({consultores, periodo}) {
    const [dados, setDados]=useState([]);
    const inicio = periodo.inicio;
    const fim = periodo.fim;

  useEffect(() => {
    axios.get(`comercial/consultores/graficos/${periodo}`
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
           
          console.log(datasAux);
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

                  consultores.map((consultor)=>{
                    //  console.log("consultor", consultor.co_usuario)
                      
                       let totalReceitaConsultor=0
                        subdados.map((item)=>{
                          if(consultor.co_usuario===item.co_usuario){
                            totalReceitaConsultor += item.valor - (item.valor*item.total_imp_inc/100);
                          }
                        })
                        totalReceitaConsultor=Math.round((totalReceitaConsultor) * 100) / 100 ;
                        totalReceitaMensal += totalReceitaConsultor;
                        console.log(totalReceitaConsultor)
                        return(
                            <td className='graficos__td' style={{height: `calc(((${totalReceitaConsultor} * 32rem /320000 ))`}} > 
                                <span class="graficos__td--valor data">{totalReceitaConsultor}</span>
                             </td>
                        )
                     }) 
                }
            </tr>  
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
            
         {/* <tr>
              <th scope="row">Mes</th>

                <td > <span className="data"> 20 </span> </td>
                <td > <span className="data"> 50 </span> </td>
                <td > <span className="data"> 100 </span> </td>
                <td > <span className="data"> 70 </span> </td>
                <td > <span className="data"> 40 </span> </td>
          </tr>*/}
          {GRAFICOS_HTML}
        
      </tbody>
    </table>

    </div>
    
  )
}

export default consultores_graficos