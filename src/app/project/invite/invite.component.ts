import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
   //泛型？
   private dialogRef: MatDialogRef<InviteComponent>) { }

  items = [
    {
      id: 1,
      name: 'zhangsan',
    },
    {
      id: 2,
      name: 'lisi',
    },
    {
      id: 3,
      name: 'wangwu',
    }
  ]

  ngOnInit() {
    console.log(this.data);
  }

  onClick() {
    this.dialogRef.close('收到了邀请框信息!');
  }

}
