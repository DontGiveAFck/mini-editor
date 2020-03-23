import {
  SET_EDITOR_TEXT_INPUT_VALUE,
  SET_EDITOR_TEXT_FONT,
  SET_EDITOR_TEXT_COLOR,
  SET_TEXT_POSITION,
  ADD_TEXT,
  REMOVE_LAST_ADDED_TEXT,
  SET_TEXT_SIZE
} from '../actions/imageEditor';
import {
  canvasSize,
  fonts,
  INVALID_HEX_VALUE,
  INVALID_TEXT_VALUE,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  MAX_TEXT_FIELD_VALUE_LENGTH
} from "../constants/common";
import { hexValidate, numberValidate } from '../helpers/common';

const initialState = {
  formValues: {
    text: '',
    font: fonts[0],
    color: '',
    position: {
      x: '0',
      y: '0',
    },
    fontSize: '1',
  },
  errors: {
    color: '',
    text: '',
  },
  textsOnCanvas: [],
};

const imageEditorReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_EDITOR_TEXT_FONT: {
      return {
        ...state,
        errorMessage: '',
        formValues: {
          ...state.formValues,
          font: action.value
        }
      }
    }

    case SET_EDITOR_TEXT_INPUT_VALUE: {
      if (action.value.length > MAX_TEXT_FIELD_VALUE_LENGTH) return state;

      return {
        ...state,
        errors: {
          ...state.errors,
          text: ''
        },
        formValues: {
          ...state.formValues,
          text: action.value
        }
      }
    }

    case SET_EDITOR_TEXT_COLOR: {
      return {
        ...state,
        errors: {
          ...state.errors,
          color: ''
        },
        formValues: {
          ...state.formValues,
          color: action.value
        }
      }
    }

    case SET_TEXT_POSITION: {
      const { axis, value } = action;

      if (!numberValidate(value)) {
        return state;
      }

      // allow only integers
      let newValue = parseInt(value) || 0;

      // if value more than canvas size - trim it
      if (axis === 'x' && Number(value) > canvasSize.width) {
        newValue = canvasSize.width;
      } else if (axis === 'y' && Number(value) > canvasSize.height) {
        newValue = canvasSize.height;
      }
      return {
        ...state,
        formValues: {
          ...state.formValues,
          position: {
            ...state.formValues.position,
            [axis]: newValue
          }
        }
      }
    }

    case ADD_TEXT: {
      const { textObject } = action;

      // validate text
      if(!textObject.text) {
        return {
          ...state,
          errors: {
            ...state.errors,
            text: INVALID_TEXT_VALUE
          }
        }
      }

      // validate HEX color
      if(!hexValidate(textObject.color)) {
        return {
          ...state,
          errors: {
            ...state.errors,
            color: INVALID_HEX_VALUE
          }
        }
      }

      return {
        ...state,
        formValues: {
          text: '',
          font: fonts[0],
          color: '',
          position: {
            x: '0',
            y: '0',
          },
          fontSize: '1',
          isHexFieldValid: false,
        },
        errors: {
          color: '',
          text: '',
        },
        textsOnCanvas: [
          ...state.textsOnCanvas,
          textObject
        ]
      };
    }

    case REMOVE_LAST_ADDED_TEXT: {
      const newTextsArray = [...state.textsOnCanvas];
      newTextsArray.pop();

      return {
        ...state,
        textsOnCanvas: newTextsArray,
      };
    }

    case SET_TEXT_SIZE: {
      let newValue = parseInt(action.fontSize) || 0;

      // check if value - number
      if (!numberValidate(newValue)) {
        return state;
      }

      // if value less then 1 - make it equal 1
      if (Number(newValue) < MIN_FONT_SIZE) {
        newValue = MIN_FONT_SIZE;
      }

      if (Number(newValue) > MAX_FONT_SIZE) {
        newValue = MAX_FONT_SIZE;
      }

      return {
        ...state,
        formValues: {
          ...state.formValues,
          fontSize: newValue
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default imageEditorReducer;
