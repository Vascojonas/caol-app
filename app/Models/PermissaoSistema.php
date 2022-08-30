<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissaoSistema extends Model
{
    use HasFactory;

    protected $table = 'permissao_sistema';
    
    protected $fillable=[
        'co_usuario',                             
        'co_tio_usuario',                             
        'co_sistem',                               
        'cin_ativo',                                
        'co_usuario_atualizacao',                              
        'dt_atualizacao',                             
    ];

    public function usuario()
    {
        return $this->belongsToMany(Usuario::class);
    }

  
}

