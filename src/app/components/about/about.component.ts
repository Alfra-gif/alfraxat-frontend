import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public titol = "Projecte Angular v8";
  public descripcio = "UF3 M6 - Desenvolupament web entorn client";
  public correu = "ramon.heredia.50@lacetania.cat"

  constructor() { }

  ngOnInit(): void {
  }

}
