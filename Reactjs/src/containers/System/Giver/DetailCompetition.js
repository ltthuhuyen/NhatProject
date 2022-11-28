import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { dateFormat } from "../../../utils";
import moment from "moment";
import "./News.scss";
import ScrollUp from "../../../components/ScrollUp";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Giver/Header";
import { allCompetitions } from "../../../services/competitionService";

class DetailCompetition extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.state = {
      arrCompetition: [],
      competitionDetail: {},
      currentDate: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let competitionID = this.props.match.params.id;
      let res = await allCompetitions(competitionID);
      if (res && res.errCode === 0) {
        this.setState({
          competitionDetail: res.competitions,
        });
      }
    }
  }

  render() {
    let { competitionDetail } = this.state;
    // let imageBase64 = ''
    // imageBase64 = new Buffer(competitionDetail.avatar, 'base64').toString('binary')
    return (
      <>
        <ScrollUp />
        <Header />
        <div className="competition-detail">
          <div className="title-competition-detail">
            {competitionDetail?.title}
          </div>
          <div className="line"></div>
          <div className="competition-detail-content">
            <div className="frames-header row">
              <div className="frames-img col-3">
                <img src={competitionDetail?.avata} />
              </div>
            </div>

            <div className="gach"></div>

            <div
              className="cont-content mt-3"
              dangerouslySetInnerHTML={{
                __html: competitionDetail.contentHTML,
              }}
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
    //competition: state.news.News,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllNews: (id) => dispatch(actions.getAllNews(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailCompetition)
);
