import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Dropdown } from "react-bootstrap";
import { cn } from '@bem-react/classname';

import {
  setEditorTextColor,
  setEditorTextFont,
  setEditorTextInputValue,
  setTextPosition,
  addText,
  setTextSize,
  removeLastAddedText
} from "../../actions/imageEditor";
import { fonts } from '../../constants/common';

import './TopForm.scss';

const block = cn('TopForm');

const mapStateToProps = state => ({
  formData: state.imageEditor.formValues,
  errors: state.imageEditor.errors
});

const mapDispatchToProps = (dispatch) => ({
  setEditorTextColor: (e) => dispatch(setEditorTextColor(e.target.value)),
  setEditorTextFont: (value) => dispatch(setEditorTextFont(value)),
  setEditorTextInputValue: (e) => dispatch(setEditorTextInputValue(e.target.value)),
  setTextPosition: (axis, value) => dispatch(setTextPosition(axis, value)),
  addText: (formData) => dispatch(addText(formData)),
  setTextSize: (e) => dispatch(setTextSize(e.target.value)),
  removeLastAddedText: () => dispatch(removeLastAddedText())
});

const TopForm= (props) => {
  const {
    formData,
    setEditorTextInputValue,
    setEditorTextFont,
    setEditorTextColor,
    setTextPosition,
    addText,
    setTextSize,
    removeLastAddedText,
    errors
  } = props;

  const {text, color, font, position, fontSize } = formData;

  const setPosition = (e) => {
    const { name, value } = e.target;
    setTextPosition(name, value);
  };

  const onSubmitClick = () => {
    addText(formData);
  };

  return (
    <div>
      <Form className={block()}>
        <Form.Group controlId="formBasicEmail" className={block('Field')}>
          <Form.Label>Text</Form.Label>
          <Form.Control type="text" placeholder="Enter text..." value={text} onChange={setEditorTextInputValue} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className={block('Field')}>
          <Dropdown onSelect={setEditorTextFont}>
            <Form.Label>Select font</Form.Label> <br/>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={block('Dropdown')}>
              {font}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {fonts.map(fontValue => (
                <Dropdown.Item
                  eventKey={fontValue}
                  active={font === fontValue}
                  key={fontValue}
                >
                  {fontValue}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group className={block('Field')}>
          <Form.Label>Color in HEX</Form.Label>
          <Form.Control type="text" placeholder="#..." onChange={setEditorTextColor} value={color}/>
        </Form.Group>
        <Form.Group className={block('Field')}>
          <Form.Label>Position X</Form.Label>
          <Form.Control type="text" placeholder="pos x" name="x" onChange={setPosition} value={position.x}/>
        </Form.Group>
        <Form.Group className={block('Field')}>
          <Form.Label>Position Y</Form.Label>
          <Form.Control type="text" placeholder="pos y" name="y" onChange={setPosition} value={position.y}/>
        </Form.Group>
        <Form.Group className={block('Field')}>
          <Form.Label>Text size (px)</Form.Label>
          <Form.Control type="text" onChange={setTextSize} value={fontSize}/>
        </Form.Group>

      </Form>
      <div className={block('ActionButtons')}>
        <Button className={block('ActionButtons-Item')} variant="primary" onClick={onSubmitClick}>
          Submit
        </Button>
        <Button className={block('ActionButtons-Item')} variant="danger" onClick={removeLastAddedText}>
          Undo
        </Button>
        <div>
          {Object.keys(errors).map(errorKey => (
            <span className={block('ErrorMessage')}>{errors[errorKey]}</span>
          ))}
        </div>
      </div>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(TopForm);
