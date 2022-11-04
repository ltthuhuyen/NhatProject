import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { allNews } from "../../../services/newsService";
import { dateFormat } from "../../../utils";
import moment from "moment";
import "./News.scss";
import Header from "../../Header/Giver/Header";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";

class DetailNews extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.state = {
      arrNews: [],
      newsDetail: {},
      currentDate: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let newsID = this.props.match.params.id;
      let res = await allNews(newsID);
      if (res && res.errCode === 0) {
        this.setState({
          newsDetail: res.news,
        });
      }
    }
  }

  render() {
    let newsDetail = this.state.newsDetail;
    return (
      <>
        <ScrollUp />
        <Header />
        <div className="news-detail">
          <div className="title-news-detail">{newsDetail.title}</div>
          <div className="line"></div>
          <div className="news-detail-content">
            <div className="frames-header row">
              <div className="frames-img col-3">
                <img src={newsDetail.avatar} />
              </div>
            </div>

            <div className="gach"></div>

            <div
              className="cont-content mt-3"
              dangerouslySetInnerHTML={{ __html: newsDetail.contentHTML }}
            ></div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // news: state.news.News,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllNews: (id) => dispatch(actions.getAllNews(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailNews)
);
