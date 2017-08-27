import { Component } from '@angular/core';

@Component({
  selector: 'sp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public contactLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/dherges',
      icon: 'fa-github'
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/davidh_23',
      icon: 'fa-twitter'
    },
    {
      label: 'Medium',
      href: 'https://medium.com/spektrakel-blog',
      icon: 'fa-medium'
    }
  ];

  public title = 'David Herges';
  public subtitle = 'Web Application Developer';

}
