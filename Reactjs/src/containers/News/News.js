import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { allNewsLimit } from "../../services/newsService";
import { dateFormat } from "../../utils";
import moment from "moment";
import * as BsIcons from "react-icons/bs";
import "./News.scss";

class News extends Component {
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
    let res = await allNewsLimit("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrNews: res.news,
      });
    }
  }

  componentDidUpdate(prevProps, presState, snapshot) {
    if (prevProps.news !== this.props.news) {
      this.setState({
        arrNews: this.props.news,
      });
    }
  }

  handleClick = () => {
    this.props.history.push(`/news`);
  };

  handleDetailNews = (news) => {
    this.props.history.push(`/giver/news-detail/${news.id}`);
  };

  render() {
    let arrNews = this.state.arrNews;

    return (
      <>
        <div className="news">
          <div className="title-news">TIN TỨC</div>
          <div className="line"></div>
          <div className="news-content">
            <div className="row">
              {arrNews &&
                arrNews.map((item, index) => {
                  let imageBase64 = "";
                  if (item.avatar) {
                    imageBase64 = new Buffer(item.avatar, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="col-4 content">
                      <div className="img-pro ">
                        <img src={imageBase64} className="img-pro" />
                      </div>
                      <div className="info-news">
                        <div
                          className="title"
                          onClick={() => this.handleDetailNews(item)}
                        >
                          {item.title}
                        </div>
                        <div className="time">
                          <BsIcons.BsCalendarDate className="icon" />{" "}
                          {moment(item.createdAt).format(
                            dateFormat.SEND_TO_SERVER
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="btn btn-limit-news"
            onClick={() => this.handleClick()}
          >
            <BsIcons.BsArrowDown className="icon" />
            Xem thêm
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
