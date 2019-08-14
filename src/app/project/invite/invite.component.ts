import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, FormControl,Validators, Form,NgForm} from '@angular/forms';
import { User } from 'src/app/domain';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  inviteLabel = '邀请组员';
  members: User[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data,
   //泛型？
   private dialogRef: MatDialogRef<InviteComponent>,
   private service: UserService) { }

  ngOnInit() {
    // if(this.data.members.length > 0) {
      
    // }   
    let temp = [];
    let promiseArr = [];
    for(let i = 0; i < this.data.members.length; i++) {
      promiseArr.push(new Promise((resolve,reject) => {
        this.service.getById(this.data.members[i]).subscribe(user => {
          temp.push(user[0]);
          resolve();
        })
      }))    
    }
    Promise.all(promiseArr).then(res => {
      this.members = temp;
      console.log('111111');
      console.log(this.members.length);
      console.log(this.members);
    })
  }

  onSubmit(ev: Event, {value, valid}: NgForm) {
    ev.preventDefault();
    this.dialogRef.close(this.members);
  }

}
