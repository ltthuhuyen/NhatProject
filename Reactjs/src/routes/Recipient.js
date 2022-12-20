import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Recipient/Header";
import HomePage from "../containers/HomePage/Recipient/HomePage";
import UserInfo from "../containers/System/Recipient/UserInfo";
import ModalChangePassword from "../containers/System/Recipient/ModalChangePassword";
import AddressInfo from "../containers/System/Recipient/AddressInfo";
import CheckCalendar from "../containers/System/Recipient/CheckCalendar";
import CollectionFormStatusS2 from "../containers/System/Recipient/CollectionFormStatusS2";
import CollectionFormStatusS3 from "../containers/System/Recipient/CollectionFormStatusS3";
import CollectionFormStatusS5 from "../containers/System/Recipient/CollectionFormStatusS5";
import DetailCollectionForm from "../containers/System/Recipient/DetailCollectionForm";
import DetailCollectionFormStatusS2 from "../containers/System/Recipient/DetailCollectFormStatusS2";
import CollectionHistory from "../containers/System/Recipient/CollectionHistory";
import CollectionFormManage from "../containers/System/Recipient/CollectionFormManage";
import Submission from "../containers/System/Giver/Submission";
import CreateSubmission from "../containers/System/Giver/CreateSubmission";
import DetailSubmission from "../containers/System/Giver/DetailSubmission";
import Map from "../../src/containers/Map/Map";

class Recipient extends Component {
  render() {
    const { isLoggedIn } = this.props;
    let userInfo = this.props.userInfo;
    return (
      <>
        {isLoggedIn && <Header />}
        {userInfo && userInfo.roleId === "R3" ? (
          <div className="giver-container">
            <div className="giver-list">
              <Switch>
                <Route path="/recipient/home" component={HomePage} />
                <Route path="/recipient/user-info" component={UserInfo} />
                <Route
                  path="/recipient/change-password"
                  component={ModalChangePassword}
                />
                <Route path="/recipient/address-info" component={AddressInfo} />
                <Route
                  path="/recipient/check-calendar"
                  component={CheckCalendar}
                />
                <Route
                  path="/recipient/collection-form"
                  component={CollectionFormManage}
                />
                <Route
                  path="/recipient/collection-form-status-s2"
                  component={CollectionFormStatusS2}
                />
                <Route
                  path="/recipient/collection-form-status-s3"
                  component={CollectionFormStatusS3}
                />
                <Route
                  path="/recipient/collection-form-status-s5"
                  component={CollectionFormStatusS5}
                />
                <Route
                  path="/recipient/collection-form-detail/:id"
                  component={DetailCollectionForm}
                />
                <Route
                  path="/recipient/collection-form-detail-status-s2/:id"
                  component={DetailCollectionFormStatusS2}
                />
                <Route
                  path="/recipient/collection-history"
                  component={CollectionHistory}
                />
                <Route
                  path="/recipient/create-submission/:id"
                  component={CreateSubmission}
                />
                <Route
                  path="/recipient/submission-by-competition/:id"
                  component={Submission}
                />
                <Route
                  path="/recipient/submission-detail/:id"
                  component={DetailSubmission}
                />
                <Route path="/recipient/gg-map" component={Map} />
              </Switch>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipient);
