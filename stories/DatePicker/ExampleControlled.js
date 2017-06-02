import React from 'react';
import {DatePicker, Input} from 'wix-style-react';
import moment from 'moment';

class ControlledDatePicker extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      value: moment()
    };
  }

  render() {
    return (
      <DatePicker
        value={this.state.value}
        onChange={value => this.setState({value})}
        dateFormat="DD/MM/YYYY"
        customInput={<Input theme="amaterial"/>}
        />
    );
  }
}

export default ControlledDatePicker;
