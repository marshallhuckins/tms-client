import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ManageTaskComponent } from './tasks/manage-task/manage-task.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { ManageProjectComponent } from './projects/manage-project/manage-project.component';
import { DashboardComponent } from './dashboard/dashboard.component';



 

//export routes
export const routes: Routes = [
{
path: '',
component: LayoutComponent,
 children: [
{
path: '',component: HomeComponent
},
{
path: 'dashboard',component: DashboardComponent
},
{
path: 'tasks',
component: TasksComponent,
children:[
    {path: 'create', component:CreateTaskComponent},
     {path: 'manage', component:ManageTaskComponent},
     {path:'', redirectTo:'create',pathMatch: 'full' }//default to create
]
},
{
path: 'projects',
component: TasksComponent,
children:[
    {path: 'create', component:CreateProjectComponent},
     {path: 'manage', component:ManageProjectComponent},
     {path:'', redirectTo:'create',pathMatch: 'full' }//default to create
]
}


] 
}
];
/*{
        path: 'user-management',
        component: UserManagementComponent,
        children: userManagementRoutes
      },
      {
        path: 'reports/sales',
        component: SalesComponent,
        children: salesReportRoutes
      },
      {
        path: 'reports/agent-performance',
        component: AgentPerformanceComponent,
        children: agentPerformanceRoutes
      }, */