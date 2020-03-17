import React from 'react'
import './home.scss';
import photo3 from '../../assets/images/photo3.jpg';

import {Top} from '../top/top';
import {Transition} from '../transition/transition';
import {Content1} from '../content1/content1';
import {Content2} from '../content2/content2';
import {Content3} from '../content3/content3';
import {Foot} from '../foot/foot'; 


export const Home = () => {
    return(
        
        <div id="body">
        <Top />
        {/*<!--the container which includes [transition(trans_name,trans_about,trans_trans), content1(projects), content2(selected design), content3(featured effects), foot(image,script)]-->*/}
            
        <div id="container">
        <div id="invisib"><img id="my_Img" src={photo3} alt="the preview of one of the projects" /></div>
        
        <Transition />
        <Content1 />
        <Content2 />
        <Content3 />
        <Foot />  
        </div>
        </div>
    )

}

