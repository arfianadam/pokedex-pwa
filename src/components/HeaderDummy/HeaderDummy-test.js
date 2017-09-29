import React from 'react';
// import ReactDOM from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import { expect } from 'chai';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderDummy from './HeaderDummy';

describe('Header', () => {
  const titleProps = 'Pokedex';
  const reactElement = (
    <MuiThemeProvider>
      <HeaderDummy title={titleProps} />
    </MuiThemeProvider>
  );
  const renderer = renderIntoDocument(reactElement);
  // const dom = ReactDOM.findDOMNode(renderer);
  it('should render correctly', () => expect(renderer).to.be.ok);

  it('should display title correctly', () => {
    const title = findRenderedDOMComponentWithTag(renderer, 'h1').textContent;
    expect(title).to.equal(titleProps);
  })
});
