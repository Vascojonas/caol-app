import React, {useState, useEffect} from 'react'




function consultores_relatorio({consultor, periodo}) {
  
    const [relatorios, setRelatorios]=useState([]);
    const co_usuario = consultor.co_usuario;
    const inicio = periodo.inicio;
    const fim = periodo.fim;
    //console.log("Inicio",inicio,  "fim", fim);
   
    
    useEffect(() => {
      axios.get(`comercial/consultores/relatorios/${co_usuario}/${inicio}/${fim}`
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


const calculoReceitaLiquida = (faturas)=>{
    
    let  totalReceita=0
    faturas.map((fatura)=>{
          totalReceita += fatura.valor - (fatura.valor*fatura.total_imp_inc/100);
    })

    return Math.round((totalReceita) * 100) / 100 ;
}

const calculoComissao = (faturas)=>{
 
    let comissao=0;
    
  
    faturas.map((f)=>{

        comissao +=(f.valor - f.valor*f.total_imp_inc)* f.comissao_cn/100;
    })
   
    return Math.round((comissao) * 100) / 100 ;;
}
  
  
  let total_lucro=0;
  let total_comissao=0;
  let total_custo_fixo=0;
  let total_receita=0;

  let i=0;
  let ultimaLinha=false;
  const RELATORIOS_HTML= relatorios.map((item, key)=>{
          let subdata=item[Object.keys(item)[0]];
          let periodo= (Object.keys(item)[0]).split('-');
          periodo = periodo[1]+'-'+ periodo[0];

          if(i == relatorios.length-1){
            //console.log("Ultimo",relatorios.length);
           ultimaLinha=true
         }
         i++;

          let receitaLiquida =calculoReceitaLiquida(subdata);
          
          let custoFixo= subdata[0].brut_salario;
         
          let comissao =calculoComissao(subdata);
          
          let lucro = receitaLiquida- (custoFixo+comissao);
          lucro = Math.round((lucro) * 100) / 100
          
          total_lucro       +=lucro;
          total_comissao    +=comissao;
          total_custo_fixo  +=custoFixo;
          total_receita     +=receitaLiquida;
         
          return (
            <>
              <tr key={key}>
                <th>{periodo}</th>
                <td>{receitaLiquida}</td>
                <td>{custoFixo}</td>
                <td>{comissao}</td>
                <td>{lucro}</td>
              </tr>

             { (ultimaLinha)&&(
                <tr>
                <th>Total</th>
                <td>{Math.round((total_receita) * 100) / 100}</td>
                <td>{Math.round((total_custo_fixo) * 100) / 100}</td>
                <td>{Math.round((total_comissao) * 100) / 100}</td>
                <td>{Math.round(( total_lucro) * 100) / 100 }</td>
                </tr>
              )}
            
            </>
            )
    })

        return(
            
            <div className='relatorio'>
                  <table className="relatorio__tabela table table-striped">
                      <thead>
                        <tr>
                          <th colSpan={5} >{consultor.no_usuario}</th>
                        </tr>

                        <tr>
                          <th >Per??odo</th>
                          <td>Receita L??quida</td>
                          <td>Custo Fixo</td>
                          <td>Comiss??o</td>
                          <td>Lucro</td>
                        </tr>
                      </thead>
                      <tbody>
                          {RELATORIOS_HTML }
                      </tbody>
                      
                    </table>
              </div>
        )

    }

export default consultores_relatorio