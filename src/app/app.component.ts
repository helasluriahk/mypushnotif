import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen) {
      
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      if(platform.is('cordova')){     // hanya bisa dijalankan di device langsung, tidak bisa di browser
          // OneSignal code ada disini
        let OneSignal = window["plugins"].OneSignal;

        // jika ingin melakukan debug terhadap OneSignal
        window["plugins"].OneSignal.setLogLevel({logLevel: 5, visualLevel: 5});

        // membuka notifikasi
        var notificationOpenedCallback = function(jsonData){
          console.log('notifikasi yang dibuka: ' + JSON.stringify(jsonData));
          alert("notifikasi dibuka");
        };

        // menerima notifikasi
        var notificationReceivedCallback = function(jsonData){
          console.log('notifikasi yang didapat: ' + JSON.stringify(jsonData));
          alert("notifikasi diterima");
        };

        window["plugins"].OneSignal
          .startInit("461fd605-714d-4273-b26b-c325227acfd7","469765642235")     // appId dan googleProjectNumberAndroid
          .handleNotificationOpened(notificationOpenedCallback)
          .handleNotificationReceived(notificationReceivedCallback)
          .endInit();
        }
    });
  }
}