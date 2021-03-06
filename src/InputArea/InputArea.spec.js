import React from 'react';
import inputAreaDriverFactory from './InputArea.driver';
import InputArea from './InputArea';
import {createDriverFactory} from '../test-common';
import {inputAreaTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {inputAreaTestkitFactory as enzymeInputAreaTestkitFactory} from '../../testkit/enzyme';
import sinon from 'sinon';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';

describe('InputArea', () => {
  const createDriver = createDriverFactory(inputAreaDriverFactory);

  describe('value attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        value: 'hello',
        onChange: () => {}
      };

      const driver = createDriver(<InputArea {...props}/>);
      expect(driver.getValue()).toEqual(props.value);
    });
  });

  describe('defaultValue attribute', () => {
    it('should pass down to the wrapped input', () => {
      const defaultValue = 'hello';

      const driver = createDriver(<InputArea defaultValue={defaultValue}/>);
      expect(driver.getDefaultValue()).toEqual(defaultValue);
    });
  });

  describe('rows attribute', () => {
    it('should pass down to the wrapped input', () => {
      const rows = 5;

      const driver = createDriver(<InputArea rows={rows}/>);
      expect(driver.getRowsCount()).toEqual(rows);
    });
  });

  describe('maxHeight attribute', () => {
    it('should pass down to the wrapped input', () => {
      const maxHeight = '50px';

      const driver = createDriver(<InputArea maxHeight={maxHeight}/>);
      expect(driver.getStyle().maxHeight).toEqual(maxHeight);
    });
  });

  describe('maxLength attribute', () => {
    it('should pass down to the wrapped input - with max length', () => {
      const maxLength = 5;

      const driver = createDriver(<InputArea maxLength={maxLength}/>);
      expect(driver.getMaxLength()).toEqual(maxLength);
    });
  });


  describe('hasCounter attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputArea hasCounter/>);
      expect(driver.getHasCounter()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getHasCounter()).toBeFalsy();
    });
  });

  describe('resizable attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputArea resizable/>);
      expect(driver.getResizable()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getResizable()).toBeFalsy();
    });
  });

  describe('rows attribute', () => {
    it('should pass down to the wrapped input', () => {
      const rows = 5;

      const driver = createDriver(<InputArea rows={rows}/>);
      expect(driver.getRowsCount()).toEqual(rows);
    });
  });

  describe('tabIndex attribute', () => {
    it('should pass down to the wrapped input', () => {
      const tabIndex = 1;

      const driver = createDriver(<InputArea tabIndex={tabIndex}/>);
      expect(driver.getTabIndex()).toEqual(tabIndex);
    });
  });

  describe('readOnly attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputArea readOnly/>);
      expect(driver.getReadOnly()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getReadOnly()).toBeFalsy();
    });
  });

  describe('error attribute', () => {
    it('should display an error icon if error is true', () => {
      const driver = createDriver(<InputArea error/>);

      expect(driver.hasError()).toBeTruthy();
    });
  });

  describe('onChange attribute', () => {
    it('should be called when text is entered to the input', () => {

      const onChange = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<InputArea onChange={onChange}/>);

      driver.trigger('change', event);

      expect(onChange).toBeCalled();
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called after keybord key got pressed and then released', () => {
      const onKeyUp = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<InputArea onKeyUp={onKeyUp}/>);

      driver.trigger('keyUp', event);

      expect(onKeyUp).toBeCalled();
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<InputArea onFocus={onFocus}/>);

      driver.trigger('focus');

      expect(onFocus).toBeCalled();
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input gets blured', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<InputArea onBlur={onBlur}/>);

      driver.trigger('blur');

      expect(onBlur).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onKeyDown = jest.fn();
      const event = {keyCode: 40};

      const driver = createDriver(<InputArea onKeyDown={onKeyDown}/>);

      driver.trigger('keyDown', event);

      expect(onKeyDown).toBeCalled();
    });
  });

  describe('onEnter attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onEnterPressed = jest.fn();
      const event = {key: 'Enter', keyCode: 13, which: 13};

      const driver = createDriver(<InputArea onEnterPressed={onEnterPressed}/>);

      driver.trigger('keyDown', event);

      expect(onEnterPressed).toBeCalled();
    });
  });

  describe('forceFocus attribute', () => {
    it('should have focus class on input if forceFocus is true', () => {
      const driver = createDriver(<InputArea forceFocus/>);
      expect(driver.isFocusedStyle()).toBeTruthy();
    });
  });

  describe('forceHover attribute', () => {
    it('should have hover class on input if forceHover is true', () => {
      const driver = createDriver(<InputArea forceHover/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });

    it('should be hovered if forceFocus is false and forceHover is true', () => {
      const driver = createDriver(<InputArea forceHover forceFocus={false}/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });
  });

  describe('autoFocus attribute', () => {
    it('Mounting an input element with autoFocus=false, should give it the focus', () => {
      let autoFocus = false;
      const driver = createDriver(<InputArea autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      autoFocus = true;
      driver.setProps({autoFocus});
      expect(driver.isFocus()).toBeFalsy();
    });

    it('Mounting an input element with autoFocus=true, gives it the focus', () => {
      const driver = createDriver(<InputArea autoFocus/>);
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('focus function', () => {
    it('calling focus should give focus to the input', () => {
      const driver = createDriver(<InputArea autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      driver.focus();
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('theme attribute', () => {
    it('should set the theme by default to "normal"', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.isOfStyle('normal')).toBeTruthy();
    });

    it('should allowing setting the theme to "paneltitle"', () => {
      const driver = createDriver(<InputArea theme="paneltitle"/>);
      expect(driver.isOfStyle('paneltitle')).toBeTruthy();
    });

    it('should allow setting the theme to "material"', () => {
      const driver = createDriver(<InputArea theme="material"/>);
      expect(driver.isOfStyle('material')).toBeTruthy();
    });
  });

  describe('aria attributes', () => {
    const createDriver = createDriverFactory(inputAreaDriverFactory);

    it('should allow adding a custom aria-label', () => {
      const driver = createDriver(<InputArea ariaLabel="hello"/>);
      expect(driver.getAriaLabel()).toBe('hello');
    });

    it('should not have any aria label buy default', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getAriaLabel()).toBeNull;
    });

    it('should allow adding aria-controls', () => {
      const driver = createDriver(<InputArea ariaControls="id"/>);
      expect(driver.getAriaControls()).toBe('id');
    });

    it('should not have any aria controls buy default', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getAriaControls()).toBeNull;
    });

    it('should allow adding aria-controls', () => {
      const driver = createDriver(<InputArea ariaDescribedby="blabla"/>);
      expect(driver.getAriaDescribedby()).toBe('blabla');
    });

    it('should not have any aria controls buy default', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getAriaDescribedby()).toBeNull;
    });

  });


  describe('test tooltip', () => {

    const resolveIn = timeout =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({});
        }, timeout);
      });

    describe('onTooltipShow attribute', () => {
      it('should not display the tooltip by default', () => {
        const driver = createDriver(<InputArea error errorMessage="I'm the error message"/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});

        return resolveIn(500).then(() => {
          expect(tooltipDriver.isShown()).toBe(false);
        });
      });

      it('should display the tooltip on mouse hover', () => {
        const driver = createDriver(<InputArea error errorMessage="I'm the error message"/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(tooltipDriver.getContent()).toBe('I\'m the error message');
        });
      });

      it('should call onTooltipShow callback when error tooltip become active', () => {
        const onTooltipShow = sinon.spy();
        const driver = createDriver(<InputArea error errorMessage="I'm the error message" onTooltipShow={onTooltipShow}/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(onTooltipShow.calledOnce).toBeTruthy();
        });
      });
    });
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(isTestkitExists(<InputArea value={value} onChange={onChange}/>, inputAreaTestkitFactory)).toBe(true);
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(isEnzymeTestkitExists(<InputArea value={value} onChange={onChange}/>, enzymeInputAreaTestkitFactory)).toBe(true);
  });
});
