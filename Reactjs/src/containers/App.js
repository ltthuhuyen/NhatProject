import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { history } from "../redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import Register from "./Auth/Register";
import System from "../routes/System";
import Recipient from "../routes/Recipient";
import Giver from "../routes/Giver";
import CustomScrollbars from "../components/CustomScrollbars";
import HomePage from "./HomePage/HomePage";
import News from "./System/Giver/News";
import DetailNews from "./System/Giver/DetailNews";
import Competition from "./System/Giver/Competition";
import DetailCompetition from "./System/Giver/DetailCompetition";
import Submission from "./System/Giver/Submission";
import Identification from "./System/Giver/Identification";
import DetailSubmission from "./System/Giver/DetailSubmission";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* {this.props.isLoggedIn && <HomePage />} */}

            <span className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "auto" }}>
                <Switch>
                  <Route path={path.HOMEPAGE} exact component={HomePage} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.FORGOT_PASSWORD}
                    component={userIsNotAuthenticated(ForgotPassword)}
                  />
                  <Route
                    path={path.REGISTER}
                    component={userIsNotAuthenticated(Register)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/giver/"}
                    component={userIsAuthenticated(Giver)}
                  />
                  <Route
                    path={"/recipient/"}
                    component={userIsAuthenticated(Recipient)}
                  />
                  <Route path="/news" component={News} />
                  <Route path="/news-detail/:id" component={DetailNews} />
                  <Route path="/competition" component={Competition} />
                  <Route
                    path="/competition-detail/:id"
                    component={DetailCompetition}
                  />
                  <Route
                    path="/submission-by-competition/:id"
                    component={Submission}
                  />
                  <Route
                    path="/submission-detail/:id"
                    component={DetailSubmission}
                  />
                  <Route path="/identification" component={Identification} />
                </Switch>
              </CustomScrollbars>
            </span>

            {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
            <ToastContainer
              position="top-right"
              autoClose={100}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
