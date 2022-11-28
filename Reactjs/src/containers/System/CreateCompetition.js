import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import "react-markdown-editor-lite/lib/index.css";
import * as actions from "../../store/actions";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import "./Manage.scss";
import { CommonUtils } from "../../utils";
import NavAdmin from "../../components/NavAdmin";
import moment from "moment";
import {
  createCompetition,
  allCompetitions,
} from "../../services/competitionService";
import { getCollectionFormStatusByCurrentDate } from "../../services/collectionformService";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class CreateCompetition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      title: "",
      isOpen: false,
      action: "",
      previewImg: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    await this.getAllCompetitionsFromReact();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImg: objectURL,
        avatar: base64,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;

    let arrCheck = ["contentMarkdown", "contentHTML", "description", "title"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  getAllCompetitionsFromReact = async () => {
    let response = await allCompetitions("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrCompetitions: response.competitions,
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

  createCompetitionFromReact = async (data) => {
    let res = await createCompetition(data);
    if (res && res.errCode === 0) {
      toast.success("Thêm cuộc thi thành công");
      await this.getAllCompetitionsFromReact();
      this.props.history.push("/system/competition-manage");
    } else if (res && res.errCode === 1) {
      toast.error("Cuộc thi này đã tồn tại");
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
  };

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  // handleEditFromParent = (news) => {
  //     let imageBase64 = '';
  //     if (news.avatar) {
  //         imageBase64 = new Buffer(news.avatar, 'base64').toString('binary')
  //     }

  //     this.setState({
  //         contentMarkdown: news.contentMarkdown,
  //         contentHTML: news.contentHTML,
  //         description: news.description,
  //         title: news.title,
  //         action: CRUD_ACTIONS.EDIT,
  //         newsID: news.id,
  //         avatar: imageBase64,
  //         previewImg: imageBase64,
  //     })
  // }

  openPreviewImage = () => {
    if (!this.state.previewImg) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleSaveCompetition = async () => {
    await this.createCompetitionFromReact({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      title: this.state.title,
      avatar: this.state.avatar,
    });
  };

  render() {
    let { processLogout, userInfo } = this.props;
    let {
      isShowNotification,
      arrCollectsStatusByCurrentDate,
      currentDateTimeStop,
    } = this.state;
    currentDateTimeStop = moment(currentDateTimeStop);
    let imageBase64 = "";
    if (userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
    }
    return (
      <>
        <NavAdmin />
        <div className="main_content">
          <div className="container-fluid ">
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
                                        tại {item.addressData.address_name} {""}
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
                                            {currentDateTimeStop.diff(tt)} phút
                                            trước
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
          <div className="wrapper-manage shadow-sm ">
            <div className="row title d-flex">
              <div className="col-6 title-manage">QUẢN LÝ CUỘC THI</div>
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
                onClick={this.handleAddNews}
              >
                <MdIcons.MdOutlineCreate />{" "}
                <FormattedMessage id="manage-user.add" />
              </button>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="news-container">
          <div className="row row1-news ">
            <div className="col-3 img-news">
              <label>
                <FormattedMessage id="manage-news.image" />
              </label>
              <div className="preview-img-container">
                <input
                  id="previewImg"
                  type="file"
                  hidden
                  onChange={(event) => this.handleOnChangeImg(event)}
                />
                <label className="upload-file" htmlFor="previewImg">
                  <FormattedMessage id="common.upload-image" />{" "}
                  <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-img"
                  // style={{ backgroundImage: `url(${this.state.previewImg})` }}
                  onClick={() => this.openPreviewImage()}
                >
                  <img src={this.state.avatar} className="img-img" />
                </div>
              </div>
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-news.name" />
              </label>
              <input
                type="text"
                className="form-control"
                // placeholder="Tiêu đề"
                value={this.state.title}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "title");
                }}
              />
            </div>
            <div className="col-5 form-group">
              <label>
                <FormattedMessage id="manage-news.description" />
              </label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "description")
                }
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="news-about-editor mt-3">
            {/* <label style={{fontSize: "18px", fontWeight: "bold"}}>
                        <FormattedMessage id="news.tintuc" />
                    </label> */}
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <div
            className="btn btn-save mt-3"
            onClick={() => this.handleSaveCompetition()}
          >
            Lưu
            {/* <button
                        className={ this.state.action === CRUD_ACTIONS.EDIT?"btn btn-save":"btn btn-save" }
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT?
                            <FormattedMessage id="common.save" /> :
                            <FormattedMessage id="common.save"/>
                        }
                    </button> */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // teachers: state.news.teachers,
    // language: state.app.language,
    listNews: state.news.News,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewsStart: (data) => dispatch(actions.saveNewsStart(data)),
    editNewsStart: (data) => dispatch(actions.editNewsStart(data)),
    // allNews: () => dispatch(actions.getAllNews()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateCompetition)
);
