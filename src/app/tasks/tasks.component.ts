import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterOutlet],
  template: `

  <p>List all tasks details will always appear at top of page</p>
<br>
<br>
<br>
<router-outlet></router-outlet>


  `,
  styles: ``
})
export class TasksComponent {

}
