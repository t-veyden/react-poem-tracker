// @ts-nocheck
import React, { Component } from "react";
import List from "../list";

class BarList extends Component {
  state = {
    barPoems: [],
  }

  getRandomPoems = (poems, count) => {
    const bars = [];

    while (bars.length < count) {
      const poem = poems[Math.floor(Math.random() * poems.length)];
      if (!(~bars.indexOf(poem))) {
        bars.push(poem);
      }
    }
    return bars;
  }

  populateBars = (poems, barsLength = 3) => {
    return poems.length <= barsLength ? poems : this.getRandomPoems(poems, barsLength);
  }

  componentDidMount() {
    const { poems } = this.props;
    this.setState({ barPoems: this.populateBars(poems) });
  }

  render() {
    return <List poems={this.state.barPoems}/>
  }
}

export default BarList;