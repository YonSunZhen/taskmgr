import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {

  title: string;
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
   private dialogRef: MatDialogRef<NewTaskListComponent>,
   private fb: FormBuilder) { }

  ngOnInit() {
    if(this.data.taskLists) {
      this.form = this.fb.group({
        name: [this.data.taskLists.name]
      })
      this.title = '修改列表名称:';
    }else{
      this.form = this.fb.group({
        name: []
      })
      this.title = '创建列表:'
    }
  }

  onSubmit({value,valid},ev: Event) {
    ev.preventDefault();
    const name = value.name;
    const data = {
      'name': name
    }
    this.dialogRef.close(data);
  }

}
