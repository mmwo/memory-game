import { SizerDirective } from './sizer.directive';
import { Component, DebugElement, Renderer2, Type } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoreModule } from '@core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: ` <div class="container" appSizer="{{ size }}">asdf</div> `,
})
class TestSizerComponent {
  size: string;
}

function resizeWindowTo(width: number) {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: width });
  window.dispatchEvent(new Event('resize'));
}

describe('SizerDirective', () => {
  let fixture: ComponentFixture<TestSizerComponent>;
  let renderer2: Renderer2;
  let container: DebugElement;
  let component: TestSizerComponent;

  describe('Directive: Sizer', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, CommonModule, TranslateModule.forRoot({}), SharedModule, BrowserAnimationsModule],
        declarations: [TestSizerComponent, SizerDirective],
        providers: [Renderer2],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSizerComponent);
      component = fixture.componentInstance;
      renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);

      spyOn(renderer2, 'setAttribute').and.callThrough();
      spyOn(renderer2, 'setStyle').and.callThrough();
    }));

    it('should scale height basing on provided size', fakeAsync(() => {
      // on init
      component.size = '2x3';
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 600 });
      fixture.detectChanges();
      tick(200);
      expect(renderer2.setStyle).toHaveBeenCalledWith(jasmine.any(Object), 'height', '940px');

      // resize
      container = fixture.debugElement.query(By.css('.container'));
      resizeWindowTo(200);
      tick(200);
      expect(renderer2.setStyle).toHaveBeenCalledWith(jasmine.any(Object), 'height', '340px');

      // on init
      component.size = '4x3';
      resizeWindowTo(600);
      fixture.detectChanges();
      tick(200);
      expect(renderer2.setStyle).toHaveBeenCalledWith(jasmine.any(Object), 'height', '490px');

      // resize
      resizeWindowTo(1000);
      tick(200);
      expect(renderer2.setStyle).toHaveBeenCalledWith(jasmine.any(Object), 'height', '790px');
    }));
  });
});
