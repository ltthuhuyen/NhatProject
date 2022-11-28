import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import "./Manage.scss";
import NavAdmin from "../../components/NavAdmin";
import { allNews, deleteNews } from "../../services/newsService";
import { searchNews } from "../../services/searchService";
import moment from "moment";
import { dateFormat } from "../../utils";
import { getCollectionFormStatusByCurrentDate } from "../../services/collectionformService";
import CustomScrollbars from "../../components/CustomScrollbars";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class NewsManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNews: [],
      arrSearchNews: [],
      newsEdit: {},
      search: "",
      currentPage: 1,
      todosPerPage: 10,
      isShowNotification: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getAllNews();
    await this.getAllCollectFormStatusByCurrentDateFromReact();
  }

  getAllNews = async () => {
    let response = await allNews("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrNews: response.news,
      });
    }
  };

  getAllCollectFormStatusByCurrentDateFromReact = async () => {
    let today = new Date();
    let response = await getCollectionFormStatusByCurrentDate({
      date: moment(today).format(dateFormat.FORMAT_DATE),
      status: "S1",
    });

    if (response) {
      this.setState({
        arrCollectsStatusByCurrentDate: response.collects,
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

  handleNotifications = () => {
    this.setState({
      isShowNotification: !this.state.isShowNotification,
    });
  };

  handleSearch = async (search) => {
    let response = await searchNews(this.state.search);
    if (response) {
      this.setState({
        arrSearchNews: response,
      });
    }
    this.props.history.push(`/system/search-news/${this.state.search}`);
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleAddNews = async () => {
    this.props.history.push("/system/create-news");
  };

  handleEditNews = async (news) => {
    this.props.history.push(`/system/edit-news/${news.id}`);
  };

  handleDeleteNews = async (news) => {
    try {
      let res = await deleteNews(news.id);
      if (res && res.errCode === 0) {
        toast.success("Xóa tin tức thành công");
        await this.getAllNews();
        this.props.history.push("/system/news-manage");
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
      arrNews,
      arrCollectsStatusByCurrentDate,
      isShowNotification,
      currentDateTimeStop,
    } = this.state;
    currentDateTimeStop = moment(currentDateTimeStop);
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrNews.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrNews.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
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
              <div className="col-6 title-manage">QUẢN LÝ TIN TỨC</div>
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
            <div className="row content">
              <div className="wrapper-title-sum-statistic d-flex">
                <span className="wrapper-sum d-flex">
                  <div className="">Tổng cộng:</div>
                  <div className="text-sum">{arrNews.length} tin tức</div>
                </span>
              </div>
              <Table className="shadow">
                <thead className="thead">
                  <tr>
                    <th>ID</th>
                    <th>Tên tin tức</th>
                    <th>Hình ảnh</th>
                    {/* <th>Mô tả</th> */}
                    <th scope="col">Hành động</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {currentTodos &&
                    currentTodos.length > 0 &&
                    currentTodos.map((item, index) => {
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
                          {/* <td>{item.description}</td> */}
                          <td>
                            <button
                              className="btn btn-edit mr-3"
                              onClick={() => this.handleEditNews(item)}
                            >
                              <AiIcons.AiOutlineEdit />
                            </button>
                            <button
                              className="btn btn-delete"
                              onClick={() => this.handleDeleteNews(item)}
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
            <div className="row btn-pageNumber d-flex">
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
            </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsManage);
