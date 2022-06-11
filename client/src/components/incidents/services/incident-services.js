import http from "../../shared/http-common";

class IncidentDataService {
  getAll() {
    return http.get("/incidents");
  }
  getAllPagedIncident(perPage,currentPage) {
    return http.get(`/incidents/getAll?size=`+perPage+`&page=`+currentPage);
  }
  getMyAllPagedIncident(perPage,currentPage,assignee) {
    return http.get(`/incidents/getAll?size=`+perPage+`&page=`+currentPage+`&assignee=`+assignee);
  }
  get(id) {
    return http.get(`/incidents/${id}`);
  }

  create(data) {
    return http.post("/incidents/create", data);
  }

  update(id, data) {
    return http.post(`/incidents/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/incidents/${id}`);
  }

  deleteAll() {
    return http.delete(`/incidents`);
  }

  findByTitle(title) {
    return http.get(`/incidents?title=${title}`);
  }
}

export default new IncidentDataService();