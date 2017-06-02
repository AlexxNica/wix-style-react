import React from 'react';
import PropTypes from 'prop-types';
import {parse} from 'react-docgen';
import Markdown from '../Markdown';

const prepareParsedProps = props => {
  const asList = Object
    .keys(props)
    .map(key => ({...props[key], name: key}));

  // required props go first
  return [...asList]
    .sort(a => a.required ? -1 : 1);
};

const renderPropType = type => {
  const wrap = name => children =>
    <span>{name}({children})</span>;

  const typeHandlers = {
    custom: () => wrap('custom')(),

    enum: value => wrap('oneOf')(value.map((v, i, allValues) =>
      <span key={i}>{v.value}{allValues[i + 1] && ', '}</span>)),

    union: value => wrap('oneOfType')(value.map((v, i, allValues) =>
      <span key={i}>{v.name}{allValues[i + 1] && ', '}</span>)),

    arrayOf: value => wrap('arrayOf')((typeHandlers[value.name] || (i => i))(value.value))
  };

  if (type.value) {
    return (typeHandlers[type.name] || (i => i))(type.value);
  }

  return type.name;
};

const AutoDocs = ({source = ''}) => {
  const {description, displayName, props} = parse(source);

  const propRow = (prop, index) =>
    <tr key={index}>
      <td>{prop.name || '-'}</td>
      <td>{renderPropType(prop.type)}</td>
      <td><Markdown source={`\`${prop.defaultValue && prop.defaultValue.value}\``}/></td>
      <td>{prop.required ? 'yes!' : '-'}</td>
      <td><Markdown source={prop.description}/></td>
    </tr>;

  return (
    <div className="markdown-body">
      <div>
        <h1><code>{`<${displayName}/>`}</code> Component</h1>
      </div>

      { description && <Markdown source={description}/> }

      <h2>Component <code>props</code></h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default Value</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          { prepareParsedProps(props).map(propRow) }
        </tbody>
      </table>
    </div>
  );
};

AutoDocs.propTypes = {
  source: PropTypes.string.isRequired
};

export default AutoDocs;

