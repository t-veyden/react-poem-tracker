// @ts-nocheck
import React from 'react';
import {singlePoem} from '../../utils/common-types';

import Header from "../../components/header";
import List from "../../components/list";

interface PurgatoryProps {
  data: singlePoem[];
}

function Purgatory({data}: PurgatoryProps) {
  return (
    <div className="purgatory-view">
      <Header title="welcome to purgatory"/>
      <List poems={data}/>
    </div>
  );
}

export default Purgatory;