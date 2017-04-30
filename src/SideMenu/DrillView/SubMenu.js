import React, {Children} from 'react';
import {node, string, bool, func} from 'prop-types';
import SideMenu from '../index';

const SubMenu = ({children, title, isOpen, isActive, onSelectHandler, ...rest}) => {
  if (!isOpen) {
    return (
      <SideMenu.NavigationLink isActive={isActive} onClick={onSelectHandler}>
        {title}
      </SideMenu.NavigationLink>
    );
  }

  return (
    <SideMenu.SubMenu title={title} {...rest}>
      {children}
    </SideMenu.SubMenu>
  );
};

SubMenu.defaultProps = {
  isActive: false,
  isOpen: false,
  onSelectHandler: () => {}
};

SubMenu.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  isActive: bool,
  isOpen: bool,
  onSelectHandler: func,
  children: node.isRequired
};

export default SubMenu;
