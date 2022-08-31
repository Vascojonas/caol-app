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
        ->leftJoin('cao_salario', 'cao_salario.co_usuario', '=','cao_usuario.co_usuario')
        ->where('permissao_sistema.in_ativo','S')
        ->where('permissao_sistema.co_sistema',1)
        ->where('permissao_sistema.co_tipo_usuario',0)
        ->orWhere('permissao_sistema.co_tipo_usuario',1)
        ->orWhere('permissao_sistema.co_tipo_usuario',2)
        ->orderBy('cao_salario.co_usuario', 'asc')
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


    function relatorios($consultor, $inicio, $fim){
        $relatorios = DB::table('cao_os')
        ->rightJoin('cao_fatura', 'cao_fatura.co_os','=','cao_os.co_os')
        ->leftJoin('cao_usuario', 'cao_os.co_usuario', '=', 'cao_usuario.co_usuario')
        ->leftJoin('cao_salario', 'cao_usuario.co_usuario', '=','cao_salario.co_usuario')
        ->where('cao_usuario.co_usuario','=',$consultor)
        ->where('data_emissao','>=', $inicio)
        ->where('data_emissao','<=', $fim)
        ->orderBy('cao_fatura.data_emissao', 'desc')
        ->get();

        if($relatorios){
    
            return response()->json([
                'status'=> 200,
                'relatorios'=> $relatorios,
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'relatorios'=> $relatorios,
            ]);
        }
    }
}
