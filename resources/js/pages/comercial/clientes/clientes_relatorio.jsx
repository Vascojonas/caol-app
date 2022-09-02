import React, {useState, useEffect} from 'react'




function clientes_relatorio({clientes, periodo}) {
  
    const [relatorios, setRelatorios]=useState([]);
    const inicio = periodo.inicio;
    const fim = periodo.fim;
    //console.log("Inicio",inicio,  "fim", fim);
   
    
    useEffect(() => {
      axios.get(`comercial/clientes/relatorios/${inicio}/${fim}`
      ).then(res=>{
        if(res.status === 200)
        {

            let relatorioResult=res.data.relatorios;
            //console.log(relatorioResult)
            setRelatorios(relatorioResult);

            let datasAux=[];

            relatorioResult.map((item)=>{
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
                //console.log(datasAux);
               
              }
            })
               
              // console.log(datasAux);
              setRelatorios(datasAux);
           

        }
      });
  }, []);



const CLIENTES_HTML = clientes.map((cliente, key)=>{
    return(
      <th key={key}>
        {cliente.no_fantasia}
      </th>
    )
})

//controle de insercao da ultima linha
let i=0;
let  ultimaLinha=false;
let total=[];

//controle de sub array de total
let c=0;

clientes.map((cliente)=>{
    total.push([]);
})

const DADOS_HTML = relatorios.map((item,key)=>{
      let data= Object.keys(item)[0];
      let subdados=item[Object.keys(item)[0]];

      if(i == relatorios.length-1){
         //console.log("Ultimo",relatorios.length);
        ultimaLinha=true
      }
      i++;

      c=0;
      
      return(
        <>
          <tr key={key}>
              <td>{data}</td>

              {
                
                clientes.map((cliente, key)=>{
                      
                      let receitaLiquida=0
                      subdados.map((dados)=>{
                        if(dados.co_cliente===cliente.co_cliente){
                              let fatura_data= (dados.data_emissao).slice(0, 7);
                              if(data===fatura_data){
                                   // console.log(cliente.no_fantasia,dados.data_emissao)
                                   receitaLiquida += dados.valor - dados.valor*dados.total_imp_inc/100;
                              }
                              
                          }
                      })

                      receitaLiquida= Math.round((receitaLiquida) * 100) / 100 ;
                      total[c].push(receitaLiquida);
                      c++;
                      return(
                        <td key={key}> {receitaLiquida}</td>
                      )
                })

              }

          </tr>

          
          {
            (ultimaLinha)&&(
              <tr>
                <td>Total</td>
                  {
                    total.map((t, key)=> {
                        return(
                            <td key={key}>
                              {
                               Math.round( t.reduce((prev, current)=> prev + current)* 100) / 100 
                               
                              }
                            </td>
                        )
                    })
                  }
              </tr>
            )
          }
          
        </>
      )

})
  


        return(
            
            <div className='relatorio'>
                  <table className="relatorio__tabela table table-striped">
                      <thead>
                        <tr>
                            <th>Periodos</th>
                            
                            {CLIENTES_HTML}
                        </tr>
                      </thead>
                      <tbody>
                            {DADOS_HTML}
                      </tbody>
                      
                    </table>
              </div>
        )

    }

export default clientes_relatorio