import React, {FunctionComponent} from 'react';

import './section-wrapper.scss';

type SectionProps = {
  title: string,
}

const SectionWrapper: FunctionComponent<SectionProps> = ({children, title}) => {
  return (
    <div className="section-wrapper">
      <h2 className="section-wrapper__title">{title}</h2>
      {children}
      {/* router-link here */}
    </div>
  );
};

export default SectionWrapper;