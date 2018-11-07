import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AppStore } from "../../app/app.store";
import { Store } from "@ngrx/store";
import { UserAction,UserInformationAction } from "../../Interface/User/user.reducer";
import { UserService } from "../../Interface/User/user.service";
import { StorageService } from "../../Interface/Services/storage-service";
import { AcceuilPage } from "../acceuil/acceuil";
import { Modal, ModalController, ModalOptions } from "ionic-angular";
import { InscriptionPage } from "../inscription/inscription";
import { Subscription } from "rxjs";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  private username: string;
  private password: string;
  private message: string;
  private token:string;
  private userStateSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private store: Store<AppStore>,
    private us: UserService,
    private storageService: StorageService,
    private modal: ModalController
  ) {}
  ionViewDidEnter() {
    this.userStateSubscription = this.store
      .select("userState")
      .subscribe(userState => {
        //voir l\'etat du state console.log('message',userState.message);
        this.message = userState.message;
        if (userState.token) {
          this.storageService.set("idUser", userState.token);
          this.token=userState.token;
          this.navCtrl.push(AcceuilPage, { token: userState.token });
        }
      });
  }
  ionViewDidLeave() {
    this.userStateSubscription.unsubscribe();
    this.store.dispatch(new UserInformationAction(this.token));
  }

  login() {
    this.store.dispatch(new UserAction(this.username, this.password));
  }

  inscription() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    
    const myModal: Modal = this.modal.create(InscriptionPage, myModalOptions);

    myModal.present();

    myModal.onDidDismiss(data => {
      console.log("I have dismissed.");
      console.log(data);
    });

    myModal.onWillDismiss(data => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  }
}
