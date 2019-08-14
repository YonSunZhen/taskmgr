import { Component, OnInit, Inject } from '@angular/core';
//MAT_DIALOG_DATA 引入令牌接收从父页面那边传过来的数据
//MatDialogRef 用户将对话框的数据传到父页面
//对话框默认不支持更换主题的，OverlayContainer可处理
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  form: FormGroup;
  title: string;
  coverImages = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data,
   //泛型？
   private dialogRef: MatDialogRef<NewProjectComponent>,
   private fb: FormBuilder) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    if(this.data.project) {
      this.form = this.fb.group({
        name:[this.data.project.name, Validators.required],
        desc:[this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = '修改项目:';
    }else{
      this.form = this.fb.group({
        name:['',Validators.required],
        desc:[],
        coverImg: [this.data.img]
      });
      this.title = '创建项目:';
    }
    
    
    // console.log(this.data.project);
  }

  onSubmit({value,valid},ev: Event) {
    ev.preventDefault();
    if(!valid){
      return;
    }
    const name = value.name;
    const desc = value.desc;
    const coverImg = value.coverImg;
    // console.log('333333333');
    // console.log(coverImg);
    const data = {
      'name': name,
      'desc': desc,
      'coverImg': coverImg
    }
    this.dialogRef.close(data);
  }

}
