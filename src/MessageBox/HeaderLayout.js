import React from 'react';
import classNames from 'classnames';
import styles from './HeaderLayout.scss';
import SvgX from '../svg/X.js';

const HeaderLayout = ({title, onCancel, style, theme}) => {
  //TODO When deprecation ends, _theme won't be needed.
  let _theme;
  if (style) {
    console.warn('[wix-style-react>HeaderLayout] Warning. Property \'style\' has been deprecated, and will be removed Jan 1st 2017. Please use \'theme\' instead.');
    _theme = style;
  } else {
    _theme = theme;
  }
//className={classNames(styles.header, styles[_theme], 'test')}
  return (
    <div className={classNames(styles.header, styles[_theme], 'test')} data-hook="header-layout" >
      <span className={styles.titleLabel}>
        {title}
      </span>
      <button className={styles.close} onClick={onCancel}>
        <SvgX width={9} height={9} thickness={1} color={'white'}/>
      </button>
    </div>
  );
};

HeaderLayout.defaultProps = {
  theme: 'blue'
};

HeaderLayout.propTypes = {
  title: React.PropTypes.node,
  onCancel: React.PropTypes.func,
  style: React.PropTypes.oneOf(['red', 'green', 'blue', 'lightGreen']),
  theme: React.PropTypes.oneOf(['red', 'green', 'blue', 'lightGreen'])
};

export default HeaderLayout;
