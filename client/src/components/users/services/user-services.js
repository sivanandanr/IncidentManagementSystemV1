import http from "../../shared/http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users/create", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findUser(user) {
    return http.get(`/users/findUser?email=`+user.userName+`&password=` + user.password);
  }
}

export default new UserDataService();