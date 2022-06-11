import http from "../../shared/http-common";

class ProjectDataService {
  getAll() {
    return http.get("/projects");
  }

  create(data) {
    return http.post("/projects/create", data);
  }

  delete(id) {
    return http.delete(`/projects/${id}`);
  }
}

export default new ProjectDataService();