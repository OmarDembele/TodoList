import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  taskObj: Task = new Task(); ; 
  taskArr !: Task[];

  addTaskValue : string = '';
  updateTaskValue: string = '';

  constructor(private crudService: CrudService){}

  ngOnInit(): void {
    this.updateTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  
  getAllTask() {
    this.crudService.getAllTask().subscribe(
      res => {
        this.taskArr = res;
      }
    ),
    (error: any) => {
      console.log("Unable to get list of tasks");
    }
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (response) => {
        this.ngOnInit();
        this.addTaskValue = '';
      }
    ),
    (error: any) => {
      alert(error);
    }

  }

  updateTask(){
    this.taskObj.task_name = this.updateTaskValue;
    this.crudService.updateTask(this.taskObj).subscribe(
      (response) => {
        this.ngOnInit();
        this.updateTaskValue = '';
      }
    ),
    (error: any) => {
      console.log("Failed to update task");
    }
  }

  deleteTask(etask: Task){
    this.crudService.deleteTask(etask.id).subscribe(
      (response) => {
        this.ngOnInit();
      }
    ),
    (error: any) => {
      console.log("Failed to delete task");
    }
  }

  call(etask: Task){
    this.taskObj = etask;
    this.updateTaskValue = etask.task_name;
  }

}
