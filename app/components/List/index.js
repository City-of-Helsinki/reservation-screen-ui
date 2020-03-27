/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Ul from './Ul';
import Wrapper from './Wrapper';

function List(props) {
  const ComponentToRender = props.component;
  let content = <div />;

  // If we have items, render them
  if (props.items) {
    const itemsSlice = props.items.slice(0, props.limit);
    content = itemsSlice.map(item => (
      <ComponentToRender key={`item-${item.get('id')}`} item={item} />
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.any, // originally .array, changed to .any because warning
};

export default List;
