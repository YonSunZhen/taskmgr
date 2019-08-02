import { Component,  forwardRef, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  form: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    })
  }

  removeMember() {

  }

  handleMemberSelection() {
    
  }


}
