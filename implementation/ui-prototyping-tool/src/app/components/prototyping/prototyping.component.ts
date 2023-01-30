import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-prototyping',
  templateUrl: './prototyping.component.html',
  styleUrls: ['./prototyping.component.scss']
})
export class PrototypingComponent implements OnInit {

  activate: boolean = true

  constructor(private shared: CommunicationService) { 
    this.getActiveState()
  }

  ngOnInit(): void {
  }

  getActiveState() {
    this.shared.getActiveView().subscribe(val=> {
        this.activate = val
    })
  }

}
