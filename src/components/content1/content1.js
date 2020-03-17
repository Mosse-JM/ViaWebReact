import React from 'react'
import './content1.scss';
import photo20 from '../../assets/images/photo20.jpg';


export const Content1 = () => {

    function handleClick(e) {
        e.preventDefault();
    }
    function seeMoreClickHandler(){
        document.getElementById('hide').style.display='block'; 
        document.getElementById('see_more').style.display='none';
    }
    function seeLessClickHandler(){
        document.getElementById('hide').style.display='none';
        document.getElementById('see_more').style.display='block';
    }

    return(
        <div id="content1">
        {/*<!--**********************************************the content1(projects)**********************************************-->*/}

        
          <div id="left">
              <div id="left_content1">
                <div className="cont_ainer">
                <div className="content1_images"><img src={photo20} alt="project N"/></div>
                <div className="content1_scripts">
                  <p className="the_website">the website</p>
                  <p className="the_category"><button onClick={handleClick}>The category</button></p>
                  <p className="the_description">short description</p>
                </div>
                <div className="middle">
                  <p className="hover_text"><button onClick={handleClick}>See the Project</button></p>
                </div>
                </div>
              </div>
              <div id="left_content2">
                <div className="cont_ainer">
                <div className="content1_images"><img src={photo20} alt="project N"/></div>
                <div className="content1_scripts">
                  <p className="the_website">the website</p>
                  <p className="the_category"><button onClick={handleClick}>The category</button></p>
                  <p className="the_description">short description</p>
                </div>
                <div className="middle">
                  <p className="hover_text"><button onClick={handleClick}>See the Project</button></p>
                </div>
                </div>
              </div>
          </div>
          <div id="right">
              <div id="right_content1">
                <div className="cont_ainer">
                <div className="content1_images"><img src={photo20} alt="project N"/></div>
                <div className="content1_scripts">
                  <p className="the_website">the website</p>
                  <p className="the_category"><button onClick={handleClick}>The category</button></p>
                  <p className="the_description">short description</p>
                </div>
                <div className="middle">
                  <p className="hover_text"><button onClick={handleClick}>See the Project</button></p>
                </div>
                </div>
              </div>
              <div id="right_content2">
                <div className="cont_ainer">
                <div className="content1_images"><img src={photo20} alt="project N"/></div>
                <div className="content1_scripts">
                  <p className="the_website">the website</p>
                  <p className="the_category"><button onClick={handleClick}>The category</button></p>
                  <p className="the_description">short description</p>
                </div>
                <div className="middle">
                  <p className="hover_text"><button onClick={handleClick}>See the Project</button></p>
                </div>
                </div>
              </div>
          </div>
          <div id="jack">
            <div id="see_more"><button onClick={seeMoreClickHandler}>SEE MORE</button></div>
            
            <div id="hide">
              <div id="left_content3">
                  <div className="cont_ainer">
                    <div className="content1_images"><img src={photo20} alt="project N"/></div>
                    <div className="content1_scripts">
                      <p className="the_website">the website</p>
                      <p className="the_category"><button onClick={handleClick}>The category</button></p>
                      <p className="the_description">short description</p>
                    </div>
                    <div className="middle">
                      <p className="hover_text"><button onClick={handleClick}>See the Project</button></p>
                    </div>
                  </div>
              </div>
              <div id="right_content3">
                  <div className="cont_ainer">
                    <div className="content1_images"><img src={photo20} alt="project N"/></div>
                    <div className="content1_scripts">
                      <p className="the_website">the website</p>
                      <p className="the_category"><button onClick={handleClick}>The category</button></p>
                      <p className="the_description">short description</p>
                    </div>
                    <div className="middle">
                      <p className="hover_text"><button onClick={handleClick}>See the Project</button></p>
                    </div>
                  </div>
              </div>
              <div id="see_less"><button onClick={seeLessClickHandler}>SEE LESS</button></div>
            </div>
          </div>
      </div>
      

    )
}