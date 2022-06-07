import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import AppointmentScheduleManage from '../containers/System/Giver/AppointmentScheduleManage';
import CollectionFormManage from '../containers/System/Recipient/CollectionFormManage';
import DetailCollectionForm from '../containers/System/Recipient/DetailCollectionForm';
import Header from '../containers/Header/Header';
class Recipient extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
            {isLoggedIn && <Header />}
            <div className="giver-container">
                <div className="giver-list">
                    <Switch>
                        <Route path="/recipient/collection-form" component={CollectionFormManage} />
                        <Route path="/recipient/collection-form-detail/:id" component={DetailCollectionForm} />       
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipient);
