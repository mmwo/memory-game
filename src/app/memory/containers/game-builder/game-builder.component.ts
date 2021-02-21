import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-builder',
  templateUrl: './game-builder.component.html',
  styleUrls: ['./game-builder.component.scss'],
})
export class GameBuilderComponent implements OnInit {
  form = this.fb.group({
    name: [{ value: '' }, Validators.required],
    cards: this.fb.array([], Validators.required),
  });
  cardsControl = this.form.get('cards') as FormArray;

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
}
