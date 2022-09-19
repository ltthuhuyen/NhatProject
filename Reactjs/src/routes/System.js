import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import DetailUser from '../containers/System/DetailUser'
import SearchUser from '../containers/System/SearchUser'
import GiverManage from '../containers/System/GiverManage';
import RecipientManage from '../containers/System/RecipientManage';
import ProductManage from '../containers/System/ProductManage';
import CollectionFormManage from '../containers/System/CollectionFormManage'
import DetailCollectionForm from '../containers/System/DetailCollectionForm'
import CollectionFormStatusS1Manage from '../containers/System/CollectionFormStatusS1Manage'
import CollectionFormStatusS2Manage from '../containers/System/CollectionFormStatusS2Manage'
import CollectionFormStatusS3Manage from '../containers/System/CollectionFormStatusS3Manage';
import CollectionFormStatusS4Manage from '../containers/System/CollectionFormStatusS4Manage';
import CollectionFormStatusS5Manage from '../containers/System/CollectionFormStatusS5Manage'
import NewsManage from "../containers/System/NewsManage"
import HomePage from '../containers/HomePage/Admin/HomePage';


class System extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/home" component={HomePage} />
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-manage-detail/:id" component={DetailUser} />
                        <Route path="/system/search-user/:search" component={SearchUser} />
                        <Route path="/system/giver-manage" component={GiverManage} />
                        <Route path="/system/recipient-manage" component={RecipientManage} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/news-manage" component={NewsManage} />
                        <Route path="/system/collection-form-manage" component={CollectionFormManage} />
                        <Route path="/system/collection-form-detail/:id" component={DetailCollectionForm} />  
                        <Route path="/system/collection-form-status-s1-manage" component={CollectionFormStatusS1Manage} /> 
                        <Route path="/system/collection-form-status-s2-manage" component={CollectionFormStatusS2Manage} /> 
                        <Route path="/system/collection-form-status-s3-manage" component={CollectionFormStatusS3Manage} />
                        <Route path="/system/collection-form-status-s4-manage" component={CollectionFormStatusS4Manage} /> 
                        <Route path="/system/collection-form-status-s5-manage" component={CollectionFormStatusS5Manage} />

                        {/* <Route path="/system/user-info" component={UserInfo} />        */}

                        {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}

                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
