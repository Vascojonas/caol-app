import React, {useState, useEffect} from 'react'
import {Outlet} from 'react-router-dom'; 
import Logo from './logo.png'


function Header() {

    const [consultores, setConsultores]=useState([]);
    const [clientes, setClientes]=useState([]);


    useEffect(() => {
         axios.get('comercial/consultores').then(res=>{
           if(res.status === 200)
           {
                //console.log(res.data.consultores)
                setConsultores(res.data.consultores);
           }
         })
     }, []);


    
  return (
    <div>
        <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

            <label htmlFor="navi-toggle" className="navigation__button">
            <span className="navigation__icon">
                
                <span className="navigation__icon--open"><i className="fa-solid fa-bars"></i></span>
                
                <span className="navigation__icon--close"><i className="fa-solid fa-x"></i></span>
            </span>
            </label> 

            <div className="navigation__background"> </div>
            <nav className="navigation__nav">
                    <ul className="navigation__list">
                        <li className="navigation__item"> <a className="navigation__link" href="#"><i className="fa-solid fa-house"></i> Agence</a></li>
                        <li className="navigation__item"> <a className="navigation__link" href="#"><i className="fa-solid fa-list-check"></i> Projectos</a></li>
                        <li className="navigation__item"> <a className="navigation__link" href="#"><i className="fa-solid fa-gears"></i> Administrativo</a></li>
                        <li className="navigation__item"> <a className="navigation__link" href="#"><i className="fa-solid fa-users"></i> Comercial</a></li>
                        <li className="navigation__item"> <a className="navigation__link" href="#"><i className="fa-solid fa-coins"></i> Financeiro</a></li>
                        <li className="navigation__item"> <a className="navigation__link" href="#"><i className="fa-solid fa-user"></i> Usuário</a></li>
                        <li className="navigation__item"> <a className="navigation__link" href="#"><i className="fa-solid fa-power-off"></i> Sair</a></li>
                    </ul>
                </nav>
            </div>

            <header className="header">
                <div className="header__box">
                    <img className="header__box--logo" src={Logo} alt="logo"/>
                </div>

            
            </header>

            <main>
                <Outlet context={[consultores, setConsultores]} />        
            </main>
    </div>
  )
}

export default Header