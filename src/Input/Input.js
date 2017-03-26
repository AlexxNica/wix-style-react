import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import Label from '../Label';
import Ticker from './Ticker';
import Unit from './Unit';
import Group from './Group';
import InputPrefix from './InputPrefix';
import InputSuffix from './InputSuffix';
import {CloseThin, ArrowDownThin, Search4, Help, Error, InfoMaterial} from '../Icons/dist';
import Tooltip from '../Tooltip';
import SvgExclamation from '../svg/Exclamation.js';

import styles from './Input.scss';

const isFixVisible = fix => fix.isVisible;

class Input extends Component {
  static Ticker = Ticker;
  static Unit = Unit;
  static Group = Group;

  state = {
    focus: false
  };

  componentDidMount() {
    this.props.autoFocus && this._onFocus();
  }

  render() {
    const {
      id,
      theme,
      value,
      forceHover,
      forceFocus,
      placeholder,
      error,
      help,
      helpMessage,
      unit,
      magnifyingGlass,
      menuArrow,
      defaultValue,
      tabIndex,
      onClear,
      rtl,
      autoFocus,
      onKeyUp,
      readOnly,
      size,
      dataHook,
      prefix,
      suffix,
      disabled,
      type,
      errorMessage,
      roundInput,
      noLeftBorderRadius,
      maxLength,
      noRightBorderRadius,
      textOverflow,
      title
    } = this.props;

    let classes = {
      [styles.root]: true,
      [styles[`theme-${theme}`]]: true,
      [styles[`size-${size}`]]: true,
      [styles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.roundInput]: roundInput,
      [styles.hasValue]: this.input && !!this.input.value
    };

    if (noRightBorderRadius) {
      classes[noRightBorderRadius] = true;
    }

    if (noLeftBorderRadius) {
      classes[noLeftBorderRadius] = true;
    }

    classes = classNames(classes);

    const onIconClicked = () => {
      if (!disabled) {
        this._onFocus();
      }
    };

    const prefixes = [
      {component: () => prefix, isVisible: !!prefix}
    ].filter(isFixVisible);

    const isClearButtonVisible = onClear && !error && !disabled && !!value;

    const errElement = theme === 'amaterial' ?
      this.state.focus ? null :
      <div className={styles.errorIcon}><Error size="1.5em"/></div> :
      (
        <Tooltip dataHook="input-tooltip" disabled={errorMessage.length === 0} placement="top" moveBy={{x: 2, y: 0}} alignment="center" content={errorMessage} overlay="" theme="dark">
          <div className={styles.exclamation}><SvgExclamation width={2} height={11}/></div>
        </Tooltip>
      );

    const helpElement = theme === 'amaterial' ?
      (
        <Tooltip dataHook="input-tooltip" disabled={helpMessage.length === 0} maxWidth="250px" placement="right" moveBy={{x: 6, y: -10}} alignment="center" hideDelay={100} content={helpMessage} overlay="">
          <div className={styles.amaterialHelp}><InfoMaterial height="30" width="30"/></div>
        </Tooltip>
      ) :
      (
        <Tooltip dataHook="input-tooltip" disabled={helpMessage.length === 0} maxWidth="250px" placement="right" moveBy={{x: 2, y: 0}} alignment="center" hideDelay={100} content={helpMessage} overlay="">
          <div className={styles.help}><Help height="20" width="20"/></div>
        </Tooltip>
      );

    const suffixes = [
      {
        component: () =>
          errElement,
        isVisible: error && !disabled
      },
      {
        component: () =>
          helpElement,
        isVisible: help && !disabled
      },
      {
        component: () =>
          <div className={styles.magnifyingGlass} disabled={disabled} onClick={onIconClicked}>
            <Search4 size={'18px'}/>
          </div>,
        isVisible: magnifyingGlass && !isClearButtonVisible && !error
      },
      {
        component: () =>
          <div onClick={onClear} className={styles.clearButton}>
            <CloseThin size={'6px'}/>
          </div>,
        isVisible: isClearButtonVisible
      },
      {
        component: () =>
          <div className={styles.menuArrow} disabled={disabled} onClick={onIconClicked}>
            <ArrowDownThin size={'0.6em'}/>
          </div>,
        isVisible: menuArrow && !isClearButtonVisible && !error && !magnifyingGlass
      },
      {
        component: () => <div className={styles.unitSeparator}/>,
        isVisible: !!unit
      },
      {
        component: () => <div className={styles.unit} onClick={onIconClicked}>{unit}</div>,
        isVisible: !!unit
      },
      {
        component: () => suffix,
        isVisible: !!suffix
      }
    ].filter(isFixVisible);

    const inputClassNames = classNames(styles.input, {
      [styles.withPrefix]: prefixes.length,
      [styles.withSuffix]: suffixes.length,
      [styles.withSuffixes]: suffixes.length > 1
    });

    const innerInputElement = (
      <input
        style={{textOverflow}}
        ref={input => this.input = input}
        className={inputClassNames}
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onChange={this._onChange}
        maxLength={maxLength}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onKeyDown={this._onKeyDown}
        onDoubleClick={this._onDoubleClick}
        placeholder={placeholder}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        onClick={this._onClick}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
        type={type}
        />
    );

    const inputWithWrapper = theme === 'amaterial' ? (
      <Tooltip dataHook="input-tooltip" disabled={errorMessage.length === 0 || theme !== 'amaterial'} placement="right" showTrigger="custom" hideTrigger="custom" hideDelay={5} showDelay={5} active={!this.state.focus} moveBy={{x: 45, y: -10}} alignment="center" content={errorMessage} overlay="">
        {innerInputElement}
      </Tooltip>
    ) :
      innerInputElement;

    return (
      <div className={classes} data-hook={dataHook}>
        { prefixes.length > 0 && <InputPrefix prefixes={prefixes}/> }

        {(theme === 'amaterial') && <Label for={id}>{title}</Label>}

        {inputWithWrapper}

        { suffixes.length > 0 && <InputSuffix suffixes={suffixes}/> }

        {(theme === 'material') && <div className={`${styles.bar} ${styles.barBlack}`}/>}
        {(theme === 'amaterial') && <div className={`${styles.bar} ${styles.barBlue}`}/>}
      </div>
    );
  }

