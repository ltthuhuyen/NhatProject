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
import "./Manage.scss";
import NavAdmin from "../../components/NavAdmin";
import { allNews, deleteNews } from "../../services/newsService";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class NewsManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNews: [],
      newsEdit: {},
      currentPage: 1,
      todosPerPage: 10,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getAllNews();
  }

  getAllNews = async () => {
    let response = await allNews("ALL");
    if (response && response.errCode == 0) {
      this.setState(
        {
          arrNews: response.news,
        },
        () => {
          console.log("arrNews", this.state.arrNews);
        }
      );
    }
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
    let { arrNews } = this.state;
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
          <div className="row header">
            <div className="d-flex">
              <div className="img">
                <img src={imageBase64} className="img-img" />
              </div>
              <div className="profile-info">
                Xin chào{" "}
                {userInfo && userInfo.firstName + userInfo.lastName
                  ? userInfo.firstName + " " + userInfo.lastName
                  : ""}
              </div>
            </div>
          </div>
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
            <div className="table">
              <Table>
                <thead className="thead">
                  <tr>
                    <th>ID</th>
                    <th>Tên tin tức</th>
                    <th>Hình ảnh</th>
                    <th>Mô tả</th>
                    <th>ContentHTML</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
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
                          <td>{item.description}</td>
                          <td>{item.contentHTML}</td>
                          <td>
                            <button
                              className="btn btn-edit"
                              onClick={() => this.handleEditNews(item)}
                            >
                              <AiIcons.AiOutlineEdit />
                            </button>
                          </td>
                          <td>
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
