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
import "./Manage.scss";
import NavAdmin from "../../components/NavAdmin";
import {
  allCompetitions,
  deleteCompetition,
} from "../../services/competitionService";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class CompetitionManage extends Component {
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
      currentPage: 1,
      todosPerPage: 10,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.getAllCompetitionsFromReact();
  }

  getAllCompetitionsFromReact = async () => {
    let response = await allCompetitions("ALL");
    if (response && response.errCode == 0) {
      this.setState({
        arrCompetitions: response.competitions,
      });
    }
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
    let { arrCompetitions } = this.state;
    let { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arrCompetitions.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(arrCompetitions.length / todosPerPage);
      i++
    ) {
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
              onClick={this.handleAddCompetition}
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
                    <th>Tên cuộc thi</th>
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
                              onClick={() => this.handleEditCompetition(item)}
                            >
                              <AiIcons.AiOutlineEdit />
                            </button>
                          </td>
                          <td>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionManage);
