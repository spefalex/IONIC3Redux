import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { FileTransfer } from "@ionic-native/file-transfer";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { MessagePage } from "../pages/message/message";
import { ObjectifPage } from "../pages/objectif/objectif";
import { ResultatsPage } from "../pages/resultats/resultats";
import { EquipePage } from "../pages/equipe/equipe";
import { AcceuilPage } from "../pages/acceuil/acceuil";
import { MenuPage } from "../pages/menu/menu";
import { TabsPage } from "../pages/tabs/tabs";
import { OffresPage } from "../pages/offres/offres";
import { MoncomptePage } from "../pages/moncompte/moncompte";
import { PaiementPage } from "../pages/paiement/paiement";
import { InscriptionPage } from "../pages/inscription/inscription";
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from "@ionic-native/base64";
import { userReducer } from "../Interface/User/user.reducer";
import { StoreModule } from "@ngrx/store";
import { StorageService } from "../Interface/Services/storage-service";
import { GlobalService } from "../Interface/Services/global-service";
import { UserService } from "../Interface/User/user.service";
import { Camera } from "@ionic-native/camera";
import { UserEffects } from "../Interface/User/user.effects";
import { EffectsModule } from "@ngrx/effects";
import { HttpModule } from "@angular/http";
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';


@NgModule({
  declarations: [MyApp, HomePage, AcceuilPage,MessagePage,EquipePage,ResultatsPage,PaiementPage,MoncomptePage,ObjectifPage,OffresPage,InscriptionPage,MenuPage,TabsPage],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(<any>{ userState: userReducer }),
    EffectsModule.forRoot([UserEffects])
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, AcceuilPage,ObjectifPage,ResultatsPage,EquipePage,MoncomptePage,PaiementPage,OffresPage,MessagePage,TabsPage,MenuPage,InscriptionPage],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    StorageService,
    GlobalService,
    ImagePicker,
    Base64,
    Camera,
    File,
    Transfer,
    FilePath,
    FileTransfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
