import React from 'react';
import {node, bool, string} from 'prop-types';
import SideMenu from '../index';

const SubMenu = ({children, title, header, promotion, footer, ...rest}) => (
  <SideMenu.SubMenu title={title} {...rest}>
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
  id: string.isRequired,
  title: string.isRequired,
  children: node.isRequired,
  header: node,
  promotion: node,
  footer: node,
};

export default SubMenu;
