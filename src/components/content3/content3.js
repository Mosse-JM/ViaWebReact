import React from 'react'
import './content3.scss';
import photo13 from '../../assets/images/photo13.jpg';


export const Content3 = () => {
    return(

        <div id="content3">
            {/*<!--**********************************************the content3(Featured Effects)**********************************************-->*/}

          <div className="horizontal_line1"><hr /></div>  
          <p>Featured Technologies</p>
          <div id="features">
            <div id="feature1">
              <div className="feature_images"><img src={photo13} alt="project N"/></div>
              <div className="feature_descriptions">feature1<br/>the description on evry feature is writen here</div>
            </div>
            <div id="feature2">
              <div className="feature_images"><img src={photo13} alt="project N"/></div>
              <div className="feature_descriptions">feature2<br/>the description on evry feature is writen here</div>
            </div>
            <div id="feature3">
              <div className="feature_images"><img src={photo13} alt="project N"/></div>
              <div className="feature_descriptions">feature3<br/>the description on evry feature is writen here</div>
            </div>
            <div id="feature4">
              <div className="feature_images"><img src={photo13} alt="project N"/></div>
              <div className="feature_descriptions">feature4<br/>the description on evry feature is writen here</div>
            </div>
          </div>
          <div className="horizontal_line2"><hr /></div> 
        </div>
                

    )
}