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
        ->orderBy('cao_salario.co_usuario', 'desc')
        ->select('cao_usuario.*')
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


    function consultorRelatorios($consultor, $inicio, $fim){
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

    function consultoresGraficos($data){
        $ano=$data;
        
        if(count((explode("-", $data)))==3){
            $ano = (explode("-", $data)[0]);
        }
        
        $inicio = $ano.'-01-01';
        $fim = $ano.'-12-31';


        $graficos = DB::table('cao_os')
        ->rightJoin('cao_fatura', 'cao_fatura.co_os','=','cao_os.co_os')
        ->leftJoin('cao_usuario', 'cao_os.co_usuario', '=', 'cao_usuario.co_usuario')
        ->leftJoin('cao_salario', 'cao_usuario.co_usuario', '=','cao_salario.co_usuario')
        ->where('data_emissao','>=', $inicio)
        ->where('data_emissao','<=', $fim)
        ->orderBy('cao_fatura.data_emissao', 'desc')
        ->get();

        if($graficos){
    
            return response()->json([
                'status'=> 200,
                'graficos'=> $graficos,
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'graficos'=> $graficos,
            ]);
        }
    }


    function getClientes(){
        $clientes = DB::table('cao_cliente')
        ->where('tp_cliente','=', 'A')
        ->leftJoin('cao_fatura', 'cao_fatura.co_cliente', '=', 'cao_cliente.co_cliente')
        ->where('cao_fatura.co_cliente','<>', null)
        ->orderBy('cao_cliente.no_fantasia', 'asc')
        ->select('cao_cliente.*')
        ->distinct()->get(['cao_cliente.no_fantasia']);
        

        if($clientes){
    
            return response()->json([
                'status'=> 200,
                'clientes'=> $clientes,
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'clientes'=> $clientes,
            ]);
        }

    }

    function clientesRelatorios($inicio, $fim){


        $relatorios = DB::table('cao_fatura')
        ->leftJoin('cao_os', 'cao_fatura.co_os','=','cao_os.co_os')
        ->leftJoin('cao_cliente', 'cao_fatura.co_cliente', '=', 'cao_cliente.co_cliente')
        ->where('cao_fatura.co_cliente', '<>',null)
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

    function clientesGraficos($data){
        $ano=$data;
        
        if(count((explode("-", $data)))==3){
            $ano = (explode("-", $data)[0]);
        }
        
        $inicio = $ano.'-01-01';
        $fim = $ano.'-12-31';


        $graficos = DB::table('cao_fatura')
        ->leftJoin('cao_cliente', 'cao_fatura.co_cliente', '=', 'cao_cliente.co_cliente')
        ->where('data_emissao','>=', $inicio)
        ->where('data_emissao','<=', $fim)
        ->orderBy('cao_fatura.data_emissao', 'desc')
        ->get();

        if($graficos){
    
            return response()->json([
                'status'=> 200,
                'graficos'=> $graficos,
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'graficos'=> $graficos,
            ]);
        }
    }
}
