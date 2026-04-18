import { createContext, useContext } from "react";

export interface StudentUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  course: string;
  courseCode: string;
  enrollmentYear: string;
  semester: string | null;
  status: string;
}

export interface StudentAuthContextType {
  student: StudentUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const StudentAuthContext = createContext<StudentAuthContextType>({
  student: null,
  token: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
});

export function useStudentAuth() {
  return useContext(StudentAuthContext);
}
