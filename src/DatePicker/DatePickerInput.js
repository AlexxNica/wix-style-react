import React, {Component} from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

import Input from '../Input';

import styles from './DatePickerInput.scss';

export default class DatePickerInput extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    prefix: PropTypes.node,
    customInput: PropTypes.node
  };

  static defaultProps = {
    prefix: <div className={styles.icon}/>
  }

  render() {
    const desiredProps = omit(this.props, ['style', 'customInput']);
    const {style, onClick} = this.props;
    const customInput = this.props.customInput || <Input/>;
    const prefix = customInput.props.prefix || this.props.prefix;

    return (
      <div style={style} onClick={onClick}>
        {
          React.cloneElement(customInput, {
            ref: Input => this.input = Input,
            onEscapePressed: () => this.blur(),
            prefix,
            ...desiredProps,
            ...customInput.props
          })
        }
      </div>
    );
  }

  blur() {
    this.input.blur();
  }

  focus = () => {}
}
