import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { concatMap } from 'rxjs';
import { InputSinkService } from '../../services/event/input-sink.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.scss'
})
export class BrowserComponent implements OnInit {

  @ViewChild('viewport', { static: true }) viewport!: ElementRef;

  constructor(private inputSinkService: InputSinkService, private sessionService: SessionService) {
  }

  ngOnInit(): void {
    if (!this.viewport) {
      throw new Error('Error on identify viewport ref');
    }


    this.sessionService.startBrowsingSession('https://www.google.com/').pipe(
      concatMap(e => this.inputSinkService.registerAll(this.viewport))
    ).subscribe(
      e => this.sessionService.onSendText(JSON.stringify(e))
    );


    this.sessionService.onMessageEvent$.pipe().subscribe((data) => {
      this.viewport.nativeElement.innerHTML = data.data;
    });
  }

}
