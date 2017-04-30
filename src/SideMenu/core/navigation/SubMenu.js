import React, {Children} from 'react';
import {string, func, node} from 'prop-types';
import Navigation from './index';
import {ArrowLeft} from '../../../Icons/dist';
import styles from './styles.scss';

const SubMenu = ({children, title, onBackHandler}) => {
  const wrappedNavigation = Children.map(children, child => {
    if (child.type === Navigation) {
      return (
        <div>
          <a className={styles.backLink} onClick={onBackHandler}>
            <span className={styles.backArrow}><ArrowLeft/></span>
            <span>Back</span>
          </a>
          <div className={styles.categoryLabel}>{title}</div>
          {child.props.children}
        </div>
      );
    }

    return child;
  });

  return (
    <div>
      {wrappedNavigation}
    </div>
  );
};

SubMenu.defaultProps = {
  onBackHandler: () => {}
};

SubMenu.propTypes = {
  title: string.isRequired,
  onBackHandler: func,
  children: node
};

export default SubMenu;
