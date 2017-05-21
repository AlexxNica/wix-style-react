import React, {Component} from 'react';
import ReactDatepicker from 'react-datepicker';
import DatePickerInput from './DatePickerInput';
import moment from 'moment';
import css from './DatePicker.scss';
import omit from 'lodash.omit';

export default class DatePicker extends Component {
  static propTypes = {
    ...ReactDatepicker.propTypes,
    style: React.PropTypes.object,
    value: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    readOnly: React.PropTypes.bool,
    rtl: React.PropTypes.bool,
    theme: React.PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
    prefix: React.PropTypes.node
  };

  static defaultProps = {
    style: {
      width: 150
    },

    filterDate: () => true
  };

  constructor(props) {
    super(props);
    this.filterDate = this.filterDate.bind(this);
  }

  filterDate(date) {
    if (this.props.excludePastDates) {
      if (date < moment().startOf('d')) {
        return false;
      }
    }

    return this.props.filterDate(date);
  }

  renderInput(inputProps) {
    return <DatePickerInput {...inputProps}/>;
  }

  render() {
    const unWantedProps = ['dateFormat', 'excludePastDates', 'filterDate', 'showYearDropdown'];
    const inputProps = omit(this.props, unWantedProps);

    return (
      <div className={css.wrapper}>
        <ReactDatepicker
          {...this.props}
          selected={this.props.value}
          onChange={val => {
            if (this.filterDate(val)) {
              this.props.onChange(val);
            }
          }}
          customInput={this.renderInput(inputProps)}
          filterDate={this.filterDate}
          readOnly={this.props.readOnly}
          showYearDropdown={this.props.showYearDropdown}
          scrollableYearDropdown
          />
      </div>
    );
  }
}
