export interface RegisterData{
email:string;
password:string;
nombre?:string;

};

export interface LoginCredentials{
    email:string;
    password:string;
}

export interface User{
    id:string;
    email:string;
    nombre?:string;
}
export interface AuthResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
}