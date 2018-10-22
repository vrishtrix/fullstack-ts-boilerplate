import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from '@env/web';
import { Store } from '@ngxs/store';
import { AuthCheck } from '@kubic/auth';

@Component({
  selector: 'kubic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly title: Title,
  ) {}

  // Add title to web page depending on route data
  // <https://toddmotto.com/dynamic-page-titles-angular-2-router-events>
  ngOnInit() {
    console.log('ngOnInit');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
    ).subscribe(({ title }) => this.setTitle(title));
  }

  private setTitle(title: string) {
    this.title.setTitle(`${environment.app.name} - ${title}`);
  }
}
