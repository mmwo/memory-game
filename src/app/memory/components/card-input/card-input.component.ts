import { Component, forwardRef, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Card, CardModel, ImgCardModel, TextCardModel } from '@app/memory/models';
import { FORM_ERRORS } from '@shared/form-errors.config';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardInputComponent),
      multi: true,
    },
  ],
})
export class CardInputComponent implements OnChanges, ControlValueAccessor {
  cardModel: CardModel;
  @Input() formControlName: string;
  @Input() disabled = false;
  @Input() defaultPreview: 'img' | 'text' = 'img';

  @Input()
  public set value(value: Card) {
    this._value = value;
    this.onChange(value);
  }

  public get value(): Card {
    return this._value;
  }

  private _value: Card;

  constructor(@Optional() private controlContainer: ControlContainer, @Inject(FORM_ERRORS) private errors: any) {}

  // ngOnInit(): void {
  //   this.updateCardModel(this.defaultPreview);
  // }

  onChange: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(value: Card) {
    if (value !== undefined) {
      this._value = value;
    }
  }

  onInput($event: string) {
    this.value = { ...this.value, text: $event };
    this.updateCardModel('text');
  }

  updateCardModel(type: 'text' | 'img'): void {
    switch (type) {
      case 'text':
        this.cardModel = new TextCardModel(
          this.value && this.value.text ? this.value.text : 'Start typing\nand adjust length\nwith linebreaks',
          ''
        );
        break;
      case 'img':
        this.cardModel = new ImgCardModel(
          this.value && this.value.img ? this.value.img : './assets/img/card-placeholder.svg',
          ''
        );
        break;
    }
    this.cardModel.revealed = true;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onSelectImage($event: MouseEvent) {
    $event.preventDefault();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes.defaultPreview && changes.defaultPreview.currentValue) {
      this.updateCardModel(changes.defaultPreview.currentValue);
    }
  }
}
