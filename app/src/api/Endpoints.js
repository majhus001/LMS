import { API_BASE_URL } from "./base_Url";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,

  CREATE_COURSE: `${API_BASE_URL}/api/courses`,
  GET_COURSES: `${API_BASE_URL}/api/courses`,

  CREATE_QUIZ: `${API_BASE_URL}/api/quiz`,
};
