import React, { createContext, useReducer } from "react";
import { setupInterceptorsTo } from "../components/Interceptors";
import Reducer from './reducer'
import axios from 'axios'
setupInterceptorsTo(axios);
const user = { name: '', loggedIn: false, role: 0, jwt: '' };
const intialeState = {
  error: null,
}

export interface GlobalStateInterface {
  name: string,
  loggedIn: boolean,
  role: number,
  jwt: string,
  children?: React.ReactNode
}

export interface State {
  announecements: object
  assignements: object
  courses: object
  students: object
  instructors:object
}


interface GlobalContext {
  state: State,
  user: GlobalStateInterface,
  login: (data: object) => Promise<void>,
  getStudents: () => Promise<void>,
  getCourses: () => Promise<void>,
  getInstructors: () => Promise<void>,
  getAssignements: () => Promise<void>,
  getStudentsClass: (id?: string) => Promise<void>,
  getAnnouncements: () => Promise<void>,
  addStudentCourse: (data: object) => Promise<void>,
  addAnouncement: (data: object) => Promise<void>,
  addAssignement: (data: object) => Promise<void>,
  addUser: (data: object) => Promise<void>,
  addCourse: (data: object) => Promise<void>,
}

export const GlobalStateContext = createContext({} as GlobalContext)

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {

  const [state, dispatch] = useReducer(Reducer, intialeState)

  const login = async (data: object) => {
    try {
      const res = await axios.post('login', data);
      user.name = res.data.name;
      user.jwt = res.data.jwt;
      user.role = res.data.role;
      user.loggedIn = true;
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getStudents = async () => {
    try {
      const res = await axios.get('students');
      dispatch({
        type: 'GET_STUDENTS',
        payload: res.data.students
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }


  const getCourses = async () => {
    try {
      const res = await axios.get(`courses`)
      dispatch({
        type: 'GET_COURSES',
        payload: res.data.courses
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getInstructors = async () => {
    try {
      const res = await axios.get(`instructors`);
      dispatch({
        type: 'GET_INSTRUCTORS',
        payload: res.data.instructors
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getAssignements = async () => {
    try {
      const res = await axios.get(`assignement`);
      dispatch({
        type: 'GET_ASSIGNEMENTS',
        payload: res.data.assignements
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getStudentsClass = async (id?: string) => {
    try {
      let res
      if (!id) {
        res = await axios.get(`studentsclass`)
      } else {
        res = await axios.get(`studentsclass/${id}`)
      }
      if (res.data.classes) {
        dispatch({
          type: 'GET_STUDENTS_COURSES',
          payload: res.data.classes
        })
      } else {
        dispatch({
          type: 'GET_STUDENTS_CLASSES',
          payload: res.data.students
        })
      }
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getAnnouncements = async () => {
    try {
      const res = await axios.get(`announcement`);
      dispatch({
        type: 'GET_ANNOUNCEMENTS',
        payload: res.data.announcements
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const addCourse = async (data: object) => {
    try {
      const res = await axios.post(`course`, data)
      dispatch({
        type: 'ADD_COURSE',
        payload: res.data.matches
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const addUser = async (data: object) => {
    try {
      const res = await axios.post(`user`, data)
      dispatch({
        type: 'ADD_STUDENT',
        payload: res.data.matches
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const addAssignement = async (data: object) => {
    try {
      const res = await axios.post(`assignement`, data)
      dispatch({
        type: 'ADD_ASSIGNEMENT',
        payload: res.data.matches
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const addAnouncement = async (data: object) => {
    try {
      const res = await axios.post(`announcement`, data)
      dispatch({
        type: 'ADD_ANOUNCEMENT',
        payload: res.data.matches
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const addStudentCourse = async (data: object) => {
    try {
      const res = await axios.post(`studentsclass`, data)
      dispatch({
        type: 'ADD_STUDENTS_COURSE',
        payload: res.data.matches
      })
    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  return (
    <GlobalStateContext.Provider value={{
      user,
      login,
      getStudents,
      getInstructors,
      getCourses,
      getAssignements,
      getStudentsClass,
      getAnnouncements,
      addStudentCourse,
      addAnouncement,
      addAssignement,
      addUser,
      addCourse,
      state,
    }}>
      {children}
    </GlobalStateContext.Provider>
  )
}
