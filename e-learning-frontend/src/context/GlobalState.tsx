import React, { createContext, useState, useReducer, Dispatch, SetStateAction } from "react";
import { setupInterceptorsTo } from "../components/Interceptors";
import Reducer from './reducer'
import axios from 'axios'
setupInterceptorsTo(axios);

const intialeState = {
  axiosData: [],
  error: null,
}

const base_url = "http://localhost:8000/api/v0.1/";

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
  getAssignements: () => Promise<void>,
  getStudentCourses: () => Promise<void>,
  getAnnouncements: () => Promise<void>,
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.get(base_url + `getStudents`, config)
      localStorage.setItem("token", res.data.authorisation.token);
      dispatch({
        type: 'GET_STUDENTS',
        payload: res.data.matches
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getCourses = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.get(base_url + `getCourses`, config)
      localStorage.setItem("token", res.data.authorisation.token);
      dispatch({
        type: 'GET_COURSES',
        payload: res.data.matches
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getInstructors = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.get(base_url + `getInstructors`, config)
      localStorage.setItem("token", res.data.authorisation.token);
      dispatch({
        type: 'GET_INSTRUCTORS',
        payload: res.data.matches
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getAssignements = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.get(base_url + `getAssignements`, config)
      localStorage.setItem("token", res.data.authorisation.token);
      dispatch({
        type: 'GET_INSTRUCTORS',
        payload: res.data.matches
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getStudentCourses = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.get(base_url + `getStudentCourses`, config)
      localStorage.setItem("token", res.data.authorisation.token);
      dispatch({
        type: 'GET_STUDENTS_COURSES',
        payload: res.data.matches
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const getAnnouncements = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.get(base_url + `getAnnouncements`, config)
      localStorage.setItem("token", res.data.authorisation.token);
      dispatch({
        type: 'GET_ANNOUNCEMENTS',
        payload: res.data.matches
      })

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    }
  }

  const addCourse = async (data: object) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.post(base_url + `addCourse`, data, config)
      localStorage.setItem("token", res.data.authorisation.token);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.post(base_url + `addInstructor`, data, config)
      localStorage.setItem("token", res.data.authorisation.token);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.post(base_url + `addStudent`, data, config)
      localStorage.setItem("token", res.data.authorisation.token);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.post(base_url + `createAssignement`, data, config)
      localStorage.setItem("token", res.data.authorisation.token);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.post(base_url + `addAssignement`, data, config)
      localStorage.setItem("token", res.data.authorisation.token);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.post(base_url + `addAnouncement`, data, config)
      localStorage.setItem("token", res.data.authorisation.token);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const res = await axios.post(base_url + `addStudentCourse`, data, config)
      localStorage.setItem("token", res.data.authorisation.token);
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
      getStudentCourses,
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
