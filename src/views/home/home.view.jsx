import React, { Component } from "react";

import SectionWrapper from "../../components/section-wrapper";
import BarList from "../../components/bar-list";

import {poems} from '../../temp-data';

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
          <BarList poems={poems}/>
        </SectionWrapper>
        <SectionWrapper title="pending" typeOfBar>
          <BarList poems={poems}/>
        </SectionWrapper>
      </div>
    );
  }
}

export default HomeView;
