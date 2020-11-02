import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-nav-bar',
  templateUrl: './tab-nav-bar.component.html',
  styleUrls: ['./tab-nav-bar.component.scss']
})
export class TabNavBarComponent {

  navLinks: any[];

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Students',
        link: './students',
      }, {
        label: 'Faculties',
        link: './faculties',
      }
    ];
  }
}
