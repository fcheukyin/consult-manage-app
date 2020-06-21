import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../shared/service/route.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResponsiveService } from '../shared/service/responsive.service';
import { GroupService } from '../shared/service/group.service';
import { UnitService } from '../shared/service/unit.service';
import { EmployeeService } from '../shared/service/employee.service';
import { Employee } from '../shared/employee.model';
import { ReviewerService } from '../shared/service/reviewer.service';
import { MessageService } from '../shared/service/message.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { Group } from '../shared/group.model';
import { Unit } from '../shared/unit.model';
import { Reviewer } from '../shared/reviewer.model';
import { Position } from '../shared/position.model';
import { PositionService } from '../shared/service/position.service';
import * as moment from 'moment';
import { MotivationService } from '../shared/service/motivation.service';
import { PrefectureService } from '../shared/service/prefecture.service';
import { DirectivityService } from '../shared/service/directivity.service';
import { CharmService } from '../shared/service/charm.service';
import { Directivity } from '../shared/directivity.model';
import { Charm } from '../shared/charm';
import { Prefecture } from '../shared/prefecture.model';
import { Motivation } from '../shared/motivation.model';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  pageMode
  formGroup: FormGroup
  user: any
  updateUser: any
  groups: Group[]
  units: Unit[]
  positions: Position[]
  reviewers: Reviewer[] = []
  directivities: Directivity[]
  charms: Charm[]
  prefectures: Prefecture[]
  motivations: Motivation[]

  reviewerAutoComplete: Observable<Reviewer[]>
  datepickerTouchUi: boolean

  constructor(private router: Router, private route: ActivatedRoute,
    private routeService: RouteService, private responsiveService: ResponsiveService,
    private groupService: GroupService, private unitService: UnitService,
    private employeeService: EmployeeService, private reviewerService: ReviewerService,
    private messageService: MessageService, private positionSrvice: PositionService,
    private motivationService: MotivationService, private prefectureService: PrefectureService,
    private directivityService: DirectivityService, private charmService: CharmService,
    private fb: FormBuilder) {}
    
    ngOnInit(): void {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.datepickerTouchUi = this.responsiveService.datepickerTouchUi();
      this.pageMode = this.route.snapshot.paramMap.get('mode');
      if (this.pageMode == 'employees') {
        this.getEmployee(id)
        this.getAllMotivation()
        this.getAllPrefecture()
        this.getAllDirectivity()
        this.getAllCharm()
        this.getAllReviewer()
        this.formGroup = this.fb.group({
          firstName: ['', [Validators.required, Validators.maxLength(10)]],
          lastName: ['', [Validators.required, Validators.maxLength(10)]],
          firstnameKana: ['', [Validators.required, Validators.maxLength(10)]],
          lastnameKana: ['', [Validators.required, Validators.maxLength(10)]],
          route: ['', [Validators.required, Validators.maxLength(30)]],
          station: ['', [Validators.required, Validators.maxLength(30)]],
          family: ['', [Validators.maxLength(50)]],
          prefectureId: ['', [Validators.required]],
          directivityId: ['', [Validators.required]],
          charmId: ['', [Validators.required]],
          motivationId: ['', [Validators.required]],
          reviewerId: ['', [Validators.required]],
          groupId: ['', [Validators.required]],
          unitId: ['', [Validators.required]],
          positionId: ['', [Validators.required]],
          deletedAt: ['']
        })
        this.reviewerAutoComplete = this.formGroup.controls.reviewerId.valueChanges
                                        .pipe(
                                            startWith(''),
                                            map(value => this._filter(value))
                                        );
      }
      if (this.pageMode == 'reviewers') {
        this.getReviewer(id)
        this.formGroup = this.fb.group({
          firstName: ['', [Validators.required, Validators.maxLength(10)]],
          lastName: ['', [Validators.required, Validators.maxLength(10)]],
          firstnameKana: ['', [Validators.required, Validators.maxLength(10)]],
          lastnameKana: ['', [Validators.required, Validators.maxLength(10)]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          groupId: ['', [Validators.required]],
          unitId: ['', [Validators.required]],
          positionId: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
          deletedAt: ['']
        })
      }
      this.groupService.getGroups().subscribe(result => this.groups = result);
      this.unitService.getUnits().subscribe(result => this.units = result);
      this.positionSrvice.getPositions().subscribe(result => this.positions = result);
      this.datepickerTouchUi = this.responsiveService.datepickerTouchUi();
  }

  getEmployee(id) {
    this.employeeService.getEmployeeById(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (!result) {
        this.router.navigate(['/admin/employees']);
        this.messageService.invalidAction();
      } else {
        this.user = new Employee(result);
      }
    })
  }

  getReviewer(id) {
    this.reviewerService.getReviewerById(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (!result) {
        this.router.navigate(['/admin/reviewers']);
        this.messageService.invalidAction();
      } else {
        this.user = new Reviewer(result);
        this.user.password = result.password;
        this.patchInput();
      }
    })
  }

  getAllReviewer() {
    this.reviewerService.getAllReviewers().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      result.forEach(reviewer => this.reviewers.push(new Reviewer(reviewer)))
      this.patchInput();
    })
  }

  getAllMotivation() {
    this.motivationService.getMotivations().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      this.motivations = result;
    })
  }

  getAllCharm() {
    this.charmService.getCharms().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      this.charms = result;
    })
  }

  getAllPrefecture() {
    this.prefectureService.getPrefectures().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      this.prefectures = result;
    })
  }

  getAllDirectivity() {
    this.directivityService.getDirectivities().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      this.directivities = result;
    })
  }

  patchInput() {
    this.formGroup.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      firstnameKana: this.user.firstnameKana,
      lastnameKana: this.user.lastnameKana,
      password: this.user.password,
      positionId: this.user.positionId,
      unitId: this.user.unitId,
      groupId: this.user.groupId,
      deletedAt: this.user.deletedAt
    });
    if (this.pageMode == 'reviewers') {
      this.formGroup.patchValue({
        password: this.user.password,
        email: this.user.email
      });
    }
    if (this.pageMode == 'employees') {
      this.formGroup.patchValue({
        route: this.user.route,
        station: this.user.station,
        family: this.user.family,
        prefectureId: this.user.prefectureId,
        directivityId: this.user.directivityId,
        charmId: this.user.charmId,
        motivationId: this.user.motivationId,
        reviewerId: this.reviewers.find(reviewer => reviewer.id === this.user.reviewerId).name,
      });
    }
  }

  getErrorMessage(control) {
    switch(control) {
        case 'firstName':
            if (this.formGroup.controls.firstName.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.firstName.hasError('maxlength')) {
                return '10文字以下で入力してください'
            }
            break;
        case 'lastName':
            if (this.formGroup.controls.lastName.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.lastName.hasError('maxlength')) {
                return '10文字以下で入力してください'
            }
            break;
        case 'firstnameKana':
            if (this.formGroup.controls.firstnameKana.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.firstnameKana.hasError('maxlength')) {
                return '10文字以下で入力してください'
            }
            break;
        case 'lastnameKana':
            if (this.formGroup.controls.lastnameKana.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.lastnameKana.hasError('maxlength')) {
                return '10文字以下で入力してください'
            }
            break;
        case 'email':
            if (this.formGroup.controls.email.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.email.hasError('maxlength')) {
                return '30文字以下で入力してください'
            }
            if (this.formGroup.controls.email.hasError('email')) {
              return '有効フォーマットで入力してください'
            }
            break;
        case 'password':
            if (this.formGroup.controls.password.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.password.hasError('minlength')) {
                return '8文字以上で入力してください'
            }
            break;
        case 'deletedAt':
            return '有効日付を入力してください';
             break;
        case 'route':
            if (this.formGroup.controls.route.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.route.hasError('minlength')) {
                return '30文字以下で入力してください'
            }
            break;
        case 'station':
            if (this.formGroup.controls.station.hasError('required')) {
                return '必須項目'
            }
            if (this.formGroup.controls.station.hasError('minlength')) {
                return '30文字以下で入力してください'
            }
            break;
    }
  }

  onSubmit() {
    var current = moment().format('YYYY-MM-DD HH:mm:ss').toString();
    if (this.pageMode === 'reviewers') {
      this.updateUser = {
        id: this.user.id,
        firstName: this.formGroup.controls.firstName.value,
        lastName: this.formGroup.controls.lastName.value,
        firstnameKana: this.formGroup.controls.firstnameKana.value,
        lastnameKana: this.formGroup.controls.lastnameKana.value,
        password: this.formGroup.controls.password.value,
        email: this.formGroup.controls.email.value,
        positionId: this.formGroup.controls.positionId.value,
        unitId: this.formGroup.controls.unitId.value,
        groupId: this.formGroup.controls.groupId.value,
        updatedAt: current
      };
      this.reviewerService.updateReviewer(this.updateUser).subscribe(result => {
        if (result) {
          this.getReviewer(this.user.id);
        }
      });
    }
    if (this.pageMode === 'employees') {
      this.updateUser = {
        id: this.user.id,
        firstName: this.formGroup.controls.firstName.value,
        lastName: this.formGroup.controls.lastName.value,
        firstnameKana: this.formGroup.controls.firstnameKana.value,
        lastnameKana: this.formGroup.controls.lastnameKana.value,
        positionId: this.formGroup.controls.positionId.value,
        unitId: this.formGroup.controls.unitId.value,
        groupId: this.formGroup.controls.groupId.value,
        updatedAt: current,
        route: this.formGroup.controls.route.value,
        station: this.formGroup.controls.station.value,
        family: this.formGroup.controls.family.value,
        prefectureId: this.formGroup.controls.prefectureId.value,
        directivityId: this.formGroup.controls.directivityId.value,
        charmId: this.formGroup.controls.charmId.value,
        motivationId: this.formGroup.controls.motivationId.value,
        reviewerId: this.reviewers.find(reviewer => reviewer.name === this.formGroup.controls.reviewerId.value).id,
      };
      this.employeeService.updateEmployee(this.updateUser).subscribe(result => {
        if (result) {
          this.getEmployee(this.user.id);
        }
      });
    }
  }

  deleteUser() {
    this.updateUser = {
      id: this.user.id,
      name: this.user.name,
      deletedAt: this.formGroup.controls.deletedAt.value
    };
    if (this.pageMode === 'reviewers') {
      this.reviewerService.deleteReviewer(this.updateUser).subscribe(result => {
        if (result) {
          this.router.navigate(['/admin/reviewers'])
        }
      });
    } else {
      this.employeeService.deleteEmployee(this.updateUser).subscribe(result => {
        if (result) {
          this.router.navigate(['/admin/employees'])
        }
      });
    }
  }

  private _filter(value: string): Reviewer[] {
    const filterValue = value.toLowerCase();
    return this.reviewers?.filter(option => option.name.toLowerCase().includes(filterValue));
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
