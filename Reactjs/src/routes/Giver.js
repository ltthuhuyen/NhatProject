import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import CartManage from '../containers/System/Giver/CartManage';
import CollectionFormManage from '../containers/System/Giver/CollectionFormManage';
import DetailCollectionForm from '../containers/System/Giver/DetailCollectionForm'
import AppointmentScheduleManage from "../containers/System/Giver/AppointmentScheduleManage"
// import Home from '../containers/HomePage/Home';
import HomePage from '../containers/HomePage/HomePage'
import News from "../containers/System/News"
import DetailNews from '../containers/System/DetailNews';
class Giver extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
            {/* {isLoggedIn && < />} */}
            <div className="giver-container">
                <div className="giver-list">
                    <Switch>
                        <Route path="/giver/home" component={HomePage} />
                        <Route path="/giver/cart/:id" component={CartManage} />
                        <Route path="/giver/collection-form" component={CollectionFormManage} />
                        <Route path="/giver/collection-form-detail/:id" component={DetailCollectionForm} />
                        <Route path="/giver/appointment-schedule" component={AppointmentScheduleManage} />
                        <Route path="/giver/news" component={News} />
                        <Route path="/giver/news-detail/:id" component={DetailNews} />
                    </Switch>
                </div>
            </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Giver);
