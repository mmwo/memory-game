import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Card, CardModel, ImgCardModel, TextCardModel } from '@app/memory/models';
import { FORM_ERRORS } from '@shared/form-errors.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '@app/memory/modals/image-modal/image-modal.component';
import { combineLatest, Subscription } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { filter, startWith, tap } from 'rxjs/operators';

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
export class CardInputComponent implements OnInit, OnChanges, ControlValueAccessor {
  cardModel: CardModel;
  @Input() focusEnabled = false;
  @Input() formControlName: string;
  @Output() focused = new EventEmitter();
  @Input() disabled = false;
  @Input() defaultPreview: 'img' | 'text' = 'img';
  private modalRef: Subscription;

  @Input()
  public set value(value: Card) {
    this._value = value;
    this.onChange(value);
  }

  public get value(): Card {
    return this._value;
  }

  private _value: Card;

  @ViewChild('textarea', { static: false }) private textarea: ElementRef;

  constructor(
    @Optional() private controlContainer: ControlContainer,
    @Inject(FORM_ERRORS) private errors: any,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

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

  onFocus() {
    this.focusEnabled = true;
    this.focused.emit();
    this.updateCardModel('text');
  }

  onBlur() {
    this.focusEnabled = false;
    this.updateCardModel(this.defaultPreview);
  }

  onSelectImage() {
    if (this.modalRef) {
      return;
    }
    const modalRef = this.modalService.open(ImageModalComponent);
    this.modalRef = combineLatest([modalRef.dismissed.pipe(startWith('')), modalRef.closed.pipe(startWith(''))])
      .pipe(
        filter(([a, b]) => a !== '' || b !== ''),
        untilDestroyed(modalRef.componentInstance)
      )
      .subscribe(([img]: [string, any]) => {
        if (img) {
          this.value = { ...this.value, img };
          this.updateCardModel('img');
          this.cd.detectChanges();
        }
        this.modalRef = null;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultPreview && changes.defaultPreview.currentValue) {
      this.updateCardModel(changes.defaultPreview.currentValue);
    }
    if (changes.focusEnabled && !changes.focusEnabled.firstChange && changes.focusEnabled.currentValue === false) {
      this.textarea.nativeElement.blur();
    }
  }
}
