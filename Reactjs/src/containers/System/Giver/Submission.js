import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { dateFormat } from "../../../utils";
import moment from "moment";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import "./News.scss";
import { allCompetitions } from "../../../services/competitionService";
import {
  allSubmissionsByCompetition,
  countSubmissionsByCompetition,
} from "../../../services/submissionService";
import {
  countAppreciateBySubmission,
  allApprecicateBySubmission,
  createAppreciate,
  deleteAppreciate,
} from "../../../services/appreciateService";

class Submission extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    // currentDate.setHours(0,0,0,0);
    this.state = {
      arrCompetitions: [],
      arrSubmissionsByCompetition: [],
      countSubmission: [],
      countAppreciate: [],
      newsDetail: {},
      currentDate: "",
      isShow: true,
      isClickHeart: "",
      appreciateOfReviewer: [],
    };
  }

  async componentDidMount() {
    await this.getCompetitionsFromReact();
    await this.countAllSubmissionsByCompetitiveFromReact();
    await this.getAllSubmissionsByCompetitiveFromReact();
    await this.countAllAppreciateBySubmissionFromReact();
    await this.getAllAppreciateBySubmissionFromReact();
  }

  getCompetitionsFromReact = async () => {
    if (
      this.props?.match &&
      this.props?.match?.params &&
      this.props?.match?.params?.id
    ) {
      let competitionID = this.props.match.params.id;
      let res = await allCompetitions(competitionID);
      if (res && res.errCode === 0) {
        this.setState({
          arrCompetitions: res.competitions,
        });
      }
    }
  };

  //   getAllSubmissionsFromReact = async () => {
  //     let response = await allSubmissions("ALL");
  //     if (response && response.errCode == 0) {
  //       this.setState(
  //         {
  //           arrSubmissions: response.submissions,
  //         },
  //         () => {
  //           console.log("competition", this.state.arrSubmissions);
  //         }
  //       );
  //     }
  //   };

  getAllSubmissionsByCompetitiveFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let competitionID = this.props.match.params.id;
      let res = await allSubmissionsByCompetition(competitionID);
      if (res && res.errCode === 0) {
        this.setState({
          arrSubmissionsByCompetition: res.submissions,
        });
      }
    }
  };

  countAllSubmissionsByCompetitiveFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let competitionID = this.props.match.params.id;
      let res = await countSubmissionsByCompetition(competitionID);
      if (res && res.errCode === 0) {
        this.setState({
          countSubmission: res.submissions,
        });
      }
    }
  };

  handleCreateSubmission = (competition) => {
    this.props.history.push(`/giver/create-submission/${competition.id}`);
  };

  handleDetailCompetition = (competition) => {
    this.props.history.push(`/competition-detail/${competition.id}`);
  };

  handleIsShow() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }

  countAllAppreciateBySubmissionFromReact = async () => {
    let allSubmissionsByCompetition = this.state.arrSubmissionsByCompetition;
    for (let i = 0; i < allSubmissionsByCompetition.length; i++) {
      let res = await countAppreciateBySubmission(
        allSubmissionsByCompetition[i].id
      );

      if (res && res.errCode === 0) {
        this.setState({
          countAppreciate: res.appreciates,
        });
      }
    }
  };

  getAllAppreciateBySubmissionFromReact = async () => {
    let allSubmissionsByCompetition = this.state.arrSubmissionsByCompetition;
    let reviewerId = this.props.userInfo.id;
    for (let i = 0; i < allSubmissionsByCompetition.length; i++) {
      let res = await allApprecicateBySubmission({
        submissionId: allSubmissionsByCompetition[i].id,
        reviewerId: reviewerId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          appreciateOfReviewer: res.appreciates,
        });
      }
    }
  };

  // handleHeart = async (submission) => {
  //   console.log("submission", submission);
  //   let submissionId = submission.id;
  //   let reviewerId = this.props.userInfo.id;
  //   this.setState(
  //     {
  //       isClickHeart: true,
  //     },
  //     () => {
  //       console.log("isClickHeart", this.state.isClickHeart);
  //     }
  //   );
  //   if (this.state.isClickHeart === true) {
  //     let res = await createAppreciate({
  //       submissionId: submissionId,
  //       reviewerId: reviewerId,
  //     });
  //     this.getAllAppreciateBySubmissionFromReact();
  //   } else {
  //     let appreciateOfReviewer = this.state.appreciateOfReviewer;
  //     for (let i = 0; i < appreciateOfReviewer.length; i++) {
  //       let appreciateId = appreciateOfReviewer[i].id;
  //       let res = await deleteAppreciate(appreciateId);
  //       console.log("xóa ", appreciateId);
  //       this.getAllAppreciateBySubmissionFromReact();
  //     }
  //   }
  // };

  //  {appreciateOfReviewer &&
  //                           appreciateOfReviewer
  //                             .map(
  //                               (appreciateOfReviewer) =>
  //                                 appreciateOfReviewer.reviewerId
  //                             )
  //                             .includes(userInfo.id)}
  //                         ? (
  //                         {appreciateOfReviewer &&
  //                           appreciateOfReviewer.map(
  //                             (appreciateOfReviewer, index) => {
  //                               return (
  //                                 <FavoriteBorderIcon
  //                                   className="icon text-black ml-1"
  //                                   onClick={(e) =>
  //                                     this.handleHeart(appreciateOfReviewer)
  //                                   }
  //                                 />
  //                               );
  //                             }
  //                           )}
  //                         ) : ( "" )

  handleHeart = async (submission) => {
    let submissionId = submission.id;
    let appreciateOfReviewer = this.state.appreciateOfReviewer;
    if (appreciateOfReviewer.length > 0) {
      let appreciate = appreciateOfReviewer.filter(
        (item) => item.submissionId == submissionId
      );
      for (let i = 0; i < appreciate.length; i++) {
        this.setState({
          isClickHeart: false,
          appreciateId: appreciate[i].id,
        });
        let res = await deleteAppreciate(this.state.appreciateId);
        this.getAllAppreciateBySubmissionFromReact();
        this.props.history.push(
          `/submission-by-competition/${submission.competitionId}`
        );
      }
    } else {
      let submissionId = submission.id;
      let reviewerId = this.props.userInfo.id;
      this.setState({
        isClickHeart: true,
      });

      let res = await createAppreciate({
        submissionId: submissionId,
        reviewerId: reviewerId,
      });
      this.getAllAppreciateBySubmissionFromReact();
      this.props.history.push(
        `/submission-by-competition/${submission.competitionId}`
      );
    }
  };

  handleUnHeart = async (appreciate) => {
    let appreciateId = appreciate.id;
    let res = await deleteAppreciate(appreciateId);
    console.log("xóa ", appreciateId);
    this.getAllAppreciateBySubmissionFromReact();
  };

  render() {
    let userInfo = this.props.userInfo;
    let { isClickHeart } = this.state;
    let {
      arrCompetitions,
      arrSubmissions,
      arrSubmissionsByCompetition,
      participantData,
      countSubmission,
      countAppreciate,
      appreciateOfReviewer,
    } = this.state;

    let imageBase64 = "";
    if (arrCompetitions?.avatar) {
      imageBase64 = new Buffer(arrCompetitions?.avatar, "base64").toString(
        "binary"
      );
    }
    return (
      <>
        <ScrollUp />
        <Header />
        <Banner />
        <div className="submission">
          <div className="title-submission">CUỘC THI</div>
          <div className="line"></div>
          <div className="competition-container">
            <div className="row">
              <div
                className="content-competition col-12 d-flex"
                onClick={() => this.handleDetailCompetition(arrCompetitions)}
              >
                <div className="col-4 img">
                  <img src={imageBase64} className="img-pro" />
                </div>
                <div className="col-8 info-competition">
                  <div className="title-info-competition">
                    {arrCompetitions?.title}
                  </div>
                  <div className="time">
                    <BsIcons.BsCalendarDate className="icon mb-1" />{" "}
                    {moment(arrCompetitions?.createdAt).format(
                      dateFormat.FORMATT_DATE_TIME
                    )}
                  </div>
                  <div className="description">
                    {arrCompetitions?.description}
                  </div>
                </div>
              </div>
              <div className="col-12 button d-flex">
                <div className="count-submission d-flex">
                  {countSubmission &&
                    countSubmission.length > 0 &&
                    countSubmission.map((jtem, jndex) => {
                      return jtem.count > "0" ? (
                        <>
                          <div className="count d-flex">
                            <div> {jtem.count} bài tham gia -</div>
                            <button
                              className="btn btn-isShow"
                              onClick={() => this.handleIsShow()}
                            >
                              {this.state.isShow ? (
                                <div className="icon-see">
                                  <BiIcons.BiHide />
                                  Ẩn
                                </div>
                              ) : (
                                <div className="icon-see">
                                  <BiIcons.BiShow />
                                  Hiển thị
                                </div>
                              )}
                            </button>
                          </div>
                        </>
                      ) : (
                        ""
                      );
                    })}
                </div>
                <button
                  className="btn btn-upload-competion"
                  onClick={() => this.handleCreateSubmission(arrCompetitions)}
                >
                  Tham gia
                </button>
              </div>
              {this.state.isShow ? (
                <div className="col-12 submission-container">
                  {arrSubmissionsByCompetition &&
                    arrSubmissionsByCompetition.map((item, index) => {
                      let imageBase64 = "";
                      if (item.avatar) {
                        imageBase64 = new Buffer(
                          item.avatar,
                          "base64"
                        ).toString("binary");
                      }
                      let avatarParticipant = "";
                      if (item.participantData.image) {
                        avatarParticipant = new Buffer(
                          item.participantData.image,
                          "base64"
                        ).toString("binary");
                      }
                      return (
                        <div className="content">
                          <div className=" info-participant d-flex">
                            <div className="col-1 img ">
                              <img
                                src={avatarParticipant}
                                className="img-pro"
                              />
                            </div>
                            <div className="col-11 name">
                              {item.participantData.firstName +
                                " " +
                                item.participantData.lastName}{" "}
                              - {item.participantData.email}
                            </div>
                          </div>

                          <div className="info-submission d-flex">
                            <div className="col-4 img ">
                              <img src={imageBase64} className="img-pro" />
                            </div>
                            <div className="col-7 d-submission">
                              <div className="title">{item.title}</div>
                              <div className="time">
                                <BsIcons.BsCalendarDate className="icon mb-1" />{" "}
                                {moment(item.createdAt).format(
                                  dateFormat.FORMATT_DATE_TIME
                                )}
                              </div>
                              <div className="description">
                                {item.description}
                              </div>
                            </div>
                          </div>

                          <div className="d-flex">
                            {countAppreciate &&
                              countAppreciate.map((countAppreciate, index) => {
                                return (
                                  <div className="text-red bg-black">
                                    {countAppreciate.count}
                                  </div>
                                );
                              })}
                            {appreciateOfReviewer.map(
                              (appreciateOfReviewer) =>
                                appreciateOfReviewer.reviewerId
                            ) ? (
                              <FavoriteBorderIcon
                                className="icon text-black ml-1"
                                onClick={(e) => this.handleHeart(item)}
                                activeStyle={{
                                  color: "red",
                                }}
                              />
                            ) : (
                              <FavoriteBorderIcon
                                className="icon text-black ml-1"
                                onClick={(e) => this.handleHeart(item)}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </div>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllNews: (id) => dispatch(actions.getAllNews(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Submission)
);
