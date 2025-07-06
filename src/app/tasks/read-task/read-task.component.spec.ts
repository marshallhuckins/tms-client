import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';
import { ReadTaskComponent } from './read-task.component';

describe('ReadTaskComponent', () => {
  let component: ReadTaskComponent;
  let fixture: ComponentFixture<ReadTaskComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadTaskComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '12345' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadTaskComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    const req = httpMock.expectOne('http://localhost:3000/api/tasks/12345');
    expect(req.request.method).toBe('GET');
    req.flush({
      _id: '12345',
      title: 'Test Task',
      description: 'Test description',
      status: 'Pending',
      priority: 'High',
      dueDate: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      projectId: 1
    });
    expect(component).toBeTruthy();
    httpMock.verify();
  });
});
