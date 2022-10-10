import { ActionType, GlobalStateInterface } from './types';
import { initialState } from './index';

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
  switch (action.type) {
    case 'GET_STUDENTS':
      return {
        ...state,
        students: action.payload,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'GET_COURSES':
      return {
        ...state,
        courses: action.payload,
      };
    case 'GET_INSTRUCTORS':
      return {
        ...state,
        instructors: action.payload,
      };
    case 'GET_STUDENTS_COURSES':
      return {
        ...state,
        classes: action.payload,
      };
    case 'GET_ASSIGNEMENTS':
      return {
        ...state,
        assignements: action.payload,
      };
    case 'GET_ANNOUNCEMENTS':
      return {
        ...state,
        anouncements: action.payload,
      };
    case 'ADD_COURSE' || 'ADD_INSTRUCTOR' || 'ADD_STUDENT' || 'CREATE_ASSIGNEMENT' || 'ADD_ASSIGNEMENT' || 'ADD_ANNOUNCEMENT' || 'ADD_STUDENTS_COURSE':
      return {
        ...state,
      };
    case 'PURGE_STATE':
      return initialState;
    default:
      return state;
  }
};

export default Reducer;