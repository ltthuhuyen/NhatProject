import React, { Component } from 'react';
import { connect } from "react-redux";
// import HomeHeader from "../../HomePage/HomeHeader";
// import HomeFooter from '../../HomePage/HomeFooter';
import './News.scss';
import { withRouter } from 'react-router';
import { allNews } from '../../services/newsService';
import { dateFormat } from '../../utils';
import moment from 'moment';
import Footer from '../Footer/Footer';

class News extends Component {

    constructor(props) {
        super(props);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        this.state = {
            arrNews: [],
            newsDetail: {},
            currentDate: ''
        }
    }

    async componentDidMount() {
        let res = await allNews("ALL");
        if (res && res.errCode === 0) {
            this.setState({
                arrNews: res.news,
            })
        }
    }

    componentDidUpdate(prevProps, presState, snapshot) {
        if(prevProps.news !== this.props.news){
            this.setState({
                arrNews: this.props.news
            })
        }
    }

    // handleViewNews = () => {
    //     this.props.history.push(`/home-news`)
    // }

    handleDetailNews = (news) => {
        this.props.history.push(`/giver/news-detail/${news.id}`);
    }

    render() {
        // let newsArr = this.state.arrNews;
        let arrNews = this.state.arrNews;
        console.log("arrNews", arrNews)
        // let newsID = this.props.match.params.id;
        return (
            <>
                {/* <HomeHeader isShowBackground={false}/> */}
                
                <div className="News-container">
                    <div className="News-content"></div>
                    <div className="News-frames1">
                        <div className="News-header">
                            <div className="content-up">
                                <div className="News-title">Tin Tức</div>
                            </div>
                        </div>
                        {
                            arrNews && arrNews.map((item, index) => {
                                let imageBase64 =''
                                if (item.avatar) {
                                imageBase64 = new Buffer(item.avatar, 'base64').toString('binary')  
                                }
                                console.log('avata', imageBase64)
                            return(
                            <div className="frames-cont">
                            <div className="frames-header row">
                                <div className="frames-img col-3">
                                    <img src={imageBase64}/>
                                </div>
                                <div className="frames-description col-9">
                                    {/* <div className="description">
                                        {item.description}
                                    </div> */}
                                    <div className="frames-title" onClick={() => this.handleDetailNews(item)}>
                                        <p className='btn btn-default'>
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="frames-time">
                                        <i class="far fa-clock"></i> {moment(item.createdAt).format(dateFormat.SEND_TO_SERVER)}
                                    </div>
                                </div>
                            </div>

                            <div className="gach"></div>

                            {/* <div className="cont-content mt-3" dangerouslySetInnerHTML={{ __html: item.contentHTML }}>
                                
                            </div> */}
                        </div>
                              
                        
                                )
                            })
                         }
                    </div>
                    
                </div>
                
                <Footer/>
                {/* <HomeFooter/> */}

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // news: state.news.News,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getAllNews: (id) => dispatch(actions.getAllNews(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
