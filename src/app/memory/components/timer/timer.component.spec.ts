import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import { TimeFormatPipe } from '@app/memory/pipes/time-format.pipe';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimerComponent, TimeFormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("init doesn't cause timer to start by itself", fakeAsync(() => {
    component.ngOnInit();
    tick(2000);
    expect(component.time).toBeUndefined();
  }));

  it('timer is ticking on start and should stop on destroy', fakeAsync(() => {
    let time = null;
    component.ngOnInit();
    component.start();
    tick(2000);
    component.ngOnDestroy();
    time = component.time;
    expect(component.time).toBeGreaterThan(0);
    tick(2000);
    expect(component.time).toBe(time);
  }));

  it('should continue ticking not affected by consecutive calling on start', fakeAsync(() => {
    component.ngOnInit();
    component.start();
    tick(1000);
    const time = component.time;
    component.start();
    tick(1000);
    component.start();
    tick(1000);
    expect(component.time).toBeGreaterThan(time);
    expect(component.time).toBeGreaterThan(2);
    component.stop();
  }));
});
