import React, { Component } from "react";

import SectionWrapper from "../../components/section-wrapper";

import './home.view.scss';

class HomeView extends Component {
  render() {
    return (
      <div className="home-view">
        <h1 className="home-view__title visually-hidden">Poetry Tracker home page</h1>
        <SectionWrapper title="in progress">
          <div>in progress here</div>
        </SectionWrapper>
        <SectionWrapper title="completed" typeOfBar>
          <div>completed here</div>
        </SectionWrapper>
        <SectionWrapper title="purgatory" typeOfBar>
          <div>pending here</div>
        </SectionWrapper>
      </div>
    );
  }
}

export default HomeView;