import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-builder',
  templateUrl: './game-builder.component.html',
  styleUrls: ['./game-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameBuilderComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '' }, Validators.required],
    cards: this.fb.array(
      [
        // ...[...new Array(16).keys()].map(() => ({text: '', img: ''}))
      ],
      Validators.required
    ),
  });
  cardsControl = this.form.get('cards') as FormArray;
  defaultPreview = 'img';
  toggleCfg = {
    labels: { unchecked: 'img', checked: 'text' },
    color: { unchecked: '#dddddd', checked: '#00a388' },
    switchColor: { checked: '#ffffff', unchecked: '#ffffff' },
    fontColor: { checked: '#fafafa', unchecked: '#707070' },
  };

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    console.log(this.form.get('cards'));
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
}
