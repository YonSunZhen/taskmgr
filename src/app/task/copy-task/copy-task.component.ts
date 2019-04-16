import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss']
})
export class CopyTaskComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) private data,
   //泛型？
   private dialogRef: MatDialogRef<CopyTaskComponent>) { }

   lists: any[];

  ngOnInit() {
    // console.log(this.data);
    this.lists = this.data.lists;
  }

  onClick() {
    this.dialogRef.close('收到了移动列表框信息!');
  }

}
