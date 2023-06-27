import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceUrl!: string;
  userUrl!: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = 'http://localhost:3000/tasks';
    this.userUrl = 'http://localhost:3000/signupUsers';
  }

  // Add new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceUrl, task);
  }
  
  addUsers(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
  }

  // Get all tasks
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceUrl);
  }

  // Get task by id
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.serviceUrl}/${id}`);
  }

  // Update task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.serviceUrl}/${task.id}`, task);
  }

  // Delete task
  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.serviceUrl}/${id}`);
  }

  

  



  

}
