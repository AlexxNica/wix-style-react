import React, {Children} from 'react';
import {node, string, bool, func} from 'prop-types';
import SideMenu from '../index';
import SideMenuDrill from './index';

const SubMenu = ({children, title, isOpen, isActive, onSelectHandler, onBackHandler}) => {
  if (!isOpen) {
    return (
      <SideMenu.NavigationLink isActive={isActive} onClick={onSelectHandler}>
        {title}
      </SideMenu.NavigationLink>
    );
  }

  const wrappedNavigation = Children.map(children, child => {
    if (child.type === SideMenuDrill.Navigation) {
      return (
        <div>
          <SideMenu.NavigationBackLink onBackHandler={onBackHandler}/>
          <SideMenu.NavigationCategory>{title}</SideMenu.NavigationCategory>
          <SideMenu.Navigation>
            {child.props.children}
          </SideMenu.Navigation>
        </div>
      );
    }

    return child;
  });

  return (
    <div data-hook="menu-drill-sub-menu">
      {wrappedNavigation}
    </div>
  );
};

SubMenu.defaultProps = {
  isActive: false,
  isOpen: false,
  onSelectHandler: () => {},
  onBackHandler: () => {}
};

SubMenu.propTypes = {
  menuKey: string.isRequired,
  title: string.isRequired,
  isActive: bool,
  isOpen: bool,
  onSelectHandler: func,
  onBackHandler: func,
  children: node.isRequired
};

export default SubMenu;
