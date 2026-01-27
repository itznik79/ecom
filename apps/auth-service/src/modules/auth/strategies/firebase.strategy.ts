import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseStrategy {
  async verify(idToken: string) {
    return admin.auth().verifyIdToken(idToken);
  }
}
