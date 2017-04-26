import React from 'react';
import {node, bool, string} from 'prop-types';
import SideMenu from '../index';

const SubMenu = ({children, title, isActive, isOpen, ...rest}) => (
  <SideMenu.SubMenu isActive={isActive} isOpen={isOpen} title={title} {...rest}>
    <SideMenu.Navigation>
      {children}
    </SideMenu.Navigation>
  </SideMenu.SubMenu>
);

SubMenu.defaultProps = {
  isActive: false,
  isOpen: false
};

SubMenu.propTypes = {
  children: node.isRequired,
  title: string.isRequired,
  isOpen: bool,
  isActive: bool
};

export default SubMenu;
