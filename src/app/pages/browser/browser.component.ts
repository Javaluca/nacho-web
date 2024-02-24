import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NachoEventHandler } from '../../services/event/handler/nacho-event-handler';
import { InputSinkService } from '../../services/event/input-sink.service';
import { NachoEvent } from '../../services/event/types';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.scss'
})
export class BrowserComponent implements OnInit {


  @ViewChild('viewport', { static: true }) viewport!: ElementRef;

  registeredNachoHandlers: NachoEventHandler<NachoEvent>[] = [];

  constructor(private inputSinkService: InputSinkService) {
  }


  ngOnInit(): void {
    if (!this.viewport) {
      throw new Error('Error on identify viewport ref');
    }

    this.inputSinkService.registerAll(this.viewport).subscribe(
      e => this.viewport.nativeElement.innerHTML = JSON.stringify(e)
    );
  }

}
