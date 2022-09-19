import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import './News.scss'
class News extends Component {
    render() {
        return (
            <div className='news'>
                <div className='title-news'>
                    TIN TỨC
                </div>
                <div className='line'></div>
                <div className="row">
                    <div className="col-3">
                        <div className="img">
                            <img className='img-pro'/>
                        </div>
                       <div className='news'>
                            <div className=''></div>
                       </div>
                    </div>
                </div>
            </div>

        )
    }
    
}
    
export default (News);