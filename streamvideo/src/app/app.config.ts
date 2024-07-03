import { ApplicationConfig } from '@angular/core';
import { provideRouter, 
  withComponentInputBinding, 
  withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions(), withComponentInputBinding()), 
    provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr(), 
     provideFirebaseApp(() => initializeApp(environment.firebase)), 
     provideAuth(() => getAuth()), 
     provideFirestore(() => getFirestore()), 
     provideDatabase(() => getDatabase()), 
     provideStorage(() => getStorage()),
  ]
};

export default appConfig;