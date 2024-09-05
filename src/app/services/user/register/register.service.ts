import { Injectable } from '@angular/core';
import { 
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsersService, LoginInfo } from '../user.service';
import { UserCredential } from '@angular/fire/auth';
import { register } from 'module';




export interface Register{ 
  uid : string; 
  email : string; 
  nickname : string; 
  phoneNumber : string; 
  photoURL : string; 
  role : string; 
}



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  currentRegister?: Register;

  constructor(private firestore: Firestore ,private usersService: UsersService) { }

  getRegisters(): Observable<Register[]> {
    const registersRef = collection(this.firestore, 'registers');
    return collectionData(registersRef, {idField: 'uid'});
  }
  getRegister(uid: string): Observable<Register> {
    const docRef = doc(this.firestore, `registers/${uid}`);
    return collectionData(docRef, {idField: 'uid'});
  }


  async createRegister(loginInfo: LoginInfo,{email, nickname, phoneNumber, photoURL,role}: Register) : Promise<any> {
    const userCredential:UserCredential = await this.usersService.register(loginInfo)
    .catch ((error) => {
      console.log(error);
      return error;
    });
    const uid = userCredential.user.uid;
    this.currentRegister = {uid, email, nickname, phoneNumber, photoURL, role};
    const registersRef = collection(this.firestore, 'registers');
    return addDoc(registersRef ,{email, nickname, phoneNumber, photoURL,role});
  }
  async createRegisterWithGoogle() : Promise<any> {
    const userCredential:UserCredential = await this.usersService.loginWithGoogle()
    .catch ((error) => {
      console.log(error);
      return error;
    });
    const uid = userCredential.user.uid!;
    const photoURL = userCredential.user.photoURL!;
    const nickname = userCredential.user.displayName!;
    const email = userCredential.user.email!;
    const phoneNumber = userCredential.user.phoneNumber!;
    const role = 'Empleado';
    this.currentRegister = {uid, email, nickname, phoneNumber, photoURL, role};
    const registersRef = collection(this.firestore, 'registers');
    return addDoc(registersRef ,{email, nickname, phoneNumber, photoURL,role});
  }

}