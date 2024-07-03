

interface FirebaseConfig {
   apiKey: string;
   authDomain: string;
   projectId: string;
   storageBucket: string;
   messagingSenderId: string;
   appId: string;
   measurementId?: string;
 }
 
 interface Environment {
   production: boolean;
   firebase: FirebaseConfig;
 }
 
export const environment: Environment = {

   production: false,
   firebase:{
    "projectId":"moviestreaming-app-41fa6",
    "appId":"1:1054461303979:web:f15bdc563d0b06d6296bee",
    "storageBucket":"moviestreaming-app-41fa6.appspot.com",
    "apiKey":"AIzaSyAR3oyXXBs78g2deMiS8H5d96OXDeihTD0",
    "authDomain":"moviestreaming-app-41fa6.firebaseapp.com",
    "messagingSenderId":"1054461303979"
   }
};

