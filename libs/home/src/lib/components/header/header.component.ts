import { Component } from '@angular/core';
import { environment } from '@kubic/env/web';

@Component({
  selector: 'kubic-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected title = environment.app.name;
}
