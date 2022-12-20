import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { changeLanguageApp } from "../../store/actions";
import Header from "../Header/Giver/Header";
import Banner from "../Banner/Banner";
import SlideShow from "../SlideShow/SlideShow";
import Introduce from "../Introduce/Introduce";
import Container from "../Container/Container";
import News from "../News/News";
import Footer from "../Footer/Footer";
import ScrollUp from "../../components/ScrollUp";

class HomePage extends Component {
  render() {
    const { processLogout, isLoggedIn } = this.props;
    let language = this.props.language;
    console.log(isLoggedIn);
    return (
      <div>
        <ScrollUp />
        <Header />
        <Banner />
        <SlideShow />
        <Introduce />
        <Container />
        <News />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
