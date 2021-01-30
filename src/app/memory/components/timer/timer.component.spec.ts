import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import { TimeFormatPipe } from '@app/memory/pipes/time-format.pipe';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimerComponent, TimeFormatPipe],
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
    expect(component.currentTick).toBeUndefined();
  }));

  it('timer is ticking on start and should stop on destroy', fakeAsync(() => {
    let time = null;
    component.ngOnInit();
    component.start();
    tick(2000);
    component.ngOnDestroy();
    time = component.currentTick;
    expect(component.currentTick).toBeGreaterThan(0);
    tick(2000);
    expect(component.currentTick).toBe(time);
    component.stop();
  }));

  it('should continue ticking not affected by consecutive calling on start', fakeAsync(() => {
    component.ngOnInit();
    component.start();
    fixture.detectChanges();
    tick(1000);
    const time = component.currentTick;
    component.start();
    tick(1000);
    component.start();
    tick(1000);
    component.start();
    tick(1000);
    expect(component.currentTick).toBeGreaterThan(time);
    expect(component.currentTick).toBeGreaterThan(2);
    component.stop();
  }));
});
