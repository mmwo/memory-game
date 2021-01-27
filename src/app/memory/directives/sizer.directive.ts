import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSizer]'
})
export class SizerDirective implements OnInit {
  @Input() appSizer: string;

  constructor(private elRef: ElementRef, private container: ViewContainerRef, private renderer: Renderer2) {}
  @HostListener('window:resize')
  ngOnInit() {
    setTimeout(() => {
      const [width, height] = this.appSizer.split('x');
      const currentWidth = this.elRef.nativeElement.offsetWidth;

      this.renderer.setStyle(this.elRef.nativeElement, 'height', `${(currentWidth / +width) * +height + 40}px`);
    }, 100);
  }
}
