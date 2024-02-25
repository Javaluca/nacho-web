import { Injectable } from '@angular/core';
import { Observable, Subject, concatMap, tap, throwError } from 'rxjs';
import { StartEvent } from '../event/types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private webSocket!: WebSocket;

  private onMessageEventSubject: Subject<MessageEvent> = new Subject<MessageEvent>();
  onMessageEvent$: Observable<MessageEvent> = this.onMessageEventSubject.asObservable();

  constructor() { 

  }

  startBrowsingSession(url: string): Observable<Event> {
    if (!url) {
      return throwError(() => new Error('Invalid url in input'));
    }

    const startEvent: StartEvent = {
      type: 'start-browsing',
      url: url
    };

    return new Observable<Event>(observer => {
      this.webSocket = new WebSocket('ws://localhost:80/ws');

      this.webSocket.onopen = (event) => {
        console.log("OPEN: " + event);

        this.webSocket.onmessage = (startEvent) => {
          // 2. INTERCETTO L'EVENTO DI START
          observer.next(startEvent);
          observer.complete();
        }

        this.webSocket.onerror = (errorEvent) => {
          observer.error(errorEvent)
        }

        // 1. INVIO L'EVENTO DI START
        this.webSocket.send(JSON.stringify(startEvent))
        
      };
    }).pipe(
      tap({ next: e => {
        // 3. SOVRASCRIVO GLI EVENTI
        this.webSocket.onclose = (e) => this.onClose(e);
        this.webSocket.onmessage = (e) => this.onMessage(e);
        this.webSocket.onerror = (e) => this.onError(e);
      }})
    );
  }

  protected onClose(event: CloseEvent): void {
    console.log("CLOSE: " + event);
  }

  public onMessage(event: MessageEvent): void {
    console.log("MESSAGE: " + event);
    this.onMessageEventSubject.next(event);
  }

  protected onError(event: Event): void {
    console.log("ERROR: " + event);
  }

  onSendText(message: string): void {
    this.webSocket.send(message);
  }
}
