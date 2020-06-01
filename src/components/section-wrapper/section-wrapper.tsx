// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {Link} from "react-router-dom";

import './section-wrapper.scss';

type SectionProps = {
  title: string,
}

const SectionWrapper: FunctionComponent<SectionProps> = ({children, title, typeOfBar}) => {
  return (
    <div className="section-wrapper">
      <h2 className="section-wrapper__title">{title}</h2>
      {children}
      {
        typeOfBar ?
          <Link to={`/${title}`}>the rest lies here</Link> : null
      }
    </div>
  );
};

export default SectionWrapper;
