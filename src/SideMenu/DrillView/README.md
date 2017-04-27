# SideMenu DrillView

A menu drill view component showing a single menu at a time with a slide animation to/from sub menus.
The menus are rendered using the SideMenu design.


## Usage

```html
<SideMenuDrill id="ROOT" header={header} promotion={promotion} footer={footer}>>
  <SideMenuDrill.Link to="https://www.wix.com">Link #1</SideMenuDrill.Link>
  <SideMenuDrill.Link to="https://www.wix.com">Link #2</SideMenuDrill.Link>
  <SideMenuDrill.SubMenu id="SUB_MENU_1" title="Sub Menu #1">
    <SideMenuDrill.Link to="https://www.wix.com">Link #3</SideMenuDrill.Link>
    <SideMenuDrill.Link to="https://www.wix.com">Link #4</SideMenuDrill.Link>
  </SideMenuDrill.SubMenu>
  <SideMenuDrill.SubMenu id="SUB_MENU_2" title="Sub Menu #2">
    <SideMenuDrill.Link to="https://www.wix.com">Link #5</SideMenuDrill.Link>
    <SideMenuDrill.Link to="https://www.wix.com">Link #6</SideMenuDrill.Link>
  </SideMenuDrill.SubMenu>
</SideMenuDrill>
```

## Props

| propName          | propType | defaultValue | isRequired | description                                                                        |
| -                 | -        | -            | -          | -                                                                                  |
| id                | string   | -            | true       | A unique ID for the menu                                                           |
| header            | node     | -            | -          | A component that will be rendered at the top of the menu                           |
| promotion         | node     | -            | -          | A component that will be rendered right above the footer                           |
| footer            | node     | -            | -          | A component that will be rendered at the bottom of the menu                        |
| children          | node     | -            | -          | A list of navigation items of types `SideMenuDrill.Link`, `SideMenuDrill.SubMenu`  |

## Components

### Link `<SideMenuDrill.Link/>`

Main navigation item

| propName          | propType | defaultValue | isRequired | description                                                                        |
| -                 | -        | -            | -          | -                                                                                  |
| to                | bool     | false        | -          | slightly different styling to indicate active link                                 |
| isActive          | bool     | false        | -          | slightly different styling for hover (e.g. no background transition)               |
| children          | node     | -            | -          | -                                                                                  |
| ...rest           | *        | -            | -          | any other prop will be added to root element (e.g. `onClick`, `onMouseEnter` etc.) |

### SubMenu `<SideMenuDrill.SubMenu/>`

A container of sub navigation items

| propName          | propType | defaultValue | isRequired | description                                                                        |
| -                 | -        | -            | -          | -                                                                                  |
| id                | string   | -            | true       | A unique ID for the menu                                                           |
| title             | string   | -            | true       | The sub menu's title                                                               |
| header            | node     | -            | -          | A component that will be rendered at the top of the menu                           |
| promotion         | node     | -            | -          | A component that will be rendered right above the footer                           |
| footer            | node     | -            | -          | A component that will be rendered at the bottom of the menu                        |
| children          | node     | -            | true       | A list of navigation items of types `SideMenuDrill.Link`, `SideMenuDrill.SubMenu`  |