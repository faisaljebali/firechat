import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  msg:string = '';
  messageRef: AngularFireList<any>;
  messages$: Observable<any[]>;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public db: AngularFireDatabase
  ) {
    this.messageRef = db.list('/messages');
    this.messages$ = this.messageRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
    }));
   }));
  }

  ngOnInit() { }
  sendMessage(mssg){
    if(mssg != ''){
      let data = new Date();
    this.db.list('messages').push({
      id_user:this.authService.userData.uid,
      name:this.authService.userData.displayName,
      email:this.authService.userData.email,
      photo:this.authService.userData.photoURL,
      msg:mssg,
      date_env:`${data}`,
      });
      //console.log(data);
      this.msg ='';
    }
  }
  deleteMsg(course){
    console.log(course.key);
    this.db.object('/messages/' + course.key).remove();

  }
}
