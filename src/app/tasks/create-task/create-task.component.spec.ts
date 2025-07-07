// File: src/app/tasks/create-task/create-task.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateTaskComponent }                      from './create-task.component';
import { HttpClient }                               from '@angular/common/http';
import { of, throwError }                           from 'rxjs';
import { environment }                              from '../../../environments/environment';

describe('CreateTaskComponent (spy-based)', () => {
  let fixture: ComponentFixture<CreateTaskComponent>;
  let component: CreateTaskComponent;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  const formData = {
    title:       'Test Task',
    description: 'Test Description',
    status:      'Pending',
    priority:    'High',
    dueDate:     '2025-12-31',
  };

  beforeEach(waitForAsync(() => {
    // 1) Create the spy
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);

    // 2) Configure the testing module:
    TestBed.configureTestingModule({
      imports: [ CreateTaskComponent ]  // your standalone component brings in all its imports
    })
    // 3) Override the component's own providers so it uses our spy:
    .overrideComponent(CreateTaskComponent, {
      set: {
        providers: [
          { provide: HttpClient, useValue: httpSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      // 4) Create the component
      fixture   = TestBed.createComponent(CreateTaskComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a new task successfully', () => {
    // Arrange
    component.taskForm.setValue(formData);
    httpSpy.post.and.returnValue(of({ id: 1, ...formData }));

    // Act
    component.createTask();

    // Assert
    const url = `${environment.apiBaseUrl}/api/tasks`;
    expect(httpSpy.post).toHaveBeenCalledWith(url, formData);
    expect(component.successMessage).toContain('Task created successfully!');
    expect(component.errorMessage).toBe('');
  });

  it('should handle error when task creation fails', () => {
    // Arrange
    component.taskForm.setValue(formData);
    httpSpy.post.and.returnValue(
      throwError(() => ({ error: { message: 'Failure occurred' } }))
    );

    // Act
    component.createTask();

    // Assert
    const url = `${environment.apiBaseUrl}/api/tasks`;
    expect(httpSpy.post).toHaveBeenCalledWith(url, formData);
    expect(component.errorMessage).toContain('Error creating task: Failure occurred');
    expect(component.successMessage).toBe('');
  });
});
