import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import CollectionFormManage from '../containers/System/Giver/CollectionFormManage';
import Header from '../containers/Header/Header';
class Giver extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
            {isLoggedIn && <Header />}
            <div className="giver-container">
                <div className="giver-list">
                    <Switch>
                        <Route path="/giver/collection-form-manage" component={CollectionFormManage} />
                        
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
