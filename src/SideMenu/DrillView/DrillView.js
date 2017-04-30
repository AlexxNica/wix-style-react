import React, {Children} from 'react';
import {string, node} from 'prop-types';
import WixComponent from '../../WixComponent';
import SideMenu from '../index';
import {SlideAnimation} from '../../Animations';
import {SlideDirection} from '../../Animations/SlideAnimation';
import styles from './DrillView.scss';

class SideMenuDrill extends WixComponent {
  constructor(props) {
    super(props);

    const menus = {};
    this._processChildren({props: this.props}, menus);

    this.state = {
      currentMenuId: this.props.menuKey,
      menus,
      previousMenuId: null,
      showMenuA: true,
      slideDirection: SlideDirection.left,
      ...this.state
    };
  }

  componentWillReceiveProps(nextProps) {
    const menus = {};
    this._processChildren({props: nextProps}, menus);
    this.setState({menus});
  }

  _setSelectedItemMenu(selectedItemMenuId) {
    if (!this.state) {
      this.state = {currentMenuId: selectedItemMenuId, selectedItemMenuId};
      return;
    }

    // returning to a selected menu item (force nav)
    if (event && event.target.dataset.menuKey === selectedItemMenuId) {
      this._navigateToMenu(selectedItemMenuId, SlideDirection.left);
    }

    if (this.state.selectedItemMenuId === selectedItemMenuId) {
      return;
    }

    this.setState({selectedItemMenuId});
    if (this.state.currentMenuId !== selectedItemMenuId) {
      this._navigateToMenu(selectedItemMenuId, SlideDirection.left); // TODO: calculate if needs to slide left or right
    }
  }

  _navigateToMenu(nextMenuId, slideDirection) {
    const previousMenuId = this.state.currentMenuId;
    const showMenuA = !this.state.showMenuA;
    this.setState({currentMenuId: nextMenuId, previousMenuId, showMenuA, slideDirection});
  }

  _selectFirstLinkChild(menu, event) {
    let found = false;
    Children.forEach(menu.props.children, child => {
      if (!found && child.type === SideMenuDrill.Link) {
        child.props.onClick && child.props.onClick(event);
        found = true;
      }

      if (!found && child.props && child.props.children) {
        this._selectFirstLinkChild(child, event);
      }
    });
  }

  _alterMenu(menu, childrenClone, parentMenuKey, isActive) {
    const defaultSubMenProps = {
      isOpen: false,
      onSelectHandler: event => {
        event.target.dataset.menuKey = menu.props.menuKey;
        this._selectFirstLinkChild(menu, event);
      },
      onBackHandler: () => {
        this._navigateToMenu(parentMenuKey, SlideDirection.right);
      },
      isActive
    };

    return React.cloneElement(menu, defaultSubMenProps, childrenClone);
  }

  _handleSubMenu(activeMenus, menu, parentMenuKey, childrenClone, menus) {
    const isMenuActive = activeMenus[menu.props.menuKey];
    if (isMenuActive) {
      activeMenus[parentMenuKey] = true;
    }

    const menuClone = this._alterMenu(menu, childrenClone, parentMenuKey, isMenuActive);
    menus[menuClone.props.menuKey] = menuClone;
    return menuClone;
  }

  _processChildren(menu, menus, activeMenus = {}, parentMenuKey) {
    const childrenClone = Children.map(menu.props.children, child => {
      if (child.props && child.props.children) {
        const menuKey = menu.props.menuKey || parentMenuKey;
        return this._processChildren(child, menus, activeMenus, menuKey);
      }

      return child;
    });

    if (menu.type === SideMenuDrill.Link && menu.props.isActive) {
      this._setSelectedItemMenu(parentMenuKey);
      activeMenus[parentMenuKey] = true;
    }

    if (menu.props.menuKey) {
      return this._handleSubMenu(activeMenus, menu, parentMenuKey, childrenClone, menus);
    }

    return React.cloneElement(menu, {}, childrenClone);
  }

  _renderNavigation(menu) {
    if (menu.props.menuKey === this.props.menuKey) {
      // Render root items
      return menu.props.children;
    }

    // Render open SubMenu
    return React.cloneElement(menu, {isOpen: true});
  }

  _renderMenu(menu) {
    return (
      <div className={styles.drillViewPanel}>
        {this._renderNavigation(menu)}
      </div>
    );
  }

  render() {
    const {menus, currentMenuId, previousMenuId, showMenuA} = this.state;
    const menuAId = showMenuA ? currentMenuId : previousMenuId;
    const menuBId = showMenuA ? previousMenuId : currentMenuId;

    const menuA = menuAId && menus[menuAId];
    const menuB = menuBId && menus[menuBId];

    return (
      <SideMenu>
        <div className={styles.drillViewContainer}>
          <SlideAnimation direction={this.state.slideDirection} animateAppear={false}>
            { showMenuA ? this._renderMenu(menuA) : null }
          </SlideAnimation>
          <SlideAnimation direction={this.state.slideDirection} animateAppear={false}>
            { !showMenuA ? this._renderMenu(menuB) : null }
          </SlideAnimation>
        </div>
      </SideMenu>
    );
  }
}

SideMenuDrill.defaultProps = {
  menuKey: 'root'
};

SideMenuDrill.propTypes = {
  menuKey: string,
  children: node
};

export default SideMenuDrill;
