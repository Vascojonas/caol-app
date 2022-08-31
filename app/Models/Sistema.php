<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sistema extends Model
{
    use HasFactory;

    protected $table = 'cao_sistema';
    
    protected $fillable=[
        'co_sistema',
        'co_cliente',
        'co_usuario',
        'co_arquitetura',
        'no_sistema',
        'ds_sistema_resumo',
        'ds_caracteristica',
        'ds_requisito',
        'no_diretoria_solic',
        'ddd_telefone_solic',
        'nu_telefone_solic',
        'no_usuario_solic',
        'dt_solicitacao', 
        'dt_entrega', 
        'co_email'
    ];
       
    public function faturas()
    {
        return $this->hasMany(Fatura::class);
    }
}
