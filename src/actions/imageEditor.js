export const SET_EDITOR_TEXT_INPUT_VALUE = 'SET_EDITOR_TEXT_INPUT_VALUE';

export const setEditorTextInputValue = (value) => ({
  type: SET_EDITOR_TEXT_INPUT_VALUE,
  value
});

export const SET_EDITOR_TEXT_FONT = 'SET_EDITOR_TEXT_FONT';

export const setEditorTextFont = (value) => ({
  type: SET_EDITOR_TEXT_FONT,
  value
});

export const SET_EDITOR_TEXT_COLOR = 'SET_EDITOR_TEXT_COLOR';

export const setEditorTextColor = (value) => ({
  type: SET_EDITOR_TEXT_COLOR,
  value
});

export const SET_TEXT_POSITION = 'SET_TEXT_POSITION';

export const setTextPosition = (axis, value) => ({
  type: SET_TEXT_POSITION,
  axis,
  value
});


export const ADD_TEXT = 'ADD_TEXT';

export const addText = (textObject) => ({
  type: ADD_TEXT,
  textObject
});

export const REMOVE_LAST_ADDED_TEXT = 'REMOVE_LAST_ADDED_TEXT';

export const removeLastAddedText = () => ({
  type: REMOVE_LAST_ADDED_TEXT
});

export const SET_TEXT_SIZE = 'SET_TEXT_SIZE';

export const setTextSize = (value) => ({
  type: SET_TEXT_SIZE,
  fontSize: value,
});



