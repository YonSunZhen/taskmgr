import { Component, OnInit, Inject } from '@angular/core';
//MAT_DIALOG_DATA 引入令牌接收从父页面那边传过来的数据
//MatDialogRef 用户将对话框的数据传到父页面
//对话框默认不支持更换主题的，OverlayContainer可处理
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  form: FormGroup;
  title: ''
  constructor(@Inject(MAT_DIALOG_DATA) private data,
   //泛型？
   private dialogRef: MatDialogRef<NewProjectComponent>,
   private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name:[],
      desc:[]
    })
    this.title = this.data.title;
    // console.log(this.data.project);
  }

  onSubmit({value,valid},ev: Event) {
    ev.preventDefault();
    const name = value.name;
    const desc = value.desc;
    const data = {
      'name': name,
      'desc': desc
    }
    this.dialogRef.close(data);
  }

}
