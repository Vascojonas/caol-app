<?php

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;


if (App::environment('production')) {
    URL::forceScheme('https');
}
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//consultores
Route::get('comercial/consultores',[\App\Http\Controllers\AppController::class, 'getConsultores']);
Route::get('comercial/consultores/relatorios/{consultor}/{inicio}/{fim}',[\App\Http\Controllers\AppController::class, 'consultorRelatorios']);
Route::get('comercial/consultores/graficos/{data}',[\App\Http\Controllers\AppController::class, 'consultoresGraficos']);

//Clientes
Route::get('comercial/clientes/listar',[\App\Http\Controllers\AppController::class, 'getClientes']);
Route::get('comercial/clientes/relatorios/{inicio}/{fim}',[\App\Http\Controllers\AppController::class, 'clientesRelatorios']);
Route::get('comercial/clientes/graficos/{data}',[\App\Http\Controllers\AppController::class, 'clientesGraficos']);


Route::get('/', function () {
    return view('welcome');
});

Route::get('/comercial/clientes', function () {
    return view('welcome');
});


