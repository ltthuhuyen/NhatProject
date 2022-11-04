import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { changeLanguageApp } from "../../../store/actions";
import Header from "../../Header/Recipient/Header";
import Banner from "../../Banner/Banner";
import SearchCollectionForm from "../../System/Recipient/SearchCollectionForm";
import Introduce from "../../Introduce/Introduce";
import Container from "../../Container/Recipient/Container";
import News from "../../News/News";
import Footer from "../../Footer/Footer";
import SlideShow from "../../SlideShow/SlideShow";
import ScrollUp from "../../../components/ScrollUp";
class HomePage extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

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
        <SearchCollectionForm />
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
