import React, { useState } from 'react'
import {useOutletContext, NavLink } from 'react-router-dom';
import Relatorios from './consultores_relatorio';
import Graficos from './consultores_graficos';
import PieChart from './consultores_pizza';

function Consultores() {

    //lista de consultores selecionados
    const [consultores, setConsultores] = useOutletContext();

    const [datas, setData]= useState({
        inicio: '2007-01-01',
        fim: '2022-01-01'
    })

    const [anosEntre, setAnos]=useState([2007]);

    const [relatorio, setRelatorio]= useState(false);
    const [graficos, setGraficos]= useState(false);
    const [pizza, setPizza]= useState(false);


    //lista de consultores selecionados
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
                
                result = consultores.filter((item)=>((item.no_usuario).toUpperCase()).search(value.toUpperCase()) != -1)
            } catch (err) {
               // console.log(err);
            }

            if(result){

                setSearchValue(result)
            }else{
               PESQUISA_HTML= <div> Nome n??o encontrado</div>
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

            let consultor = consultores.filter((item)=> item.co_usuario===id);
            let auxilist=[];
            auxilist.push(...selecionados);
            auxilist.push(...consultor);
            setSelecionados([...auxilist]);

            setPizza(false);


            //console.log(selecionados);
            
        }else{

            let child =document.getElementById(id);
            document.getElementById('unselected').appendChild(child);
            setSelecionados(selecionados.filter((data)=> data.co_usuario!==id));
            //console.log(selecionados);

            setPizza(false);
            setRelatorio(false)
            setGraficos(false);
        }
    }

    //lista de todos os consultores
    let  CONSULTORES_HTML =consultores.map((consultor, key)=>{
        
        return (consultor.co_usuario)&&(
            <div key={key} id={consultor.co_usuario} className="card__list">
                <span className="card__list--text paragraph">
                    {consultor.no_usuario}
                </span>
                <input onClick={(e)=>{checkAction(e,consultor.co_usuario)}} value={consultor.co_usuario} className='card__list--checkbox' type="checkbox"></input>
            </div>
        )
    })

    let RELATORIOS_HTML = selecionados.map((item, key)=>{
        return(
            <section key={key} className='relatorio-section'>
                <Relatorios  consultor={item}  periodo={datas}/>
            </section>
        )
    })

    let GRAFICOS_HTML = anosEntre.map((ano, key)=>{
    
        return(
            <section key={key} className='graficos-section'>
                <Graficos  consultores={selecionados}  periodo={ano}/>
            </section>
        )
    })

    let PIZZA_HTML = anosEntre.map((ano, key)=>{
        return(
            <section key={key} className='relatorio-section'>
                <PieChart  consultores={selecionados}  periodo={ano}/>
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
                    <NavLink to={'/'} className="selection__btn--consultor btn btn--green btn--small mr-5">Consultores</NavLink>
                    <NavLink  to={'/comercial/clientes'} className="selection__btn--cliente btn btn--green btn--small">Clientes</NavLink>
                </div>

                <div className="selection__input form_group  u-margin-bottom-small ">
                    <label htmlFor="email" className="selection__label mr-1">Per??odo: </label>
                    <span className="selection__from--text ">De </span>
                    <input className="selection__from--input form__input " name='inicio' type="date" value={datas.inicio}
                       placeholder="dd-mm-yyyy" min="2000-01-01"   onChange={handleDate} />
                    <span  className="selection__to--text">At?? </span>
                   
                    <input className="selection__to--input  form__input " name='fim' type="date" value={datas.fim}
                       placeholder="dd-mm-yyyy" min="2000-01-01" onChange={handleDate}  />
                </div>


            </div>
            
            <div className="u-margin-top-small">
                <h2 className="heading-secondary">
                    Consultores
                </h2>
            </div>

            <div className="row">
                <div className=" col-1-of-2">
                       {
                           (!Pesquisar)?
                            (
                                <div id="unselected" className="card card__scroll">
                                    {CONSULTORES_HTML}
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
                    <button onClick={visualizarRelatorios} to="consultores/relatores" className="relatorio__btn--relatorio btn  ">Relat??rio</button>
                    <button onClick={visualizarGraficos} className="relatorio__btn--grafico btn  ">Gr??fico</button>
                    <button onClick={visualizarPizza} className="relatorio__btn--pizza btn  ">Pizza</button>
                </div>
            </div>
        </section>

        {(relatorio)&&
            (
              <div className='relatorios-section'>
                 { RELATORIOS_HTML }
              </div>
            )
        }

        {(graficos)&&
            (
              <div className='u-margin-top-big'>
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

export default Consultores;