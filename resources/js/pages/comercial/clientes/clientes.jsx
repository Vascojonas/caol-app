import React, { useState, useEffect } from 'react'
import {useOutletContext, NavLink } from 'react-router-dom';
import Relatorios from './clientes_relatorio';
import Graficos from './clientes_graficos';
import PieChar from './clientes_pizza';


function clientes() {

     //lista de clientes selecionados
     const [clientes, setClientes] = useState([]);

     const [datas, setData]= useState({
         inicio: '2007-01-01',
         fim: '2022-01-01'
     })
 
     const [anosEntre, setAnos]=useState([2007]);
 
     const [relatorio, setRelatorio]= useState(false);
     const [graficos, setGraficos]= useState(false);
     const [pizza, setPizza]= useState(false);
 
 
     //lista de clientes selecionados
     const[selecionados, setSelecionados]=useState([]);
     const[searchValue, setSearchValue]=useState([]);
     const[Pesquisar, setPesquisar]=useState(false);
 
 
     const visualizarRelatorios =()=>{
         setRelatorio(!relatorio)
         setGraficos(false);
         setPizza(false);
     }
     const visualizarGraficos =()=>{
         setGraficos(!graficos)
         setRelatorio(false)
         setPizza(false);
     }
     const visualizarPizza =()=>{
         setPizza(!pizza)
         setRelatorio(false)
         setGraficos(false);
     }
     

     useEffect(() => {
        axios.get('comercial/clientes/listar').then(res=>{
          if(res.status === 200)
          {
               //console.log(res.data.clientes)
               setClientes(res.data.clientes);
          }
        })
    }, []);

 
     //funcao para actualizar periodo
     const handleDate = (e) => {
         e.persist();
         setData({...datas, [e.target.name]: e.target.value })
 
 
         let inicio = ((datas.inicio).split("-"))[0];
         let fim = ((datas.fim).split("-"))[0];
 
         let yearsBetween =[];
         for(let i=inicio; i <= fim ; i++){
             yearsBetween.push(i);
         }
         setAnos(yearsBetween);
        
         setPizza(false);
         setRelatorio(false)
         setGraficos(false);
         //console.log("Inicio",datas.inicio,  "fim", datas.fim);
     }
 
     //funcao para pesquisar por nome
     const search= (e)=>{
 
         let value=e.target.value;
         if(value){
             setPesquisar(true);
             
             let result=[];
             try {
                 
                 result = clientes.filter((item)=>((item.no_usuario).toUpperCase()).search(value.toUpperCase()) != -1)
             } catch (err) {
                // console.log(err);
             }
 
             if(result){
 
                 setSearchValue(result)
             }else{
                PESQUISA_HTML= <div> Nome não encontrado</div>
             }
         }else{
             setPesquisar(false);
         }
     }
 
     //funcao para gest
     const checkAction=(e, id)=>{
     
         if(e.target.checked){
 
             //console.log(id);
 
             let child =document.getElementById(id);
             document.getElementById('selected').appendChild(child);
 
             let cliente = clientes.filter((item)=> item.co_cliente===id);
             let auxilist=[];
             auxilist.push(...selecionados);
             auxilist.push(...cliente);
             setSelecionados([...auxilist]);
             
             //console.log(selecionados);
             
         }else{
 
             let child =document.getElementById(id);
             document.getElementById('unselected').appendChild(child);
             setSelecionados(selecionados.filter((data)=> data.co_cliente!==id));
             //console.log(selecionados);
 
             setPizza(false);
             setRelatorio(false)
             setGraficos(false);
         }
     }
 
     //lista de todos os clientes
     let  CLIENTES_HTML=clientes.map((cliente, key)=>{
         
         return(
             <div key={key} id={cliente.co_cliente} className="card__list">
                 <span className="card__list--text paragraph">
                     {cliente.no_fantasia}
                 </span>
                 <input onClick={(e)=>{checkAction(e,cliente.co_cliente)}} value={cliente.co_cliente} className='card__list--checkbox' type="checkbox"></input>
             </div>
         )
     })
 
     let RELATORIOS_HTML = () =>(

             <section  className='relatorio-section'>
                 <Relatorios clientes={selecionados}  periodo={datas}/>
             </section>
     )
    
     let GRAFICOS_HTML = anosEntre.map((ano, key)=>{
         
         return(
             <section key={key} className='graficos-section'>
                 <Graficos  clientes={selecionados}  periodo={ano}/>
             </section>
         )
     })
 
     let PIZZA_HTML =  anosEntre.map((ano, key)=>{
         return(
             <section key={key} className='relatorio-section'>
                 <PieChar  clientes={selecionados}  periodo={ano}/>
             </section>
         )
     })
 
  return (
    <main>

    <section className="main-section">
        
        {/*<div className="search form_group  u-margin-top-big u-margin-bottom-small ">
            <input className="search__input form__input" type="search" placeholder="Pesquisar..."  id="search" 
            onChange={(e)=>search(e)}/>
        </div>*/}
        
        
        <div className="selection u-margin-top-big">

            <div className="selection__btn">
                    <NavLink to={'/'} className="selection__btn--cliente btn btn--green btn--small mr-5">Consultores</NavLink>                    
                    <NavLink  to={'/comercial/clientes'} className="selection__btn--cliente btn btn--green btn--small">Clientes</NavLink>           
            </div>

            <div className="selection__input form_group  u-margin-bottom-small ">
                <label htmlFor="email" className="selection__label mr-1">Período: </label>
                <span className="selection__from--text ">De </span>
                <input className="selection__from--input form__input " name='inicio' type="date" value={datas.inicio}
                   placeholder="dd-mm-yyyy" min="2000-01-01"   onChange={handleDate} />
                <span  className="selection__to--text">Até </span>
               
                <input className="selection__to--input  form__input " name='fim' type="date" value={datas.fim}
                   placeholder="dd-mm-yyyy" min="2000-01-01" onChange={handleDate}  />
            </div>


        </div>
        
        <div className="u-margin-top-small">
            <h2 className="heading-secondary">
                Clientes 
            </h2>
        </div>

        <div className="row">
            <div className=" col-1-of-2">
                   {
                       (!Pesquisar)?
                        (
                            <div id="unselected" className="card card__scroll">
                                {CLIENTES_HTML}
                            </div>
                        ):
                        ( 
                            <div id="pesquisa_unselected" className="card card__scroll">
                                {PESQUISA_HTML}
                            </div>
                        )
                   }
            </div>

            <div className="col-1-of-2">
                <div id='selected' className="card card__scroll">
                    
                </div>
            </div>
        </div>

        <div className="realtorio">
            <div className="relatorio__btn">
                <button onClick={visualizarRelatorios} to="clientes/relatores" className="relatorio__btn--relatorio btn  ">Relatório</button>
                <button onClick={visualizarGraficos} className="relatorio__btn--grafico btn  ">Gráfico</button>
                <button onClick={visualizarPizza} className="relatorio__btn--pizza btn  ">Pizza</button>
            </div>
        </div>
    </section>

    {(relatorio)&&
        (
          <div className='relatorios-section'>
             { RELATORIOS_HTML() }
          </div>
        )
    }

    {(graficos)&&
        (
          <div className=''>
             { GRAFICOS_HTML }
          </div>
        )
    }

    {(pizza)&&
        (
          <div className='relatorios-section'>
             { PIZZA_HTML }
          </div>
        )
    }
                
</main>
  )
}

export default clientes