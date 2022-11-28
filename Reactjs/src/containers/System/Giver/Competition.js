import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { dateFormat } from "../../../utils";
import moment from "moment";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import HeaderR2 from "../../Header/Giver/Header";
import HeaderR3 from "../../Header/Recipient/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import "./News.scss";
import { allCompetitions } from "../../../services/competitionService";
import {
  allSubmissions,
  allSubmissionsByCompetition,
  countSubmissionsByCompetition,
} from "../../../services/submissionService";

class Competition extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    // currentDate.setHours(0,0,0,0);
    this.state = {
      arrSubmissions: [],
      arrSubmissionsByCompetition: [],
      countSubmission: [],
      newsDetail: {},
      currentDate: "",
    };
  }

  async componentDidMount() {
    await this.getAllCompetitionsFromReact();
    await this.getAllSubmissionsFromReact();
    await this.getAllSubmissionsByCompetitiveFromReact();
    await this.countAllSubmissionsByCompetitiveFromReact();
  }

  getAllCompetitionsFromReact = async () => {
    let response = await allCompetitions("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrCompetitions: response.competitions,
      });
    }
  };

  getAllSubmissionsFromReact = async () => {
    let response = await allSubmissions("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrSubmissions: response.submissions,
      });
    }
  };

  getAllSubmissionsByCompetitiveFromReact = async () => {
    let res = await allSubmissionsByCompetition();
    if (res && res.errCode === 0) {
      this.setState({
        arrSubmissionsByCompetition: res.submissions,
      });
    }
  };

  countAllSubmissionsByCompetitiveFromReact = async () => {
    let res = await countSubmissionsByCompetition("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        countSubmission: res.submissions,
      });
    }
  };

  handleDetailCompetition = (competition) => {
    this.props.history.push(`/competition-detail/${competition.id}`);
  };

  handleSeeSubmission = (competition) => {
    let userInfo = this.props.userInfo;
    if (!userInfo) {
      this.props.history.push(`/submission-by-competition/${competition.id}`);
    } else if (userInfo && userInfo.roleId === "R2") {
      this.props.history.push(
        `/giver/submission-by-competition/${competition.id}`
      );
    } else if (userInfo && userInfo.roleId === "R3") {
      this.props.history.push(
        `/recipient/submission-by-competition/${competition.id}`
      );
    }
  };

  handleCreateSubmission = (competition) => {
    let userInfo = this.props.userInfo;
    if (userInfo && userInfo.roleId === "R2") {
      this.props.history.push(
        `/giver/submission-by-competition/${competition.id}`
      );
    } else if (userInfo && userInfo.roleId === "R3") {
      this.props.history.push(
        `/recipient/submission-by-competition/${competition.id}`
      );
    }
  };

  render() {
    let { arrCompetitions, countSubmission } = this.state;
    let userInfo = this.props.userInfo;

    return (
      <>
        <ScrollUp />
        {!userInfo || userInfo.roleId === "R2" ? <HeaderR2 /> : <HeaderR3 />}

        <Banner />
        <div className="competition">
          <div className="title-competition">CUỘC THI</div>
          <div className="line"></div>
          <div className="competition-container">
            {arrCompetitions &&
              arrCompetitions.map((item, index) => {
                let imageBase64 = "";
                if (item.avatar) {
                  imageBase64 = new Buffer(item.avatar, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div className="row">
                    <div
                      className="content d-flex"
                      onClick={() => this.handleDetailCompetition(item)}
                    >
                      <div className="col-4 img">
                        <img src={imageBase64} className="img-pro" />
                      </div>
                      <div className="col-8 info-competition">
                        <div className="title-info-competition">
                          {item.title}
                        </div>
                        <div className="time">
                          <BsIcons.BsCalendarDate className="icon mb-1" />{" "}
                          {moment(item.createdAt).format(
                            dateFormat.FORMATT_DATE_TIME
                          )}
                        </div>
                        <div className="description">{item.description}</div>
                      </div>
                    </div>
                    <div className="button d-flex">
                      <div className="count-submission d-flex">
                        {countSubmission &&
                          countSubmission.length > 0 &&
                          countSubmission.map((jtem, jndex) => {
                            if (item.id == jtem.competitionId) {
                              return jtem.count > "0" ? (
                                <>
                                  <div className="count d-flex">
                                    <div> {jtem.count} bài tham gia - </div>
                                    <div
                                      className="d-flex see-submission"
                                      onClick={() =>
                                        this.handleSeeSubmission(item)
                                      }
                                    >
                                      Xem bài đăng
                                      <div className="icon">
                                        <MdIcons.MdOutlineNavigateNext />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              );
                            }
                          })}
                      </div>
                      <button
                        className="btn btn-upload-competion"
                        onClick={() => this.handleCreateSubmission(item)}
                      >
                        Tham gia
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    // news: state.news.News,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllNews: (id) => dispatch(actions.getAllNews(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Competition)
);
