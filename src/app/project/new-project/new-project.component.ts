import { Component, OnInit, Inject } from '@angular/core';
//MAT_DIALOG_DATA 引入令牌接收从父页面那边传过来的数据
//MatDialogRef 用户将对话框的数据传到父页面
//对话框默认不支持更换主题的，OverlayContainer可处理
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  title: ''
  constructor(@Inject(MAT_DIALOG_DATA) private data,
   //泛型？
   private dialogRef: MatDialogRef<NewProjectComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(this.data.project);
  }

  onClick() {
    this.dialogRef.close('收到了新建项目框信息!');
  }

}
