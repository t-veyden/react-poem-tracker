// @ts-nocheck
import React from 'react';
import {singlePoem} from '../../utils/common-types';

import './list.scss';

interface ListProps {
  poems: singlePoem[];
}

function List({poems}: ListProps) {
  return (
    <ul className="list">
      {
        poems.map(poem => (
          <li className="list__item" key={poem.id}>
            <span>link_here_{poem.title}</span>
            <div className="list-item__author">
              _by_<span> link_here_{poem.author.name}</span>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default List;