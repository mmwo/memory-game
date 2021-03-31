import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-builder',
  templateUrl: './game-builder.component.html',
  styleUrls: ['./game-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBuilderComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '' }, Validators.required],
    cards: this.fb.array([], Validators.required),
  });
  cardsControl = this.form.get('cards') as FormArray;
  defaultPreview = 'img';
  toggleCfg = {
    labels: { unchecked: 'img', checked: 'text' },
    color: { unchecked: '#dddddd', checked: '#00a388' },
    switchColor: { checked: '#ffffff', unchecked: '#ffffff' },
    fontColor: { checked: '#fafafa', unchecked: '#707070' },
  };

  focusedCard: number;
  private lastVisualViewPortHeight = window.visualViewport.height;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    let handler: any;
    window.visualViewport.onresize = () => {
      if (handler) {
        clearTimeout(handler);
      }
      handler = setTimeout(() => {
        this.onResize();
        handler = undefined;
      }, 200);
    };
  }

  onResize() {
    if (this.focusedCard === undefined) {
      this.lastVisualViewPortHeight = window.visualViewport.height;
      return;
    }

    const MIN_KEYBOARD = 200;
    if (this.lastVisualViewPortHeight + MIN_KEYBOARD < window.visualViewport.height) {
      this.focusedCard = undefined;
    }
    this.lastVisualViewPortHeight = window.visualViewport.height;
    this.cd.detectChanges();
  }

  newControlForArray(controlPath: string): AbstractControl {
    switch (controlPath) {
      case 'cards':
        return this.fb.control({
          text: '',
          img: '',
        });
    }
  }

  onAddNewCard($event: MouseEvent) {
    $event.preventDefault();
    this.cardsControl.push(this.newControlForArray('cards'));
  }

  onChange($event: { target: { checked: boolean } }) {
    console.log('input change', $event.target.checked);
    this.defaultPreview = $event.target.checked ? 'text' : 'img';
  }

  onFocus(i: number) {
    this.focusedCard = i;
    console.log('focused: ', i);
  }
}
