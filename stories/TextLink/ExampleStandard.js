import React, {Component} from 'react';
import TextLink from 'wix-style-react/TextLink';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '340px',
  lineHeight: '22px'
};

class ControlledExample extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div style={style}>
        <TextLink link="http://www.wix.com">Wix link</TextLink>
        <TextLink underlineStyle="always" link="http://www.wix.com">Wix link underline</TextLink>
        <TextLink underlineStyle="never" link="http://www.wix.com">Wix link without underline</TextLink>
        <TextLink size='small' ariaLabel="wix.com site" link="http://www.wix.com">Samll link with ariaLabel</TextLink>
      </div>


    );
  }
}

export default () =>
  <ControlledExample/>;
