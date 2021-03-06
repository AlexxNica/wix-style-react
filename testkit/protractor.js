import {protractorTestkitFactoryCreator} from '../src/test-common';
/*eslint no-duplicate-imports: 0*/
export {getStoryUrl, waitForVisibilityOf, scrollToElement} from '../src/test-common';

import inputDriverFactory from '../src/Input/Input.protractor.driver';
export const inputTestkitFactory = protractorTestkitFactoryCreator(inputDriverFactory);

import labelDriverFactory from '../src/Label/Label.protractor.driver';
export const labelTestkitFactory = protractorTestkitFactoryCreator(labelDriverFactory);

import badgeDriverFactory from '../src/Badge/Badge.protractor.driver';
export const badgeTestkitFactory = protractorTestkitFactoryCreator(badgeDriverFactory);

import buttonDriverFactory from '../src/Button/Button.protractor.driver';
export const buttonTestkitFactory = protractorTestkitFactoryCreator(buttonDriverFactory);

import buttonSelectionDriverFactory from '../src/ButtonSelection/ButtonSelection.protractor.driver';
export const buttonSelectionTestkitFactory = protractorTestkitFactoryCreator(buttonSelectionDriverFactory);

import dataTableDriverFactory from '../src/DataTable/DataTable.protractor.driver';
export const dataTableTestkitFactory = protractorTestkitFactoryCreator(dataTableDriverFactory);

import breadcrumbsDriverFactory from '../src/Breadcrumbs/Breadcrumbs.protractor.driver';
export const breadcrumbsTestkitFactory = protractorTestkitFactoryCreator(breadcrumbsDriverFactory);

import autoCompleteDriverFactory from '../src/AutoComplete/AutoComplete.protractor.driver';
export const autoCompleteTestkitFactory = protractorTestkitFactoryCreator(autoCompleteDriverFactory);

import checkboxDriverFactory from '../src/Checkbox/Checkbox.protractor.driver';
export const checkboxTestkitFactory = protractorTestkitFactoryCreator(checkboxDriverFactory);

import dropdownDriverFactory from '../src/Dropdown/Dropdown.protractor.driver';
export const dropdownTestkitFactory = protractorTestkitFactoryCreator(dropdownDriverFactory);

import filePickerDriverFactory from '../src/FilePicker/FilePicker.protractor.driver';
export const filePickerTestkitFactory = protractorTestkitFactoryCreator(filePickerDriverFactory);

import radioGroupDriverFactory from '../src/RadioGroup/RadioGroup.protractor.driver';
export const radioGroupTestkitFactory = protractorTestkitFactoryCreator(radioGroupDriverFactory);

import textAreaDriverFactory from '../src/TextArea/TextArea.protractor.driver';
export const textAreaTestkitFactory = protractorTestkitFactoryCreator(textAreaDriverFactory);

import textFieldDriverFactory from '../src/TextField/TextField.protractor.driver';
export const textFieldTestkitFactory = protractorTestkitFactoryCreator(textFieldDriverFactory);

import autoCompleteCompositeDriverFactory from '../src/AutoCompleteComposite/AutoCompleteComposite.protractor.driver';
export const autoCompleteCompositeTestkitFactory = protractorTestkitFactoryCreator(autoCompleteCompositeDriverFactory);

import rangeDriverFactory from '../src/Range/Range.protractor.driver';
export const rangeTestkitFactory = protractorTestkitFactoryCreator(rangeDriverFactory);

import fieldWithSelectionCompositeDriverFactory from '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.protractor.driver';
export const fieldWithSelectionCompositeTestkitFactory = protractorTestkitFactoryCreator(fieldWithSelectionCompositeDriverFactory);

import googleAddressWithInputDriverFactory from '../src/GoogleAddressInputWithLabel/GoogleAddressInputWithLabel.protractor.driver';
export const googleAddressWithInputTestkitFactory = protractorTestkitFactoryCreator(googleAddressWithInputDriverFactory);

import toggleSwitchDriverFactory from '../src/ToggleSwitch/ToggleSwitch.protractor.driver';
export const toggleSwitchTestkitFactory = protractorTestkitFactoryCreator(toggleSwitchDriverFactory);

import imageViewerDriverFactory from '../src/ImageViewer/ImageViewer.protractor.driver';
export const imageViewerTestkitFactory = protractorTestkitFactoryCreator(imageViewerDriverFactory);

import textDriverFactory from '../src/Text/Text.protractor.driver';
export const textTestkitFactory = protractorTestkitFactoryCreator(textDriverFactory);

export {protractorToastTestkitFactory} from '../src/Toast/testkit/Toast.protractor';
