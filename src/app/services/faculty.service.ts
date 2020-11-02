import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faculty } from '../models/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private baseURL = "http://localhost:8080/api/v1/faculties";

  constructor(private httpClient: HttpClient) { }

  getFacultyList(): Observable<Faculty[]>{
    return this.httpClient.get<Faculty[]>(`${this.baseURL}`);
  }

  createFaculty(faculty: Faculty): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, faculty);
  }

  updateFaculty(id: number, faculty: Faculty): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, faculty);
  }

  deleteFaculty(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
