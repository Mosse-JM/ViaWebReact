import React from 'react'
import './top.scss';
import photo3 from '../../assets/images/photo3.jpg';

export const Top = () => {
    return(

        <div id="top">
                {/*<!--**********************************************top (the preview (image,script))**********************************************-->*/}
            <div id="preview">
                <div id="preview_image">
                <img id="myImg" src={photo3} alt="the preview of one of the projects" />
                </div>
                <div id="preview_script">
                <div id="subject"><p>The Subject</p></div>
                <div id="read_this"><p>READ THIS STORY</p></div>
                </div>
            </div> 
                
        </div>  
    )
}