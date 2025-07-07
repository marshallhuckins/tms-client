import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule, CommonModule],
  template: `
    <div class="content-window">
      <h2>Create Task</h2>

      <form [formGroup]="taskForm" (ngSubmit)="createTask()">
        <label for="title">Title:</label>
        <input id="title" formControlName="title" required />
        <div *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched">
          Title is required (min 3 characters).
        </div>

        <label for="description">Description:</label>
        <textarea id="description" formControlName="description"></textarea>

        <label for="status">Status:</label>
        <input id="status" formControlName="status" />

        <label for="priority">Priority:</label>
        <input id="priority" formControlName="priority" />

        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" formControlName="dueDate" />

        <button type="submit" [disabled]="taskForm.invalid">Create Task</button>
      </form>

      <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  `,
  styles: `
    .content-window { max-width: 600px; margin: auto; }
    label { display: block; margin-top: 10px; }
    input, textarea { width: 100%; padding: 8px; margin-top: 5px; }
    button { margin-top: 15px; padding: 10px 20px; }
    .success { color: green; }
    .error { color: red; }
  `
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  @Output() taskCreated = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: [''],
      priority: [''],
      dueDate: ['']
    });
  }

  createTask() {
  if (this.taskForm.valid) {
    console.log('📢 POSTing to:', `${environment.apiBaseUrl}/api/tasks`); // <--- Add this
    this.http.post(`${environment.apiBaseUrl}/api/tasks`, this.taskForm.value).subscribe({
      next: () => {
        this.successMessage = 'Task created successfully!';
        this.errorMessage = '';
        this.taskForm.reset();
        this.taskCreated.emit();
      },
      error: (error) => {
        this.errorMessage = 'Error creating task: ' + (error.error?.message || error.message);
        this.successMessage = '';
      }
    });
  }
  }
}
