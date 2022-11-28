import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../containers/HomePage/HomePage";
import UserInfo from "../containers/System/Giver/UserInfo";
import ModalChangePassword from "../containers/System/Giver/ModalChangePassword";
import AddressInfo from "../containers/System/Giver/AddressInfo";
import CartManage from "../containers/System/Giver/CartManage";
import AppointmentScheduleManage from "../containers/System/Giver/AppointmentScheduleManage";
import CreateAddress from "../containers/System/Giver/ModalAddress";
import CollectionFormManage from "../containers/System/Giver/CollectionFormManage";
import CollectionFormStatusS2 from "../containers/System/Giver/CollectionFormStatusS2";
import CollectionFormStatusS3 from "../containers/System/Giver/CollectionFormStatusS3";
import CollectionHistory from "../containers/System/Giver/CollectionHistory";
import CollectionFormStatusS5 from "../containers/System/Giver/CollectionFormStatusS5";
import DetailCollectionForm from "../containers/System/Giver/DetailCollectionForm";
import News from "../containers/System/Giver/News";
import DetailNews from "../containers/System/Giver/DetailNews";
import CreateSubmission from "../containers/System/Giver/CreateSubmission";
import DetailCollectionFormStatusS2 from "../containers/System/Giver/DetailCollectionFormStatusS2";
import Submission from "../containers/System/Giver/Submission";
import DetailSubmission from "../containers/System/Giver/DetailSubmission";

class Giver extends Component {
  render() {
    const { isLoggedIn } = this.props;
    let userInfo = this.props.userInfo;

    return (
      <>
        {/* {isLoggedIn && < />} */}
        {userInfo && userInfo.roleId === "R2" ? (
          <div className="giver-container">
            <div className="giver-list">
              <Switch>
                <Route path="/giver/home" component={HomePage} />
                <Route path="/giver/user-info" component={UserInfo} />
                <Route
                  path="/giver/change-password"
                  component={ModalChangePassword}
                />
                <Route path="/giver/address-info" component={AddressInfo} />
                <Route path="/giver/cart" component={CartManage} />
                <Route
                  path="/giver/appointment-schedule"
                  component={AppointmentScheduleManage}
                />
                <Route path="/giver/create-address" component={CreateAddress} />
                <Route
                  path="/giver/collection-form"
                  component={CollectionFormManage}
                />
                <Route
                  path="/giver/collection-form-status-s2"
                  component={CollectionFormStatusS2}
                />
                <Route
                  path="/giver/collection-form-status-s3"
                  component={CollectionFormStatusS3}
                />
                <Route
                  path="/giver/collection-history"
                  component={CollectionHistory}
                />
                <Route
                  path="/giver/collection-form-status-s5"
                  component={CollectionFormStatusS5}
                />
                <Route
                  path="/giver/collection-form-detail/:id"
                  component={DetailCollectionForm}
                />
                <Route
                  path="/giver/collection-form-detail-status-s2/:id"
                  component={DetailCollectionFormStatusS2}
                />
                <Route path="/giver/news" component={News} />
                <Route path="/giver/news-detail/:id" component={DetailNews} />
                <Route
                  path="/giver/create-submission/:id"
                  component={CreateSubmission}
                />
                <Route
                  path="/giver/submission-by-competition/:id"
                  component={Submission}
                />
                <Route
                  path="/giver/submission-detail/:id"
                  component={DetailSubmission}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Giver);
