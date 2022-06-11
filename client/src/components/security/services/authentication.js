// import { validateUser } from '../helpers/http'

export const getAuthState = () => {
  return {
    
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    name: localStorage.getItem('name')
  }
}

export const isLoggedin = () => {
    if(localStorage.getItem('name'))
    {
        return true;
    }
    else{
        return false;
    }
}
export const login = (user) => {
    localStorage.setItem('username', user.email);
    localStorage.setItem('name', user.name);
    localStorage.setItem('role', user.role);
    return {
      username: user.username,
      role: user.role,
      name: user.name
    }
}

export const logout = () => {
    localStorage.clear();
}