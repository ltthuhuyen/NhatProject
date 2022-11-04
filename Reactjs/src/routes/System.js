import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../containers/HomePage/Admin/HomePage";
import Dashboard from "../components/Dashboard";
import UserInfo from "../containers/System/UserInfo";
import ModalChangePassword from "../containers/System/ModalChangePassword";
import UserManage from "../containers/System/UserManage";
import DetailUser from "../containers/System/DetailUser";
import SearchUser from "../containers/System/SearchUser";
import GiverManage from "../containers/System/GiverManage";
import RecipientManage from "../containers/System/RecipientManage";
import SearchProduct from "../containers/System/SearchProduct";
import ProductManage from "../containers/System/ProductManage";
import CollectionFormManage from "../containers/System/CollectionFormManage";
import DetailCollectionForm from "../containers/System/DetailCollectionForm";
import CollectionFormStatusS1Manage from "../containers/System/CollectionFormStatusS1Manage";
import CollectionFormStatusS2Manage from "../containers/System/CollectionFormStatusS2Manage";
import CollectionFormStatusS3Manage from "../containers/System/CollectionFormStatusS3Manage";
import CollectionFormStatusS4Manage from "../containers/System/CollectionFormStatusS4Manage";
import CollectionFormStatusS5Manage from "../containers/System/CollectionFormStatusS5Manage";
import CreateNews from "../containers/System/CreateNews";
import EditNews from "../containers/System/EditNews";
import NewsManage from "../containers/System/NewsManage";
import CompetitionManage from "../containers/System/CompetitionManage";
import CreateCompetition from "../containers/System/CreateCompetition";
import EditCompetition from "../containers/System/EditCompetition";

class System extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/home" component={HomePage} />
            <Route path="/system/user-info" component={UserInfo} />
            <Route
              path="/system/change-password"
              component={ModalChangePassword}
            />
            <Route path="/system/user-manage" component={UserManage} />
            <Route
              path="/system/user-manage-detail/:id"
              component={DetailUser}
            />
            <Route path="/system/search-user/:search" component={SearchUser} />
            <Route path="/system/giver-manage" component={GiverManage} />
            <Route
              path="/system/recipient-manage"
              component={RecipientManage}
            />
            <Route
              path="/system/search-product/:search"
              component={SearchProduct}
            />
            <Route path="/system/product-manage" component={ProductManage} />
            <Route path="/system/create-news" component={CreateNews} />
            <Route path="/system/news-manage" component={NewsManage} />
            <Route path="/system/edit-news/:id" component={EditNews} />
            <Route
              path="/system/collection-form-manage"
              component={CollectionFormManage}
            />
            <Route
              path="/system/collection-form-detail/:id"
              component={DetailCollectionForm}
            />
            <Route
              path="/system/collection-form-status-s1-manage"
              component={CollectionFormStatusS1Manage}
            />
            <Route
              path="/system/collection-form-status-s2-manage"
              component={CollectionFormStatusS2Manage}
            />
            <Route
              path="/system/collection-form-status-s3-manage"
              component={CollectionFormStatusS3Manage}
            />
            <Route
              path="/system/collection-form-status-s4-manage"
              component={CollectionFormStatusS4Manage}
            />
            <Route
              path="/system/collection-form-status-s5-manage"
              component={CollectionFormStatusS5Manage}
            />
            <Route
              path="/system/competition-manage"
              component={CompetitionManage}
            />
            <Route
              path="/system/create-competition"
              component={CreateCompetition}
            />
            <Route
              path="/system/edit-competition/:id"
              component={EditCompetition}
            />

            {/* <Route path="/system/user-info" component={UserInfo} />        */}

            {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
          </Switch>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
