 /* import {FormControl} from "@angular/forms";

interface Form{
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  role: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface Credentials{
  email: string;
  role: string;
  password: string;
}

interface User extends Credentials{
  name: string;
  lastName: string;
}

export interface GenericObject<T, R>{
  name: T;
  lastName: T;
  email: T;
  password: T;
}

interface DataBaseImages{
  data: {
    name: string;
    url: string;
  },
  key: string;
}

interface UserData{
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;// true -> si el usuario a verificado su email, falso en caso cotrario
  phoneNumber: string;
  providerId: string;// github, google, password
}

interface NavItem{
  path: string,
  label: string,
  icon: string
}

export class UserSchema{
  private readonly email: string;
  private readonly displayName: string;
  private readonly photoURL: string;
  private readonly emailVerified: boolean;
  private readonly phoneNumber: string;
  private readonly providerId: string;

  constructor(email: string, displayName: string, photoURL: string, emailVerified: boolean, phoneNumber: string, providerId: string) {
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.emailVerified = emailVerified;
    this.phoneNumber = phoneNumber;
    this.providerId = providerId;
  }

  get getEmail(): string {
    return this.email;
  }

  get getDisplayName(): string {
    return this.displayName;
  }

  get getPhotoURL(): string {
    return this.photoURL;
  }

  get getEmailVerified(): boolean {
    return this.emailVerified;
  }

  get getPhoneNumber(): string {
    return this.phoneNumber;
  }

  get getProviderId(): string {
    return this.providerId;
  }

  get fullData(): UserDataDto{
    return {
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      emailVerified: this.emailVerified,
      phoneNumber: this.phoneNumber,
      providerId: this.providerId
    }
  }
}

interface NavItem{
  path: string,
  label: string,
  icon: string
}

export type FormDto = Form
export type UserDto = User
export type DataBaseImagesDto = DataBaseImages
export type UserDataDto = UserData
export type NavItemDto = NavItem */