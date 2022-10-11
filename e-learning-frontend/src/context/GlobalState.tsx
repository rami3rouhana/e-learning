import React, { createContext, useState, useReducer, Dispatch, SetStateAction } from "react";
import { setupInterceptorsTo } from "../components/Interceptors";
import Reducer from './reducer'
import axios from 'axios'
setupInterceptorsTo(axios);

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


interface GlobalContext {
  user: GlobalStateInterface,
  setUser: Dispatch<SetStateAction<GlobalStateInterface>>
  getStudents: () => Promise<void>,
  getCourses: () => Promise<void>,
  getInstructors: () => Promise<void>,
  getAssignements: (data:object) => Promise<void>,
  getStudentsClass: (data:object) => Promise<void>,
  getAnnouncements: (data:object) => Promise<void>,
  addStudentCourse: (data:object) => Promise<void>,
  addAnouncement: (data:object) => Promise<void>,
  createAssignement: (data:object) => Promise<void>,
  addAssignement: (data:object) => Promise<void>,
  addStudent: (data:object) => Promise<void>,
  addInstructor: (data:object) => Promise<void>,
  addCourse: (data:object) => Promise<void>,
  axiosData: (data:object) => Promise<void>
}

export const GlobalStateContext = createContext({} as GlobalContext)

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [user, setUser] = useState<GlobalStateInterface>({ name: '', loggedIn: false, role: 0, jwt: '' })

  const [state, dispatch] = useReducer(Reducer, intialeState)

  console.log(state);


  const getStudents = async () => {
    try {
      const res = await axios.get('getStudents');
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
      const res = await axios.get(`getCourses`)
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
      const res = await axios.get(`getInstructors`)
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

  const getAssignements = async (data:object) => {
    try {
      const res = await axios.post(`getAssignements`,data);
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

  const getStudentsClass = async (data:object) => {
    try {
      const res = await axios.post(`getStudentsClass`,data)
      debugger
      dispatch({
        type: 'GET_STUDENTS_COURSES',
        payload: res.data.students
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getAnnouncements = async (data:object) => {
    try {
      const res = await axios.post(`getAnnouncements`,data);
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
      const res = await axios.post(`addCourse`, data)
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

  const addInstructor = async (data: object) => {
    try {
      const res = await axios.post(`addInstructor`, data)
      dispatch({
        type: 'ADD_INSTRUCTOR',
        payload: res.data.matches
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const addStudent = async (data: object) => {
    try {
      const res = await axios.post(`addStudent`, data)
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

  const createAssignement = async (data: object) => {
    try {
      const res = await axios.post(`createAssignement`, data)
      dispatch({
        type: 'CREATE_ASSIGNEMENT',
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
      const res = await axios.post(`addAssignement`, data)
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
      const res = await axios.post(`addAnouncement`, data)
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
      const res = await axios.post(`addStudentCourse`, data)
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
      setUser,
      getStudents,
      getInstructors,
      getCourses,
      getAssignements,
      getStudentsClass,
      getAnnouncements,
      addStudentCourse,
      addAnouncement,
      createAssignement,
      addAssignement,
      addStudent,
      addInstructor,
      addCourse,
      axiosData: state
    }}>
      {children}
    </GlobalStateContext.Provider>
  )
}
