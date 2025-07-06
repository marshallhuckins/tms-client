import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-read-task',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-window">
      <h2>Task Details</h2>
      <div *ngIf="task; else loading">
        <p><strong>Title:</strong> {{ task.title }}</p>
        <p><strong>Description:</strong> {{ task.description }}</p>
        <p><strong>Status:</strong> {{ task.status }}</p>
        <p><strong>Priority:</strong> {{ task.priority }}</p>
        <p><strong>Due Date:</strong> {{ task.dueDate | date }}</p>
      </div>
      <ng-template #loading>
        <p>Loading task details...</p>
      </ng-template>
    </div>
  `,
  styles: `
    .content-window {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      background: #f9f9f9;
      border-radius: 8px;
    }
  `
})
export class ReadTaskComponent implements OnInit {
  task: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`${environment.apiBaseUrl}/api/tasks/${id}`).subscribe({
      next: (data) => this.task = data,
      error: (err) => console.error('Error loading task', err)
    });
  }
}
