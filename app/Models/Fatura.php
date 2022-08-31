<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fatura extends Model
{
    use HasFactory;

    protected $table = 'cao_fatura';
    
    protected $fillable=[
        'co_fatura',
        'co_cliente',
        'co_sistema',
        'co_os',
        'num_nf',
        'total',
        'valor',
        'data_emissao',
        'corpo_nf',
        'comissao_cn',
        'total_imp_inc'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function sistema()
    {
        return $this->belongsTo(Sistema::class);
    }

    public function os()
    {
        return $this->belongsTo(Os::class);
    }
}
