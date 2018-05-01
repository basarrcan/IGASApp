import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  receiver: String;
  amount: String;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService) { }


  ngOnInit() {
  }

  onTransaction() {
    const transaction = {
      receiver: this.receiver,
      amount: this.amount
    }
    console.log("Transaction sendd: " + transaction);
    this.authService.sendToken(transaction).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.message, { cssClass: 'alert-success', timeout: 5000 });
      } else {
        this.flashMessage.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  } 
}
