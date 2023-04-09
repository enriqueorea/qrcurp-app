import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'snackbar-app',
  template: ` <h1>snackbar works!</h1> `,
})
export class NameComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
