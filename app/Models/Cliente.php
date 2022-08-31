<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $table = 'cao_cliente';
    
    protected $fillable=[
        'co_cliente',
        'no_razao',
        'no_fantasia',
        'no_contato',
        'nu_telefone',
        'nu_ramal',
        'nu_cnpj',
        'ds_endereco',
        'nu_numero',
        'ds_complemento',
        'no_bairro',
        'nu_cep',
        'no_pais',
        'co_ramo',
        'co_cidade',
        'co_status',
        'ds_site',
        'ds_email',
        'ds_cargo_contato',
        'tp_cliente',
        'ds_referencia',
        'co_complemento_status',
        'nu_fax',
        'ddd2',
        'telefone2',
    ];

    public function faturas()
    {
        return $this->hasMany(Fatura::class);
    }
}
