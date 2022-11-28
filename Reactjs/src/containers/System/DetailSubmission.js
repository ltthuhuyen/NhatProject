import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { dateFormat } from "../../utils";
import moment from "moment";
import { Table } from "reactstrap";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import "./Manage.scss";
import NavAdmin from "../../components/NavAdmin";
import ScrollUp from "../../components/ScrollUp";
import Footer from "../Footer/Footer";
import {
  allCompetitions,
  deleteCompetition,
} from "../../services/competitionService";
import { searchCompetitive } from "../../services/searchService";
import { allSubmissions } from "../../services/submissionService";

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
    let { processLogout, userInfo } = this.props;
    let { submissionDetail } = this.state;
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
        <ScrollUp />
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSubmission);
