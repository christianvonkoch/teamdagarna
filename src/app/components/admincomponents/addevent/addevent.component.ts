import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Event } from '../../../shared/models';

import Quill from 'quill';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})



export class AddeventComponent implements OnInit {

addEventForm: FormGroup;
today: any;

// File upload
task: AngularFireUploadTask;
percentage: Observable<number>;
snapshot: Observable<any>;
downloadURL: Observable<string>;
imagepath: string = '';
logoUploaded: boolean = false;

  constructor(public fb: FormBuilder, private router: Router, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {

    this.today = this.roundMinutes(new Date());

    this.addEventForm = this.fb.group({
      'title': ['', [Validators.required]],
      'ingress': ['', []],
      'about': ['', [Validators.required]],
      'preorunder': ['', [Validators.required]],
      'location': ['', [Validators.required]],
      'eventstarts': [this.today, [Validators.required]],
      'eventends': [this.today, [Validators.required]],
      'signonstarts': [this.today, [Validators.required]],
      'signonends': [this.today, [Validators.required]],
      'signoffends': [this.today, [Validators.required]],
      'maxattendance': ['0', [Validators.required]],
      'foodportions': ['0', []],
      'published': [false, []],
      'coolness': ['0', [Validators.required]],
      'signon': [true, [Validators.required]]
    });

  }

  submit(data) {

    console.log(data)

    const companiesCollection = this.afs.collection<Event>('events');

    const newEvent: Event = {
      title: data.title,
      ingress: data.ingress,
      about: data.about,
      preorunder: data.preorunder,
      location: data.location,
      eventstarts: data.eventstarts,
      eventends: data.eventends,
      signonstarts: data.signonstarts,
      signonends: data.signonends,
      signoffends: data.signoffends,
      maxattendance: data.maxattendance,
      foodportions: data.foodportions,
      published: data.published,
      coolness: data.coolness,
      imagepath: this.imagepath,
      signon: data.signon
    }

    companiesCollection.add(newEvent).then(() => {
        this.router.navigate(['dreamteamadmin/events'])
    });


  }

  roundMinutes(date) {
    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0);
    return date;
  }

  get signon() { return this.addEventForm.get('signon') }

  // file
  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    this.imagepath = `event/${new Date().getTime()}_${file.name}`;
    const path = `event/${new Date().getTime()}_${file.name}`;



    // The main task
    this.task = this.storage.upload(path, file)

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    this.task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
    ).subscribe()

    this.logoUploaded = true;

  }

}
