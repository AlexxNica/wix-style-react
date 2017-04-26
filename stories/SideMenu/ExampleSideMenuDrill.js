import React from 'react';
import {
  SideMenuDrill,
  Button
} from 'wix-style-react';

let counter = 3;

const header = (
  <div onClick={() => console.log('Logo clicked')}>
    <h2 style={{color: '#fff'}}>My Application</h2>
  </div>
);

const promotion = (
  <Button theme="fullpurple" onClick={() => console.log('Promotion button clicked!')}>
    Buy 1 for price of 2!
  </Button>
);


const items = [
  { type: 'link', to: '//wix.com', title: 'link #0_1' },
  { type: 'link', to: '//wix.com', title: 'link #0_2' },
  { type: 'menu', id: 'SUB_MENU_1', title: 'Sub Menu #1', items: [
    { type: 'link', to: '//wix.com', title: 'link #1_1' },
    { type: 'link', to: '//wix.com', title: 'link #1_2' },
    { type: 'link', to: '//wix.com', title: 'link #1_3' }
  ] },
  { type: 'menu', id: 'SUB_MENU_2', title: 'Sub Menu #2', items: [
    { type: 'link', to: '//wix.com', title: 'link #2_1' },
    { type: 'link', to: '//wix.com', title: 'link #2_2' },
    { type: 'link', to: '//wix.com', title: 'link #2_3' }
  ] }
];

class ExampleSideMenuDrill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items
    };
  }

  selectMenu(items, link) {
    items.forEach(item => {
      item.isActive = (item === link);

      if (item.items) {
        this.selectMenu(item.items, link);
      }
    });
  }

  onMenuSelected(e, link) {
    e.preventDefault();
    const items = [...this.state.items];
    this.selectMenu(items, link);
    this.setState({items});
  }

  renderLink(link) {
    return (
      <SideMenuDrill.Link key={link.title} to={link.to} onClick={e => this.onMenuSelected(e, link)} isActive={link.isActive}>
        {link.title}
      </SideMenuDrill.Link>
    );
  }

  renderMenu(menu) {
    return (
      <SideMenuDrill.SubMenu key={menu.id} id={menu.id} title={menu.title}>
        {this.renderItems(menu.items)}
      </SideMenuDrill.SubMenu>
    );
  }

  renderItems(items) {
    return items.map(item => {
      if (item.type === 'link') {
        return this.renderLink(item);
      }

      if (item.type === 'menu') {
        return this.renderMenu(item);
      }

      return null;
    });
  }

  addItem() {
    const newItem = { type: 'link', to: '//wix.com', title: `link #0_${counter++}` };
    this.setState({
      items: [...this.state.items, newItem]
    });
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <div style={{width: 220, height: 700}}>
          <SideMenuDrill id="ROOT" header={header} promotion={promotion}>
            {this.renderItems(items)}
          </SideMenuDrill>
        </div>
        <Button onClick={() => this.addItem()}>Add link to root menu</Button>
      </div>
    );
  }
}


export default ExampleSideMenuDrill;