import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ManageTaskComponent } from './tasks/manage-task/manage-task.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { ManageProjectComponent } from './projects/manage-project/manage-project.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'tasks',
        component: TasksComponent,
        children: [
          { path: 'create', component: CreateTaskComponent },
          { path: 'manage', component: ManageTaskComponent },
          { path: 'list', component: ListTasksComponent },
          { path: '', redirectTo: 'create', pathMatch: 'full' }
        ]
      },

      {
        path: 'projects',
        component: ProjectsComponent,
        children: [
          { path: 'create', component: CreateProjectComponent },
          { path: 'manage', component: ManageProjectComponent },
          { path: '', redirectTo: 'create', pathMatch: 'full' } // Default to create
        ]
      }
    ]
  }
];
