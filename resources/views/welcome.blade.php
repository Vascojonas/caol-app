<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/365b7ed373.js" crossorigin="anonymous"></script>        

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">

        @vite(['resources/scss/app.scss', 'resources/css/app.css', 'resources/js/app.js'])

    </head>
    <body >


    <div class="navigation">
        <input type="checkbox" class="navigation__checkbox" id="navi-toggle">

        <label for="navi-toggle" class="navigation__button">
           <span class="navigation__icon">
               
               <span class="navigation__icon--open"><i class="fa-solid fa-bars"></i></span>
            
               <span class="navigation__icon--close"><i class="fa-solid fa-x"></i></span>
        </span>
        </label> 

        <div class="navigation__background"> </div>
            <nav class="navigation__nav">
                <ul class="navigation__list">
                    <li class="navigation__item"> <a class="navigation__link" href="#"><i class="fa-solid fa-house"></i> Agence</a></li>
                    <li class="navigation__item"> <a class="navigation__link" href="#"><i class="fa-solid fa-list-check"></i> Projectos</a></li>
                    <li class="navigation__item"> <a class="navigation__link" href="#"><i class="fa-solid fa-gears"></i> Administrativo</a></li>
                    <li class="navigation__item"> <a class="navigation__link" href="#"><i class="fa-solid fa-users"></i> Comercial</a></li>
                    <li class="navigation__item"> <a class="navigation__link" href="#"><i class="fa-solid fa-coins"></i> Financeiro</a></li>
                    <li class="navigation__item"> <a class="navigation__link" href="#"><i class="fa-solid fa-user"></i> Usuário</a></li>
                    <li class="navigation__item"> <a class="navigation__link" href="#"><i class="fa-solid fa-power-off"></i> Sair</a></li>
                </ul>
            </nav>
    </div>
    
    <header class="header">
        <div class="header__logo-box">
            <img class="header__logo" src="{{ asset('img/logo.png') }}" alt="logo"/>
        </div>

       
    </header>


    <main>

        <section class="main-section">
            
            <div class="search form_group  u-margin-top-big u-margin-bottom-small ">
                <input class="search__input form__input" type="search" placeholder="Pesquisar..." name=pesquisa id="search"/>
            </div>
            
            
            <div class="selection">

                <div class="selection__btn">
                    <button class="selection__btn--consultor btn btn--green btn--small mr-5">Consultores</button>
                    <button class="selection__btn--cliente btn btn--green btn--small">Clientes</button>
                </div>

                <div class="selection__input form_group  u-margin-bottom-small ">
                    <label for="email" class="selection__label mr-1">Período: </label>
                    <span class="selection__from--text ">De </span>
                    <input class="selection__from--input form__input " type="date"  name=pesquisa id="search"/>
                    <span  class="selection__to--text">Até </span>
                    <input class="selection__to--input  form__input " type="date" id="search"/>
                </div>


            </div>
            
            <div class="u-margin-top-small">
                <h2 class="heading-secondary">
                   Consultores
                </h2>
            </div>

            <div class="row">
                <div class=" col-1-of-2">
                    <div class="card card__scroll">

                    </div>
                </div>

                <div class="col-1-of-2">
                    <div class="card card__scroll">
                        
                    </div>
                </div>
            </div>

            <div class="realtorio">
                <div class="relatorio__btn">
                    <button class="relatorio__btn btn btn--green ">Relatório</button>
                    <button class="relatorio__btn btn btn--green ">Gráfico</button>
                    <button class="relatorio__btn btn btn--green ">Pizza</button>
                </div>
            </div>
        </section>
       
    </main>

    </body>
</html>
