import React from 'react';
import {node} from 'prop-types';
import styles from './styles.scss';

const SideMenu = ({children}) =>
  <div className={styles.root}>
    {children}
  </div>;

SideMenu.propTypes = {
  children: node
};

export default SideMenu;

