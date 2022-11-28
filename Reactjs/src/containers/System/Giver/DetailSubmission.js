import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { dateFormat } from "../../../utils";
import moment from "moment";
import "./News.scss";
import ScrollUp from "../../../components/ScrollUp";
import Header from "../../Header/Giver/Header";
import Footer from "../../Footer/Footer";
import { allSubmissions } from "../../../services/submissionService";

class DetailSubmission extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.state = {
      arrCompetition: [],
      submissionDetail: {},
      currentDate: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let submissionId = this.props.match.params.id;
      console.log("submissionId", submissionId);
      let res = await allSubmissions(submissionId);
      console.log(res);
      if (res && res.errCode === 0) {
        this.setState(
          {
            submissionDetail: res.submissions,
          },
          () => {
            console.log("submissionDetail", this.state.submissionDetail);
          }
        );
      }
    }
  }

  render() {
    let { submissionDetail } = this.state;
    // let imageBase64 = ''
    // imageBase64 = new Buffer(competitionDetail.avatar, 'base64').toString('binary')
    return (
      <>
        <ScrollUp />
        <Header />

        <div className="submission-detail">
          <div className="title-submission-detail">
            {submissionDetail?.title}
          </div>
          <div className="line"></div>
          <div className="wrapper-info-submission">
            <div className="d-flex row info-submisser">
              <div className="title-text">Bài dự thi được đăng bởi: </div>
              <div className="info-text">
                {submissionDetail?.participantData?.firstName}{" "}
                {submissionDetail?.participantData?.lastName}
              </div>
            </div>
            <div className="d-flex row info-submisser">
              <div className="title-text">Ngày đăng: </div>
              <div className="info-text">
                {moment(submissionDetail.createdAt).format(
                  dateFormat.FORMATT_DATE_TIME
                )}
              </div>
            </div>
          </div>
          <div className="submission-detail-content mt-5">
            <div className="frames-header row">
              <div className="frames-img col-3">
                <img src={submissionDetail?.avata} />
              </div>
            </div>

            <div className="gach"></div>

            <div
              className="cont-content mt-5"
              dangerouslySetInnerHTML={{
                __html: submissionDetail.contentHTML,
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
  connect(mapStateToProps, mapDispatchToProps)(DetailSubmission)
);
