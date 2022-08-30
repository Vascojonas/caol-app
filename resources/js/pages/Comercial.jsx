import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

function Comercial() {

    //lista de consultores selecionados
    const [consultores, setConsultores] = useOutletContext();

    //lista de consultores selecionados
    const[selecionados, setSelecionados]=useState([]);
    const[searchValue, setSearchValue]=useState([]);
    const[Pesquisar, setPesquisar]=useState(false);


    
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
               PESQUISA_HTML= <div> Nome não encontrado</div>
            }
        }else{
            setPesquisar(false);
        }
    }

    //funcao para gest
    const checkAction=(e, id, parent)=>{
    
        if(e.target.checked){
            
            try {
                
                let child =document.getElementById(id);
                document.getElementById(parent).removeChild(child);
                document.getElementById('selected').appendChild(child);
                console.log(child);
            } catch (error) {
                console.log(error);
            }

            //add selected item in  selecionados
            let consultor = consultores.filter((item)=> item.co_usuario===id);
            let auxilist=[];
            auxilist.push(...selecionados);
            auxilist.push(...consultor);
            setSelecionados([...auxilist]);

            //remove  selected item from  consultores
            setConsultores(consultores.filter((data)=> data.co_usuario!==id));
            
        }else{

            try {
                let child =document.getElementById(id);
                document.getElementById('unselected').appendChild(child);
                
            } catch (error) {
                console.log(error)
            }

            //add unselected item in  consultores
            let consultor = selecionados.filter((item)=> item.co_usuario===id);
            let auxilist=[];
            auxilist.push(...consultores);
            auxilist.push(...consultor);
            setConsultores([...auxilist]);

            //remove  selected item from  selecionados
            setSelecionados(selecionados.filter((data)=> data.co_usuario!==id));
        }
    }

    //lista de todos os consultores
    var  CONSULTORES_HTML =consultores.map((consultor, key)=>{
        
        return(
            <div key={key} id={consultor.co_usuario} className="card__list">
                <span className="card__list--text paragraph">
                    {consultor.no_usuario}
                </span>
                <input onClick={(e)=>{checkAction(e,consultor.co_usuario, 'unselected')}} value={consultor.co_usuario} className='card__list--checkbox' type="checkbox"></input>
            </div>
        )
    })


    if(!searchValue){
        var PESQUISA_HTML = searchValue.map((consultor, key)=>{
            return(
                <div key={key} id={consultor.co_usuario} className="card__list">
                    <span className="card__list--text paragraph">
                        {consultor.no_usuario}
                    </span>
                    <input onClick={(e)=>{checkAction(e,consultor.co_usuario,'pesquisa_unselected')}} value={consultor.co_usuario} className='card__list--checkbox' type="checkbox"></input>
                </div>
            )
        })
    }

  return (
    <main>

        <section className="main-section">
            
            {/*<div className="search form_group  u-margin-top-big u-margin-bottom-small ">
                <input className="search__input form__input" type="search" placeholder="Pesquisar..."  id="search" 
                onChange={(e)=>search(e)}/>
            </div>*/}
            
            
            <div className="selection u-margin-top-big">

                <div className="selection__btn">
                    <button className="selection__btn--consultor btn btn--green btn--small mr-5">Consultores</button>
                    <button className="selection__btn--cliente btn btn--green btn--small">Clientes</button>
                </div>

                <div className="selection__input form_group  u-margin-bottom-small ">
                    <label htmlFor="email" className="selection__label mr-1">Período: </label>
                    <span className="selection__from--text ">De </span>
                    <input className="selection__from--input form__input " type="date" />
                    <span  className="selection__to--text">Até </span>
                    <input className="selection__to--input  form__input " type="date" />
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
                    <button className="relatorio__btn btn btn--green ">Relatório</button>
                    <button className="relatorio__btn btn btn--green ">Gráfico</button>
                    <button className="relatorio__btn btn btn--green ">Pizza</button>
                </div>
            </div>
        </section>
    
    </main>
  )
}

export default Comercial;