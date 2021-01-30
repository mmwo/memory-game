import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CardModel } from '@app/memory/models';
import { Component, ViewChild } from '@angular/core';
import { setTimeoutPromise } from '@app/testUtil';

@Component({
  template: '<div><app-card [card]="card"></app-card></div>',
})
class WrapperTestCardComponent {
  /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
  @ViewChild(CardComponent) public cardComponent: CardComponent;
  card: CardModel;
}

describe('CardComponent', () => {
  let wrapperComponent: WrapperTestCardComponent;
  let component: CardComponent;
  let fixture: ComponentFixture<WrapperTestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperTestCardComponent, CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperTestCardComponent);
    wrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.componentInstance.cardComponent;
  });

  it('should create', () => {
    expect(wrapperComponent).toBeTruthy();
  });

  // should show content when card revealed
  it('should call ngOnChanges', () => {
    // Arrange
    const card = new CardModel('12345', 'g1');
    card.revealed = true;

    // Act
    wrapperComponent.card = card;
    spyOn(component, 'ngOnChanges').and.callThrough();
    fixture.detectChanges();

    // Assert
    expect(component.ngOnChanges).toHaveBeenCalledTimes(1);
  });

  it('should show text', () => {
    // Arrange
    const card = new CardModel('example test', 'g1');
    const cardElement = fixture.nativeElement.querySelector('.card');
    const text = cardElement.querySelectorAll('text')[0];
    // Act
    wrapperComponent.card = card;
    fixture.detectChanges();
    // Assert
    expect(text.innerHTML).toContain(card.value);
  });

  it('should show content when card revealed ', async () => {
    // Arrange
    let state: { show: boolean; hide: boolean; revealed: boolean };
    const sub = component.localState$.subscribe((lState) => (state = lState));
    const card = new CardModel('12345', 'g1');
    card.revealed = true;
    // Act
    wrapperComponent.card = card;
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('.card');
    await setTimeoutPromise(1000);
    sub.unsubscribe();
    fixture.detectChanges();
    // Assert
    expect(state).toEqual({ show: false, hide: false, revealed: true });
    expect(cardElement.classList).toContain('reveal');
    expect(cardElement.classList).not.toContain('hide');
    expect(cardElement.classList).not.toContain('show');
  });

  it('should not show content when card concealed', async () => {
    // Arrange
    let state: { show: boolean; hide: boolean; revealed: boolean };
    const sub = component.localState$.subscribe((lState) => (state = lState));
    const card = new CardModel('12345', 'g1');
    card.revealed = false;
    // Act
    wrapperComponent.card = card;
    fixture.detectChanges();

    await setTimeoutPromise(1000);
    sub.unsubscribe();
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('.card');

    // Assert
    // Assert
    expect(state).toEqual({ show: false, hide: false, revealed: false });

    expect(cardElement.classList).not.toContain('reveal');
    expect(cardElement.classList).not.toContain('hide');
    expect(cardElement.classList).not.toContain('show');
  });

  it('emits card on click', async () => {
    // Arrange
    const card = new CardModel('12345', 'g1');
    card.revealed = false;

    // Assert
    let emittedCard;
    const sub = component.clicked.subscribe((val: CardModel) => (emittedCard = val));

    // Act
    component.card = card;
    component.onClick();
    await setTimeoutPromise(10);
    sub.unsubscribe();
    expect(emittedCard).toEqual(card);
  });

  it('should not emit on click if card already revealed', async () => {
    // Arrange
    let shouldStayUndefined: CardModel;
    const card = new CardModel('12345', 'g1');
    card.revealed = true;
    const sub = component.clicked.subscribe((emittedCard: CardModel) => (shouldStayUndefined = emittedCard));

    // Act
    component.card = card;
    component.onClick();
    await setTimeoutPromise(10);
    sub.unsubscribe();
    // Assert
    expect(shouldStayUndefined).toBeUndefined();
  });
});
