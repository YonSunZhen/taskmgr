import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
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

  performerLabel = "更改执行者";

  participantLabel = "更改参与者";

  title: string;
  form: FormGroup;
  delInvisible = true;//删除按钮是否显示(true不可用false可用)
  notConfirm = true;//是否弹出确认框(true不弹出false弹出)
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
        remark: [this.data.tasks.remark],
        performerChips: [''],
        participantChips: ['']
      })
      this.title = "修改任务:";
      this.delInvisible = false;
    }else{
      this.form = this.fb.group({
        desc: [],
        priority: [],
        dueDate: [],
        reminder: [],
        remark: [],
        performerChips: [],
        participantChips: []
      })
      this.title = "新建任务:";
      this.delInvisible = true;
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
    this.dialogRef.close({
      'type': 'update',
      'task': data
    });
  }

  //点击删除按钮，弹出确认框
  onDelClick(confirm: boolean) {
    this.notConfirm = confirm;
  }
  //点击确认删除按钮
  reallyDel() {
    this.dialogRef.close({
      'type': 'delete',
      'task': this.data.tasks
    })
  }

}
