import { Routes } from '@angular/router';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { HomeComponent } from './home/home.component';

// export routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: ListTasksComponent }
];

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// bootstrap the Angular app
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
