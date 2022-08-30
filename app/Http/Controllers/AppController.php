<?php

namespace App\Http\Controllers;

use Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppController extends Controller
{
    function getConsultores(){
        $consultores = DB::table('cao_usuario')
        ->leftJoin('permissao_sistema', 
        'permissao_sistema.co_usuario','=', 'cao_usuario.co_usuario')
        ->where('permissao_sistema.in_ativo','S')
        ->where('permissao_sistema.co_sistema',1)
        ->where('permissao_sistema.co_tipo_usuario',0)
        ->orWhere('permissao_sistema.co_tipo_usuario',1)
        ->orWhere('permissao_sistema.co_tipo_usuario',2)
        ->get();

        if($consultores){
    
            return response()->json([
                'status'=> 200,
                'consultores'=> $consultores,
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'consultores'=> $consultores,
            ]);
        }

    }
}
