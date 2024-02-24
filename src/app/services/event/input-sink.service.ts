import { ElementRef, Injectable } from '@angular/core';
import { KeyDown, MouseClick, MouseMove, NachoEvent, ViewPortResize } from './types';
import { Observable, fromEvent, interval, map, merge, pipe, repeat, sampleTime, timeInterval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputSinkService {

  private _queue: NachoEvent[] = [];

  constructor() { }

  sink(e: NachoEvent): void {
    this._queue.push(e);
  }

  registerSampleTime(target: ElementRef, type: string, time: number = 500): Observable<any> {
    return fromEvent(target.nativeElement, type).pipe(
      sampleTime(time)
    );
  }


  registerMouseMove(target: ElementRef, time: number = 500): Observable<MouseMove> {
    return this.registerSampleTime(target, 'mousemove').pipe(
      map(e => ({
        type: 'mouse-move',
        x: e.x,
        y: e.y
      }))
    )
  }

  registerMouseClick(target: ElementRef): Observable<MouseClick> {
    return fromEvent(target.nativeElement, 'click').pipe(
      map((e: any) => ({
        type: 'mouse-click',
        x: e.x,
        y: e.y
      }))
    )
  }

  registerWindowResize(target: ElementRef): Observable<ViewPortResize> {
    return merge(
      interval(10_000),
      fromEvent(window, 'resize'),
    ).pipe(
      map(e => ({
        type: 'viewport-resize',
        width: target.nativeElement.offsetWidth,
        height: target.nativeElement.offsetHeight
      }))
    );
    

    /*return fromEvent(window, 'resize').pipe(
      map((e: any) => ({
        type: 'viewport-resize',
        width: target.nativeElement.offsetWidth,
        height: target.nativeElement.offsetHeight
      })),
      repeat({ delay: 10_000 })
    )*/
  }

  registerKeydown(target: ElementRef): Observable<KeyDown> {
    return fromEvent(window, 'keydown').pipe(
      map((e: any) => ({
        type: 'key-down',
        key: e.key,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        keyCode: e.keyCode,
        shiftKey: e.shiftKey
      }))
    )
  }

  registerAll(target: ElementRef): Observable<NachoEvent> {
    return merge( this.registerMouseMove(target), 
                  this.registerMouseClick(target),
                  this.registerWindowResize(target),
                  this.registerKeydown(target)
                );
  }

}
