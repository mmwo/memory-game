import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CardModel } from '@app/memory/models';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show content when card revealed', fakeAsync(() => {
    // Arrange
    const card = new CardModel('12345', 'g1');
    card.revealed = true;
    const cardElement = fixture.nativeElement.querySelector('.card');
    const text = cardElement.querySelectorAll('p')[0];
    // Act
    component.card = card;
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    // Assert
    expect(component.revealed).toEqual(true);
    expect(cardElement.classList).toContain('reveal');

    expect(component.hide).not.toEqual(true);
    expect(cardElement.classList).not.toContain('hide');

    expect(component.show).not.toEqual(true);
    expect(cardElement.classList).not.toContain('show');

    expect(text.innerHTML).toBe(card.value);
  }));

  it('should not show content when card concealed', fakeAsync(() => {
    // Arrange
    const card = new CardModel('12345', 'g1');
    card.revealed = false;
    const cardElement = fixture.nativeElement.querySelector('.card');
    // Act
    component.card = card;
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();

    // Assert
    expect(component.revealed).toEqual(false);
    expect(cardElement.classList).not.toContain('reveal');

    expect(component.hide).not.toEqual(true);
    expect(cardElement.classList).not.toContain('hide');

    expect(component.show).not.toEqual(true);
    expect(cardElement.classList).not.toContain('show');
  }));

  it('emits card on click', () => {
    // Arrange
    const card = new CardModel('12345', 'g1');
    card.revealed = false;

    // Assert
    component.clicked.subscribe((emittedCard: CardModel) => expect(card).toEqual(card));

    // Act
    component.card = card;
    component.onClick();
  });

  it('should not emit on click if card already revealed', fakeAsync(() => {
    // Arrange
    let shouldStayUndefined: CardModel;
    const card = new CardModel('12345', 'g1');
    card.revealed = true;
    component.clicked.subscribe((emittedCard: CardModel) => (shouldStayUndefined = emittedCard));

    // Act
    component.card = card;
    component.onClick();
    tick(100);
    // Assert
    expect(shouldStayUndefined).toBeUndefined();
  }));
});
