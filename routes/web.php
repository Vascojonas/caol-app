<?php

use Illuminate\Support\Facades\Route;

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


Route::get('comercial/consultores',[\App\Http\Controllers\AppController::class, 'getConsultores']);
Route::get('comercial/consultores/relatorios/{consultor}/{inicio}/{fim}',[\App\Http\Controllers\AppController::class, 'relatorios']);


Route::get('/', function () {
    return view('welcome');
});
