import React from 'react'

function consultores_graficos() {
  return (

    
      <table class="tabela -ml-6charts-css column show-labels show-data-on-hover show-primary-axis show-10-secondary-axes show-data-axes multiple data-spacing-10 reverse-data reverse-dataset">
        <caption>Years Compared</caption>
        <thead className='tabela__thead'>
          <tr>
            <th>Year</th>
            <th>Progress 1</th>
            <th>Progress 2</th>
            <th>Progress 3</th>
            <th>Progress 4</th>
            <th>Progress 5</th>
          </tr>
        </thead>
        <tbody className=' tabela__tbody'>
          <tr>
            <th scope="row">2000</th>
            <td > <span class="data"> 20 </span> </td>
            <td > <span class="data"> 50 </span> </td>
            <td > <span class="data"> 100 </span> </td>
            <td > <span class="data"> 70 </span> </td>
            <td > <span class="data"> 40 </span> </td>
          </tr>
          <tr>
            <th scope="row">2020</th>
            <td > <span class="data"> 20 </span> </td>
            <td > <span class="data"> 40 </span> </td>
            <td > <span class="data"> 60 </span> </td>
            <td > <span class="data"> 80 </span> </td>
            <td > <span class="data"> 100 </span> </td>
          </tr>
      </tbody>
    </table>
  )
}

export default consultores_graficos