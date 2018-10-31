import { Component } from '@angular/core';
import { environment } from '@foretag/env/web';

@Component({
  selector: 'foretag-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = environment.app.name;
}
