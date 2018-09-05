import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Company } from '../../../shared/models';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})


export class CompanyComponent implements OnInit {
  addCompanyForm: FormGroup;

  // id;
  private companyDoc: AngularFirestoreDocument<Company>;
  company: any;

  // File upload
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  logopath: string;
  logoUploaded: boolean = false;

  offersinterview: boolean = false;

  constructor(private findRoute: ActivatedRoute, private afs: AngularFirestore, private storage: AngularFireStorage, public fb: FormBuilder, private router: Router) {
    const companyID = this.findRoute.snapshot.params.id;
    this.companyDoc = afs.collection('companies').doc<Company>(companyID);
    console.log('companies/${companyID}')
    // this.company = this.companyDoc.valueChanges();

    this.getCompany(companyID).subscribe(company => {
        this.company = company;
        this.setValues()
            this.logopath = this.company.logopath;


            if (this.company.reqresume === undefined) {
              this.companyDoc.update({reqresume: false})
            }
            if (this.company.reqcl  === undefined) {
              this.companyDoc.update({reqcl: false})
            }
            if (this.company.reqgrades  === undefined) {
              this.companyDoc.update({reqgrades: false})
            }
            if (this.company.interviewinfo  === undefined) {
              this.companyDoc.update({interviewinfo: ''})
            }
    });




  }

  ngOnInit() {
    // this.id = this.findRoute.snapshot.params.id;
    this.addCompanyForm = this.fb.group({
      'companyName': ['', [Validators.required]],
      'industry': ['', [Validators.required]],
      'internship': [false, []],
      'masterthesis': [false, []],
      'otherthesis': [false, []],
      'parttime': [false, []],
      'fulltime': [false, []],
      'trainee': [false, []],
      'summerjob': [false, []],
      'abroad': [false, [
        ]
      ],
      'engineers': [false, [
        ]
      ],
      'filfakare': [false, [
        ]
      ],
      'firstyear': [false, [
        ]
      ],
      'secondyear': [false, [
        ]
      ],
      'thirdyear': [false, [
        ]
      ],
      'fourthyear': [false, [
        ]
      ],
      'fifthyear': [false, [
        ]
      ],
      'about': ['', [
        Validators.required
        ]
      ],
      'values': ['', [
        ]
      ],
      'firstdayappearance': [false, [
        ]
      ],
      'seconddayappearance': [false, [
        ]
      ],
      'firstdaypackage1': [false, [
        ]
      ],
      'firstdaypackage2': [false, [
        ]
      ],
      'seconddaypackage1': [false, [
        ]
      ],
      'seconddaypackage2': [false, [
        ]
      ],
      'treasurehunt': [false, [
        ]
      ],
      'interviewinfo': ['', [
        ]
      ],
      'reqcl': [false, [
        ]
      ],
      'reqgrades': [false, [
        ]
      ],
      'reqresume': [false, [
        ]
      ],
    });

  }

  getCompany(id) {
    return this.afs.collection('companies').doc<Company>(id).valueChanges();
  }

