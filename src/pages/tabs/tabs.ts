import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResultatsPage } from "../resultats/resultats";
import {EquipePage} from "../equipe/equipe";
import { ObjectifPage } from "../objectif/objectif";
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  Objectif = ObjectifPage;
  Resultats = ResultatsPage;
  Equipe = EquipePage;
  myIndex:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
