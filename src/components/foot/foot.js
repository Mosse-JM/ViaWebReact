import React from 'react'
import './foot.scss';
import { Link } from 'react-router-dom';


export const Foot = () => {
    return(

        <div id="foot">
            {/*<!--**********************************************the foot**********************************************-->*/}

          <div id="foot_table">
            <table>
                <tbody>
                    <tr>
                        <td><Link to="/" >Home</Link></td>
                        <td><Link to="/about" >About us</Link></td>
                        <td><Link to="/productDisplay" >Products</Link></td>
                        <td><Link to="/technologies" >Community</Link></td>
                        <td><span>Via Web 2019</span></td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
      
      

    )
}