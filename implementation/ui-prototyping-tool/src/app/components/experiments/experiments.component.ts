import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit {

  experiments: any[] = [{name: 'ex 1'}]

  constructor() { }

  ngOnInit(): void {
  }

}