  setValues() {
    // this.addCompanyForm.setValue({
    //   companyName: 'Todd Motto'
    // });

    this.addCompanyForm.controls['companyName'].patchValue(this.company.name);
    this.addCompanyForm.controls['industry'].patchValue(this.company.industry);
    this.addCompanyForm.controls['internship'].patchValue(this.company.internship);
    this.addCompanyForm.controls['masterthesis'].patchValue(this.company.masterthesis);
    this.addCompanyForm.controls['otherthesis'].patchValue(this.company.otherthesis);
    this.addCompanyForm.controls['parttime'].patchValue(this.company.parttime);
    this.addCompanyForm.controls['fulltime'].patchValue(this.company.fulltime);
    this.addCompanyForm.controls['trainee'].patchValue(this.company.trainee);
    this.addCompanyForm.controls['summerjob'].patchValue(this.company.summerjob);
    this.addCompanyForm.controls['abroad'].patchValue(this.company.abroad);
    this.addCompanyForm.controls['engineers'].patchValue(this.company.engineers);
    this.addCompanyForm.controls['filfakare'].patchValue(this.company.filfakare);
    this.addCompanyForm.controls['firstyear'].patchValue(this.company.firstyear);
    this.addCompanyForm.controls['secondyear'].patchValue(this.company.secondyear);
    this.addCompanyForm.controls['thirdyear'].patchValue(this.company.thirdyear);
    this.addCompanyForm.controls['fourthyear'].patchValue(this.company.fourthyear);
    this.addCompanyForm.controls['fifthyear'].patchValue(this.company.fifthyear);
    this.addCompanyForm.controls['about'].patchValue(this.company.about);
    this.addCompanyForm.controls['values'].patchValue(this.company.values);
    this.addCompanyForm.controls['firstdayappearance'].patchValue(this.company.firstdayappearance);
    this.addCompanyForm.controls['seconddayappearance'].patchValue(this.company.seconddayappearance);
    this.addCompanyForm.controls['firstdaypackage1'].patchValue(this.company.interviewpackages.firstdaypackage1);
    this.addCompanyForm.controls['firstdaypackage2'].patchValue(this.company.interviewpackages.firstdaypackage2);
    this.addCompanyForm.controls['seconddaypackage1'].patchValue(this.company.interviewpackages.seconddaypackage1);
    this.addCompanyForm.controls['seconddaypackage2'].patchValue(this.company.interviewpackages.seconddaypackage2);
    this.addCompanyForm.controls['treasurehunt'].patchValue(this.company.treasurehunt);

    this.addCompanyForm.controls['interviewinfo'].patchValue(this.company.interviewinfo);

    this.addCompanyForm.controls['reqcl'].patchValue(this.company.reqcl);

    this.addCompanyForm.controls['reqresume'].patchValue(this.company.reqresume);

    this.addCompanyForm.controls['reqgrades'].patchValue(this.company.reqgrades);
  }

  update(company: Company) {
    this.companyDoc.update(company);
    this.router.navigate(['dreamteamadmin/companies']);
  }


    submit(data) {
      if (data.firstdaypackage1 || data.firstdaypackage2 || data.seconddaypackage1 || data.seconddaypackage2) {
        this.offersinterview = true;
      }

      const changedCompany: Company = {
        name: data.companyName,
        industry: data.industry,
        internship: data.internship,
        masterthesis: data.masterthesis,
        otherthesis: data.otherthesis,
        parttime: data.parttime,
        fulltime: data.fulltime,
        trainee: data.trainee,
        summerjob: data.summerjob,
        abroad: data.abroad,
        engineers: data.engineers,
        filfakare: data.filfakare,
        firstyear: data.firstyear,
        secondyear: data.secondyear,
        thirdyear: data.thirdyear,
        fourthyear: data.fourthyear,
        fifthyear: data.fifthyear,
        firstdayappearance: data.firstdayappearance,
        seconddayappearance: data.seconddayappearance,
        interviewpackages: {
          firstdaypackage1: data.firstdaypackage1,
          firstdaypackage2: data.firstdaypackage2,
          seconddaypackage1: data.seconddaypackage1,
          seconddaypackage2: data.seconddaypackage2
        },
        treasurehunt: data.treasurehunt,
        about: data.about,
        values: data.values,
        logopath: this.logopath,
        offersinterview: this.offersinterview,
        reqresume: data.reqresume,
        reqcl: data.reqcl,
        reqgrades: data.reqgrades,
        interviewinfo: data.interviewinfo
      }

      this.update(changedCompany)


    }



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
      this.logopath = `companylogos/${new Date().getTime()}_${file.name}`;
      const path = `companylogos/${new Date().getTime()}_${file.name}`;

      // Totally optional metadata
      const customMetadata = { app: 'My AngularFire-powered PWA!' };

      // The main task
      this.task = this.storage.upload(path, file, { customMetadata })

      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot   = this.task.snapshotChanges()

      // The file's download URL
      this.task.snapshotChanges().pipe(
          finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
      ).subscribe()

      this.logoUploaded = true;

    }

    isActive(snapshot) {
      return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
    }

}
