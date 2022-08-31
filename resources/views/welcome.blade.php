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
        
        <link rel="stylesheet" href="path/to/your/charts.min.css">


        @viteReactRefresh
        @vite(['resources/scss/app.scss', 'resources/css/app.css', 'resources/js/app.jsx'])

    </head>
    <body >

        <div id="app">
            <div id="app" data="{{ session('message') }}"
                @if(Route::has('https'))
                    <!-- scure asset to fetch from https -->
                    assetPath="{}">assetPath="{}"
                @else
                    assetPath="{}"
                @endif
        
             </div>
        </div>


    </body>
</html>
