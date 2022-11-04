import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Recipient/Header";
import HomePage from "../containers/HomePage/Recipient/HomePage";
import UserInfo from "../containers/System/Recipient/UserInfo";
import ModalChangePassword from "../containers/System/Recipient/ModalChangePassword";
import AddressInfo from "../containers/System/Recipient/AddressInfo";
import CollectionFormStatusS2 from "../containers/System/Recipient/CollectionFormStatusS2";
import CollectionFormStatusS3 from "../containers/System/Recipient/CollectionFormStatusS3";
import CollectionFormStatusS5 from "../containers/System/Recipient/CollectionFormStatusS5";
import DetailCollectionForm from "../containers/System/Recipient/DetailCollectionForm";
import CollectionHistory from "../containers/System/Recipient/CollectionHistory";
import CollectionFormManage from "../containers/System/Recipient/CollectionFormManage";

class Recipient extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
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
                path="/recipient/collection-history"
                component={CollectionHistory}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipient);