  focus = () => {
    this.input && this.input.focus();
  };

  blur = () => {
    this.input && this.input.blur();
  };

  select = () => {
    this.input && this.input.select();
  };

  _onFocus = () => {
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus();

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  };

  _onBlur = e => {
    this.setState({focus: false});
    this.props.onBlur && this.props.onBlur(e);
  };

  _onClick = e => {
    this.props.onInputClicked && this.props.onInputClicked(e);
  };

  _onKeyDown = e => {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.keyCode === 13 /* enter */) {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.keyCode === 27 /* esc */) {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  };

  _onChange = e => {
    if (this.props.type === 'number' && !(/^\d*$/.test(e.target.value))) {
      return;
    }

    this.props.onChange && this.props.onChange(e);
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  theme: 'normal',
  size: 'normal',
  errorMessage: '',
  helpMessage: '',
  roundInput: false,
  textOverflow: 'clip',
  maxLength: 524288
};

Input.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
  forceHover: PropTypes.bool,
  forceFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  unit: PropTypes.string,
  defaultValue: PropTypes.string,
  tabIndex: PropTypes.number,
  magnifyingGlass: PropTypes.bool,
  menuArrow: PropTypes.bool,
  rtl: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoSelect: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onInputClicked: PropTypes.func,
  onEscapePressed: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  dataHook: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  type: PropTypes.node,
  maxLength: PropTypes.number,
  errorMessage: PropTypes.string,
  roundInput: PropTypes.bool,
  noLeftBorderRadius: PropTypes.string,
  noRightBorderRadius: PropTypes.string,
  help: PropTypes.bool,
  textOverflow: PropTypes.string,
  helpMessage: PropTypes.string,
  title: PropTypes.string
};

export default Input;
