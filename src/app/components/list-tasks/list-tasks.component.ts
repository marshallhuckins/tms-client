import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>List of Tasks</h2>
    <pre>{{ tasks | json }}</pre>
    <ul>
      <li *ngFor="let task of tasks">{{ task.title }} - {{ task.status }}</li>
    </ul>
  `,
  styles: ``
})
export class ListTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    console.log('ListTasksComponent initialized.');
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('Tasks received from API:', data);
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }
}
