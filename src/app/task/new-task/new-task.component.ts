import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
   //泛型？
   private dialogRef: MatDialogRef<NewTaskComponent>,
   private fb: FormBuilder) { }

  title: string;
  form: FormGroup;
  priorityes = [
    {
      "label":"紧急",
      "value":1
    },
    {
      "label":"重要",
      "value":2
    },
    {
      "label":"普通",
      "value":3
    }
  ]

  ngOnInit() {
    // console.log(this.data.tasks);
    if(this.data.tasks) {
      this.form = this.fb.group({
        desc: [this.data.tasks.desc],
        priority: [this.data.tasks.priority],
        dueDate: [this.data.tasks.dueDate],//截止日期
        reminder: [this.data.tasks.reminder],//提醒日期
        remark: [this.data.tasks.remark]
      })
      this.title = "修改任务:"
    }else{
      this.form = this.fb.group({
        desc: [],
        priority: [],
        dueDate: [],
        reminder: [],
        remark: []
      })
      this.title = "新建任务:"
    }
  }

  onSubmit({value,valid},ev: Event) {
    ev.preventDefault();
    const desc = value.desc;
    const priority = value.priority;
    const dueDate = value.dueDate;
    const reminder = value.reminder;
    const remark = value.remark;
    const data = {
      'desc': desc,
      'priority':priority,
      'dueDate':dueDate,
      'reminder':reminder,
      'remark':remark
    }
    this.dialogRef.close(data);
  }

}
