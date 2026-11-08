export interface User {
  username: string;
  email: string;
  password?: string;
  role: string;
}
//interfaces für login request und jwt antwort

export interface LoginRequest{
  email: string;
  password: string;
}
export interface LoginResponse{
  token:string;
}