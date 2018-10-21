import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'kubic-home-layout',
  templateUrl: './home-layout.component.html'
})
export class HomeLayoutComponent implements OnInit {
  constructor(private readonly pageTitle: Title) {}

  ngOnInit() {
    this.pageTitle.setTitle('Kubic - Home');
  }
}
