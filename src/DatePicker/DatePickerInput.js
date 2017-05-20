import React, {Component} from 'react';
import omit from 'lodash.omit';
import pick from 'lodash.pick';

import Input from '../Input';

import styles from './DatePickerInput.scss';

export default class DatePickerInput extends Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    value: React.PropTypes.string,
    dateFormat: React.PropTypes.func,
    style: React.PropTypes.object,
    onChange: React.PropTypes.func,
    placeHolder: React.PropTypes.string
  };

  render() {
    const unWantedProps = ['value', 'style'];
    const desiredProps = pick(omit(this.props, unWantedProps));

    return (
      <div style={this.props.style} onClick={this.props.onClick}>
        <Input
          ref={Input => this.input = Input}
          placeholder={this.props.placeHolder}
          value={this.props.value}
          prefix={<div className={styles.icon}/>}
          onEnterPressed={() => this.blur()}
          onEscapePressed={() => this.blur()}
          {...desiredProps}
          />
      </div>
    );
  }

  blur() {
    this.input.blur();
  }

  focus = () => {}
}
