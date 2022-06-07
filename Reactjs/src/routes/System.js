import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import GiverManage from '../containers/System/GiverManage';
import RecipientManage from '../containers/System/RecipientManage';
import ProductManage from '../containers/System/ProductManage';
import CollectionFormManage from '../containers/System/CollectionFormManage'
import DetailCollectionForm from '../containers/System/DetailCollectionForm'
import NewsManage from "../containers/System/NewsManage"


class System extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/giver-manage" component={GiverManage} />
                        <Route path="/system/recipient-manage" component={RecipientManage} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/news-manage" component={NewsManage} />
                        <Route path="/system/collection-form-manage" component={CollectionFormManage} />
                        <Route path="/system/collection-form-detail/:id" component={DetailCollectionForm} />   
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
