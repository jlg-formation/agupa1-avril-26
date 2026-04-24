import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[appAutofocus]',
})
export class Autofocus implements AfterViewInit {
  elt = inject<ElementRef<HTMLInputElement>>(ElementRef);

  constructor() {
    console.log('this.elt.nativeElement: ', this.elt.nativeElement);
  }
  ngAfterViewInit(): void {
    this.elt.nativeElement.select();
  }
}
