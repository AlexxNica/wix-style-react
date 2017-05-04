import React from 'react';
import {ArrowLeft} from '../../../Icons/dist';
import {func} from 'prop-types';
import styles from './styles.scss';

const BackLink = ({onBackHandler}) => (
  <a className={styles.backLink} onClick={onBackHandler} data-hook="menu-navigation-back-link">
    <span className={styles.backArrow}><ArrowLeft/></span>
    <span>Back</span>
  </a>
);

BackLink.propTypes = {
  onBackHandler: func
};

export default BackLink;
