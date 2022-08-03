export interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    country_id: number;
    country_name: string;
    country_code: string;
}

export interface AddCustomer {
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    country_id?: number | null;
}

export interface Country {
    id: number;
    name: string;
    country_code: string;
}

export interface FilePath {
    name: string;
}

export type sortColumn = 'name' | 'email' | 'country_name';

export interface CustomerSort {
    column: sortColumn;
    dirAsc: boolean;
}

export type themeValues = 'light-theme' | 'dark-theme';

export interface Theme {
    title: string;
    value: themeValues;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
}

export interface Login {
    email?: string | null;
    password?: string | null;
}

/* export interface course {
    id: number;
    name: string;
    description?: string | null;
    price: number;
} */
export interface User {
    token?: string;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface RegisterUser {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    password?: string | null;
}



export interface Course {
    id: number;
    name: string;
    price: number;
    description: string;
   
}

export interface addCourse {
    name: string;
    price: number;
    description: string;
}


export interface FilePath {
    name: string;
}

export type sortCourses = 'name' | 'price' | 'description';

export interface CourseSort {
    column: sortCourses;
    dirAsc: boolean;
}
