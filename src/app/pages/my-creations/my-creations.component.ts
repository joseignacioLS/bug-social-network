import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-creations',
  templateUrl: './my-creations.component.html',
  styleUrls: ['./my-creations.component.scss']
})
export class MyCreationsComponent implements OnInit {

  public user: string = "jose"

  constructor() { }

  ngOnInit(): void {
  }

}
