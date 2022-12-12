import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { temperatureModel } from 'src/app/Models/Charts/temp_interface';
@Injectable({
  providedIn: 'root',
})
export class FirebaseTempHumService {
  private temperatureCollection!: AngularFirestoreCollection<temperatureModel>;
  temperatureObservable!: Observable<temperatureModel[]>;

  constructor(private readonly fireStoreService: AngularFirestore) {
    this.temperatureCollection =
      fireStoreService.collection<temperatureModel>('TemperatureData');

    this.temperatureObservable = this.temperatureCollection
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            let temperatureData = a.payload.doc.data() as temperatureModel;
            let id = a.payload.doc.id;
            return {
              id,
              ...temperatureData,
            };
          })
        )
      );
  }
}
