import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActionSheetController, ToastController, Loading } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { OffresPage } from "../offres/offres";
import { MoncomptePage } from "../moncompte/moncompte";
import { PaiementPage } from "../paiement/paiement";
import "rxjs/add/operator/toPromise";
import { Subscription } from "rxjs";
import { MessagePage } from "../message/message";
import { ResultatsPage } from "../resultats/resultats";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Nav
} from "ionic-angular";
import { StorageService } from "../../Interface/Services/storage-service";

import { AppStore } from "../../app/app.store";
import { Store } from "@ngrx/store";
import { UserInformationAction } from "../../Interface/User/user.reducer";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

export interface PageInterface {
  title: string;
  pageName?: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: "page-acceuil",
  templateUrl: "acceuil.html"
})
export class AcceuilPage {
  rootPage = TabsPage;

  @ViewChild(Nav)
  nav: Nav;

  pages: PageInterface[] = [
    { title: "Mode de paiement ", pageName: PaiementPage, icon: "logo-usd" },
    {
      title: "Resutats",
      pageName: ResultatsPage,
      tabComponent: ResultatsPage,
      index: 1,
      icon: "card"
    },
    { title: "Offres", pageName: OffresPage, icon: "card" },
    { title: "Mon Compte", pageName: MoncomptePage, icon: "person" },
    { title: "A propos ", pageName: "A propos", index: 0, icon: "help" },
    {
      title: "Deconnexion ",
      pageName: "Deconnexion",
      index: 0,
      icon: "ios-log-out"
    }
  ];

  private userStateSubscription: Subscription;
  form: FormGroup;
  user: any;
  informationUser: any;
  token: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public http: Http,
    private store: Store<AppStore>
  ) {}

  ngOnInit() {
    
    //this.store.dispatch(new UserInformationAction(this.navParams.get('token')));
    this.userStateSubscription = this.store
      .select("userState")
      .subscribe(userState => {
        this.user = userState.loading;
        this.informationUser=userState.user;
        console.log(userState.user);
      });
  }

  redux() {
    this.navCtrl.push(MessagePage);
  }

  openPage(page: PageInterface) {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
  }
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();
    if (childNav) {
      if (
        childNav.getSelected() &&
        childNav.getSelected().root === page.tabComponent
      ) {
      
        return "primary";
      }
      return;
    
    }

    if (this.nav.getActive()) {
     if(this.nav.getActive().component === page.pageName) {
      return "primary";
    }
    }
  }
}
