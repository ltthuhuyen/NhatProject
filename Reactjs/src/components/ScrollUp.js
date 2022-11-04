import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './ScrollUp.scss'
import * as BiIcons from 'react-icons/bi';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



class ScrollUp extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            scroll: false,
        }
      }
  
    componentDidMount() {
        let behaviorScroll = () =>{
            this.setState({
                scroll: (window.pageYOffset > 200)
            })
        }
        window.addEventListener('scroll', behaviorScroll)
        return ()=>{
            window.removeEventListener('scroll', behaviorScroll)
        }
    }

    handleToTop = () =>{
        console.log('first')
        window.scrollTo(0, 200);
        // this.setState({
        //     scroll: false
        // })
    }

    executeScroll = () => this.myRef.current.scrollIntoView()
    render() {
        return (
            <div className='scroll-up' ref={this.myRef}>   
                <button className='btn btn-scroll-up' onClick={() => this.executeScroll()}>
                    <BiIcons.BiChevronUp />
                </button>
            </div>
        
        );
    }
}

const mapStateToProps = state => {
    return {
      
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollUp);