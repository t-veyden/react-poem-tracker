// @ts-nocheck
import React from 'react';
import {Link} from 'react-router-dom';

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
            <Link to={`/poem/${poem.id}`}>{poem.title}</Link>
            <div className="list-item__author">
              _by_<Link to={`/authors/${poem.author.id}`}> link_here_{poem.author.name}</Link>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default List;
