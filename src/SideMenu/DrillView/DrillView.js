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
      menus,
      currentMenuId: this.props.menuKey,
      previousMenuId: null,
      showMenuA: true,
      slideDirection: SlideDirection.left
    };
  }

  componentWillReceiveProps(nextProps) {
    const menus = {};
    this._processChildren({props: nextProps}, menus);
    this.setState({menus});
  }

  _navigateToMenu(nextMenuId, slideDirection) {
    const previousMenuId = this.state.currentMenuId;
    const showMenuA = !this.state.showMenuA;
    this.setState({currentMenuId: nextMenuId, previousMenuId, showMenuA, slideDirection});
  }

  _alterMenu(menu, childrenClone, parentMenuKey) {
    const defaultSubMenProps = {
      isOpen: false,
      onSelectHandler: () => {
        this._navigateToMenu(menu.props.menuKey, SlideDirection.left);
      },
      onBackHandler: () => {
        this._navigateToMenu(parentMenuKey, SlideDirection.right);
      }
    };

    return React.cloneElement(menu, defaultSubMenProps, childrenClone);
  }

  _processChildren(menu, menus, parentMenuKey) {
    const childrenClone = Children.map(menu.props.children, child => {
      if (child.props && child.props.children) {
        const menuKey = menu.props.menuKey || parentMenuKey;
        return this._processChildren(child, menus, menuKey);
      }

      return child;
    });

    if (menu.props.menuKey) {
      const menuClone = this._alterMenu(menu, childrenClone, parentMenuKey);
      menus[menuClone.props.menuKey] = menuClone;
      return menuClone;
    }

    return React.cloneElement(menu, {}, childrenClone);
  }

  _renderNavigation(menu) {
    if (menu.props.menuKey === this.props.menuKey) {
      return menu.props.children;
    }

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
