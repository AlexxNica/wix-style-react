import React, {Children} from 'react';
import {string, func, bool} from 'prop-types';
import {children, once} from '../../../Composite';
import Link from './link';
import Navigation from './index';
import {ArrowLeft} from '../../../Icons/dist';
import styles from './styles.scss';

const SubMenu = ({children, title, isActive, isOpen, onSelectHandler, onBackHandler, ...rest}) => {
  const [navigation] = Children.toArray(children);

  if (isOpen) {
    return (
      <div {...rest}>
        <a className={styles.backLink} onClick={onBackHandler}>
          <span className={styles.backArrow}><ArrowLeft/></span>
          <span>Back</span>
        </a>
        <div className={styles.categoryLabel}>{title}</div>
        {navigation}
      </div>
    );
  }

  return (
    <Link isActive={isActive} onClick={onSelectHandler}>
      {title}
    </Link>
  );
};

SubMenu.defaultProps = {
  isActive: false,
  isOpen: false,
  onSelectHandler: () => {},
  onBackHandler: () => {}
};

SubMenu.propTypes = {
  title: string.isRequired,
  isActive: bool,
  isOpen: bool,
  onSelectHandler: func,
  onBackHandler: func,
  children: children(once(Navigation))
};

export default SubMenu;
