// Academy Types

interface IToken {
    access: string;
    refresh: string;
}
interface ILevel {
    id: number;
    name: string;
}

interface IFaculty {
    id: number;
    name: string;
}

interface IDepartment {
    id: number;
    name: string;
    code: string;
}

interface ICourse {
    id: number;
    name: string;
    code: string;
    units: number;
    level: string;
    lecturer: IUser;
}

interface IAcademicYear {
    id: number;
    name: string;
    is_current: boolean;
}

interface ISemester {
    id: number;
    name: string;
    is_current: boolean;
}

// Authorization Types
interface IUser {
    id: number;
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    last_login: string;
    phone_number: string;
    profile: null | string;
}

// Profiles Types
interface IAcademicHistory {
    id: number;
    level: ILevel;
    semester: number;
    academic_year: number;
}

interface IStudentAcademicProfile {
    id: number;
    faculty: IFaculty;
    created_at: string;
    updated_at: string;
    department: IDepartment;
    current_academic_year: IAcademicHistory;
}

// Admission Types
interface INextOfKin {
    id: number;
    email: string;
    address: string;
    full_name: string;
    created_at: string;
    updated_at: string;
    phone_number: string;
    relationship: string;
}

interface ICourseRegistration {
    id: number;
    semester: number;
    courses: ICourse[];
}

interface IStudentRegistration {
    id: number;
    current_step: number;
    is_completed: boolean;
}

interface IPayment {
    id: number;
    amount: number;
    reference: string;
    payment_type: string;
    is_verified: boolean;
    academic_year: string;
}

// Operation Types
interface ITimetable {
    id: number;
    course: ICourse;
    semester: string;
    weekday: string;
    end_time: string;
    start_time: string;
}

interface IAttendance {
    id: number;
    date: string;
    course: ICourse;
    student: number;
    created_at: string;
    is_present: boolean;
    timetable: ITimetable;
}

interface IGPA {
    id: number;
    level: ILevel;
    student: number;
    grade_point: number;
    semester: ISemester;
}


interface IRegistrationPeriod {
    id: number;
    end_date: string;
    start_date: string;
    description: string;
    academic_year: AcademicYear;
}


interface ICourseGrade {
    id: number;
    course: number;
    credits: number;
    course_name: string;
    course_code: string;
    grade_point: number;
  }
  
  interface ISemesterGPA {
    id: number;
    semester: number;
    gpa: number | null;
    total_points: number;
    semester_name: string;
    total_credits: number;
    courses: ICourseGrade[];
  }
  
  interface ISessionGPA {
    id: number;
    level: number;
    level_name: string;
    cgpa: number | null;
    academic_year: number;
    semesters: ISemesterGPA[];
    academic_year_name: string;
  }