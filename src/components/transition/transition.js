import React from 'react'
import './transition.scss';
import { Link } from 'react-router-dom';


export const Transition = () => {
    return(

        <div id="transition">
            <div id="trans_name">
                <div id="name">
                    Duplicated <span>from</span> <a href="https://wovenmagazine.com" target="_blank" rel="noreferrer noopener">Woven</a> 
                </div>
            </div>
            <div id="trans_about">
                <div id="about">
                <h5>
                    About
                </h5>
                <h5>
                    the home page was duplicated to exercise my web writing skills, 
                    & the rest was developed to employ the frontend and backend technologies you can read about them <Link to="/about" ><b>here</b></Link>.
                </h5>
                </div>
            </div>
            <div id="trans_trans">
                <div id="symb">
                    <div className="horizontal_line0"><hr /></div>
                </div>
                <div id="trans_tag"><p>Duplicated Projects</p></div>
            </div>
        </div>

    )
}