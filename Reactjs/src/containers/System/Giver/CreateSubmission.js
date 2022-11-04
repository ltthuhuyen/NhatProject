import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { dateFormat } from "../../../utils";
import moment from "moment";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import "./News.scss";
import { createSubmission } from "../../../services/submissionService";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class CreateSubmission extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    // currentDate.setHours(0,0,0,0);
    this.state = {
      competitionId: "",
      participantId: "",
      description: "",
      title: "",
      contentMarkdown: "",
      contentHTML: "",
      isOpen: false,
      previewImg: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    await this.getCompetitionFormReact();
  }

  getCompetitionFormReact = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let competitionId = this.props.match.params.id;
      if (competitionId) {
        this.setState({
          competitionId: competitionId,
        });
      }
    }
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
  openPreviewImage = () => {
    if (!this.state.previewImg) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("input", this.state);
      }
    );
  };

  handleEditorChange = ({ html, text }) => {
    this.setState(
      {
        contentMarkdown: text,
        contentHTML: html,
      },
      () => {
        console.log("contentMarkdown", this.state.contentMarkdown);
      }
    );
  };

  createSubmissionFromReact = async (data) => {
    let res = await createSubmission(data);
    if (res && res.errCode === 0) {
      toast.success("Bài đăng thành công");
      await this.getCompetitionFormReact();
      this.props.history.push("/competition");
    } else if (res && res.errCode === 1) {
      toast.error("Bài đăng không thành công");
    } else if (res && res.errCode === 2) {
      toast.error("Vui lòng điền đầy đủ thông tin");
    }
  };

  handleSaveSubmission = async () => {
    await this.createSubmissionFromReact({
      competitionId: this.state.competitionId,
      participantId: this.state.participantId,
      avatar: this.state.avatar,
      title: this.state.title,
      description: this.state.description,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
    });
  };

  render() {
    if (this.props.userInfo) {
      this.state.participantId = this.props.userInfo.id;
    }

    return (
      <>
        <ScrollUp />
        <Header />
        <Banner />
        <div className="create-submission">
          <div className="title-create-submission">
            ĐĂNG KÝ THAM GIA CUỘC THI
          </div>
          <div className="line"></div>
          <div className="create-submission-container">
            <div className="row row1-create-submission ">
              <div className="col-3 img-create-submission">
                <label>Tải ảnh</label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImg(event)}
                  />
                  <label className="upload-file" htmlFor="previewImg">
                    Upload <i className="fas fa-upload"></i>
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
                <label>Tiêu đề</label>
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
                <label>Mô tả</label>
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
            <div className="create-submission-about-editor mt-3">
              {/* <label style={{fontSize: "18px", fontWeight: "bold"}}>
                        <FormattedMessage id="create-submission.tintuc" />
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
              onClick={() => this.handleSaveSubmission()}
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
        </div>

        <Footer />
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
  return {
    // getAllNews: (id) => dispatch(actions.getAllNews(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateSubmission)
);
