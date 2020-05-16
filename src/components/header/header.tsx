// @ts-nocheck
import React from "react";

import './header.scss';

interface HeaderProps {
  title: string;
}

const Header = ({title}: HeaderProps) => (
  <h1 className="header">
    {title}
  </h1>
);

export default Header;
