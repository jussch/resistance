/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import FlashReportComponent from 'components/game/FlashReportComponent.js';

describe('FlashReportComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(FlashReportComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('flashreport-component');
  });
});
