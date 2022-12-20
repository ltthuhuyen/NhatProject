import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Table } from "reactstrap";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./Manage.scss";
import NavAdmin from "../../components/NavAdmin";
import {
  allCompetitions,
  deleteCompetition,
} from "../../services/competitionService";
import { searchCompetitive } from "../../services/searchService";
import { allSubmissionsByCompetition } from "../../services/submissionService";
import { countAppreciateBySubmission } from "../../services/appreciateService";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { dateFormat } from "../../utils";
import { getCollectionFormStatusByCurrentDate } from "../../services/collectionformService";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class SubmissionByCompetitionManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      title: "",
      isOpen: false,
      previewImg: "",
      avatar: "",
      search: "",
      arrSubmissionsByCompetition: [],
      countAppreciate: [],
      currentPage: 1,
      todosPerPage: 10,
      isShowNotification: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getAllSubmissionsByCompetitiveFromReact();
    await this.countAllAppreciateBySubmissionFromReact();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

  getAllSubmissionsByCompetitiveFromReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let competitionID = this.props.match.params.id;
      let res = await allSubmissionsByCompetition(competitionID);
      console.log("res", res);
      if (res && res.errCode === 0) {
        this.setState({
          arrSubmissionsByCompetition: res.submissions,
        });
      }
    }
  };

  countAllAppreciateBySubmissionFromReact = async () => {
    let allSubmissionsByCompetition = this.state.arrSubmissionsByCompetition;
    let arr = [];

    for (let i = 0; i < allSubmissionsByCompetition.length; i++) {
      let res = await countAppreciateBySubmission(
        allSubmissionsByCompetition[i].id
      );
      arr.push(res.appreciates);
    }

    if (arr) {
      this.setState({
        countAppreciate: arr,
      });
    }
  };
  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();
    let currentDate = moment(today).format("YYYY-MM-DD");
    var currentTime =
      today.getHours() +
      ":" +
      ("0" + today.getMinutes()).slice(-2) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);
    let currentDateTimeBegin = currentDate + " " + "00:00:00";
    let currentDateTimeStop = currentDate + " " + currentTime;
    // console.log("moment", currentDate);
    // console.log("moment", currentTime);
    // console.log("currentDateTimeBegin", currentDateTimeBegin);
    // console.log("currentDateTimeStop", currentDateTimeStop);
    let response = await getCollectionFormStatusByCurrentDate({
      currentDateBegin: currentDateTimeBegin,
      currentDateStop: currentDateTimeStop,
      status: "S1",
    });

    if (response) {
      this.setState({
        arrCollectsStatusByCurrentDate: response.collects,
        currentDateTimeBegin: currentDateTimeBegin,
        currentDateTimeStop: currentDateTimeStop,
      });
    }
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSearch = async (search) => {
    let response = await searchCompetitive(this.state.search);
    if (response) {
      this.setState({
        arrSearchCompetition: response,
      });
    }
    this.props.history.push(`/system/search-competition/${this.state.search}`);
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleAddCompetition = () => {
    this.props.history.push("/system/create-competition");
  };

  handleEditFromParent = (news) => {
    let imageBase64 = "";
    if (news.avatar) {
      imageBase64 = new Buffer(news.avatar, "base64").toString("binary");
    }

    this.setState({
      contentMarkdown: news.contentMarkdown,
      contentHTML: news.contentHTML,
      description: news.description,
      title: news.title,
      newsID: news.id,
      avatar: imageBase64,
      previewImg: imageBase64,
    });
  };

  openPreviewImage = () => {
    if (!this.state.previewImg) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleSeeSubmission = (competition) => {
    this.props.history.push(
      `/system/submission-by-competition-manage/${competition.id}`
    );
  };

  handleSeeDetailSubmission = (submission) => {
    this.props.history.push(
      `/system/detail-submission-by-competition-manage/${submission.id}`
    );
  };
  handleEditCompetition = async (competition) => {
    this.props.history.push(`/system/edit-competition/${competition.id}`);
  };

  handleDeleteCompetion = async (competition) => {
    try {
      let res = await deleteCompetition(competition.id);
      if (res && res.errCode === 0) {
        toast.success("Xóa tin tức thành công");
        await this.getAllCompetitionsFromReact();
        this.props.history.push("/system/competition-manage");
      } else {
        toast.error("Xóa tin tức không thành công");
      }
    } catch (e) {
      toast.error("Xóa tin tức không thành công");
    }
  };

  render() {
    let { processLogout, userInfo } = this.props;
    let {
      arrSubmissionsByCompetition,
      countAppreciate,
      isShowNotification,
      arrCollectsStatusByCurrentDate,
      currentDateTimeStop,
    } = this.state;
    currentDateTimeStop = moment(currentDateTimeStop);

    // let { currentPage, todosPerPage } = this.state;
    // const indexOfLastTodo = currentPage * todosPerPage;
    // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = arrCompetitions.slice(
    //   indexOfFirstTodo,
    //   indexOfLastTodo
    // );

    // const pageNumbers = [];
    // for (
    //   let i = 1;
    //   i <= Math.ceil(arrCompetitions.length / todosPerPage);
    //   i++
    // ) {
    //   pageNumbers.push(i);
    // }
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    return (
      <>
        <NavAdmin />
        <div className="main_content">
          <div className="container-fluid ">
            <div className="">
              <div className=" header_right justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="d-flex wrapper-welcome">
                    <div
                      className="btn btn-logout"
                      onClick={(e) => this.handleNotifications(e)}
                    >
                      <NotificationsNoneIcon />
                      {isShowNotification ? (
                        <div className="wrapper-notification shadow rounded">
                          <div className="title-notification">
                            Thông báo
                            <CloseIcon
                              className="icon-close"
                              onClick={(e) => this.handleNotifications(e)}
                            />
                          </div>
                          <CustomScrollbars style={{ height: "180px" }}>
                            {arrCollectsStatusByCurrentDate.length > 0 &&
                              arrCollectsStatusByCurrentDate.map(
                                (item, index) => {
                                  let t = moment(item.createdAt);
                                  console.log("t", t);
                                  let tt = moment(`${t}`);
                                  console.log("tt", tt);
                                  return (
                                    <>
                                      <div
                                        className="info-notification"
                                        onClick={(e) =>
                                          this.handleDetailCollectForm(item)
                                        }
                                      >
                                        {item.giverData.firstName} {""}
                                        {item.giverData.lastName}{" "}
                                        <div>
                                          đặt lịch thu gom{" "}
                                          {item.productData.product_name} {""}
                                          tại {
                                            item.addressData.address_name
                                          }{" "}
                                          {""}
                                          {item.addressData.ward_name}
                                          {/* {currentDateTimeStop} */}
                                          {/* {item.createdAt} */}
                                        </div>
                                        <div className="text-minutes">
                                          {currentDateTimeStop.diff(
                                            tt,
                                            "minutes"
                                          ) > 60 ? (
                                            <>
                                              {Math.floor(
                                                currentDateTimeStop.diff(
                                                  tt,
                                                  "minutes"
                                                ) / 60
                                              )}{" "}
                                              giờ trước
                                            </>
                                          ) : (
                                            <>
                                              {currentDateTimeStop.diff(tt)}{" "}
                                              phút trước
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                              )}
                          </CustomScrollbars>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="img">
                      <img src={imageBase64} className="img-img" />
                    </div>
                    <div className="profile-info">
                      {userInfo && userInfo.firstName + userInfo.lastName
                        ? userInfo.firstName + " " + userInfo.lastName
                        : ""}
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                      <FiIcons.FiLogOut />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-manage shadow-sm ">
            <div className="row title d-flex">
              <div className="col-6 title-manage">QUẢN LÝ BÀI VIẾT</div>
              <div className="serach_field-area d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search here..."
                  onChange={(e) => {
                    this.handleOnChangeInput(e, "search");
                  }}
                />
                <button
                  type="search"
                  className="btn btn-search rounded-pill"
                  onClick={() => this.handleSearch()}
                >
                  <BsIcons.BsSearch /> Tìm
                </button>
              </div>
              <button
                className="col-1 btn btn-create "
                onClick={this.handleAddCompetition}
              >
                <MdIcons.MdOutlineCreate />{" "}
                <FormattedMessage id="manage-user.add" />
              </button>
            </div>
            <div className="row content">
              <Table>
                <thead className="thead">
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Sản phẩm dự thi</th>
                    <th>Mô tả</th>
                    <th>Lượt thích</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {arrSubmissionsByCompetition &&
                    arrSubmissionsByCompetition.length > 0 &&
                    arrSubmissionsByCompetition.map((item, index) => {
                      let imageBase64 = "";
                      if (item.avatar) {
                        imageBase64 = new Buffer(
                          item.avatar,
                          "base64"
                        ).toString("binary");
                      }
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>
                            <div className="img">
                              <img
                                src={imageBase64}
                                className="img-img"
                                alt=" "
                              />
                            </div>
                          </td>
                          <td>{item.description}</td>
                          <td>
                            {countAppreciate && countAppreciate.length > 0 ? (
                              <>
                                {countAppreciate.map(
                                  (countAppreciate, index) => {
                                    if (
                                      countAppreciate.submissionId == item.id
                                    ) {
                                      return (
                                        <div>
                                          {countAppreciate.count}{" "}
                                          <FavoriteBorderIcon
                                            style={{
                                              color: "#fa4848",
                                            }}
                                          />
                                        </div>
                                      );
                                    }
                                  }
                                )}
                              </>
                            ) : (
                              <>0</>
                            )}
                          </td>
                          {/* <td>{item.contentHTML}</td> */}
                          <td className="d-flex">
                            <button
                              type="button"
                              className="btn btn-detail mx-2  "
                              onClick={() =>
                                this.handleSeeDetailSubmission(item)
                              }
                            >
                              <BsIcons.BsThreeDots />
                            </button>
                            {/* <button
                              className="btn btn-edit mx-2"
                              onClick={() => this.handleEditCompetition(item)}
                            >
                              <AiIcons.AiOutlineEdit />
                            </button> */}
                            <button
                              className="btn btn-delete"
                              onClick={() => this.handleDeleteCompetion(item)}
                            >
                              <AiIcons.AiOutlineDelete />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>

          {/* <div className="row btn-pageNumber d-flex">
            {pageNumbers.map((number) => {
              return (
                <button
                  className="btn btn-prev-next d-flex"
                  key={number}
                  id={number}
                  onClick={this.handleClick}
                >
                  {number}
                </button>
              );
            })}
          </div> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionByCompetitionManage);
