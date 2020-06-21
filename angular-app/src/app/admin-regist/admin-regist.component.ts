import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, SimpleChanges, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../shared/service/group.service';
import { MotivationService } from '../shared/service/motivation.service';
import { DirectivityService } from '../shared/service/directivity.service';
import { CharmService } from '../shared/service/charm.service';
import { PrefectureService } from '../shared/service/prefecture.service';
import { ReviewerService } from '../shared/service/reviewer.service';
import { Motivation } from '../shared/motivation.model';
import { Reviewer } from '../shared/reviewer.model';
import { Group } from '../shared/group.model';
import { Unit } from '../shared/unit.model';
import { Position } from '../shared/position.model';
import { Directivity } from '../shared/directivity.model';
import { Prefecture } from '../shared/prefecture.model';
import { Charm } from '../shared/charm';
import { PositionService } from '../shared/service/position.service';
import { UnitService } from '../shared/service/unit.service';
import { RouteService } from '../shared/service/route.service';
import { CsvData } from '../shared/csvdata.model';
import { REVIEWER_DEFAULT_PWD } from '../config/config';
import { MessageService } from '../shared/service/message.service';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/service/employee.service';

@Component({
  selector: 'app-admin-regist',
  templateUrl: './admin-regist.component.html',
  styleUrls: ['./admin-regist.component.scss']
})
export class AdminRegistComponent implements OnInit {

  dataLoading = false
  pageMode: string

  reviewers: Reviewer[] = []
  groups: Group[]
  units: Unit[]
  positions: Position[]
  motivations: Motivation[]
  directivities: Directivity[]
  prefectures: Prefecture[]
  charms: Charm[]

  dataSource: MatTableDataSource<any>
  displayedColumns: String[] = [
    'checkbox',
    'name', 'kananame',
    'unitName', 'groupName',
    'positionName', 'motivationName',
    'directivityName', 'charmName',
    'prefectureName', 'reviewerName',
    'station', 'route',
    'family', 'email'
  ]
  columnDisplay: String[]

  csvData: CsvData[] = []
  checked = false;
  countChecked = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  @ViewChild(MatSort, {static: true}) sort: MatSort

  @ViewChild('fileInput') fileInput: any
  @ViewChildren('checkbox') checkbox: any

  constructor(private route: ActivatedRoute, private groupService: GroupService,
              private unitService: UnitService, private positionService: PositionService,
              private motivationService: MotivationService, private directivityService: DirectivityService,
              private charmService: CharmService, private prefectureService: PrefectureService,
              private reviewerService: ReviewerService, private routeService: RouteService,
              private messageService: MessageService, private employeeService: EmployeeService,
              private router: Router) {
                this.routeService.getPreviousRoute(this.router);
              }

  ngOnInit(): void {
    this.pageMode = this.route.snapshot.url[1].path;
    this.unitService.getUnits().subscribe(result => this.units = result)
    this.groupService.getGroups().subscribe(result => this.groups = result)
    this.positionService.getPositions().subscribe(result => this.positions = result)
    if (this.pageMode == 'employees') {
      this.motivationService.getMotivations().subscribe(result => this.motivations = result)
      this.directivityService.getDirectivities().subscribe(result => this.directivities = result)
      this.prefectureService.getPrefectures().subscribe(result => this.prefectures = result)
      this.charmService.getCharms().subscribe(result => this.charms = result)
      this.reviewerService.getAllReviewers().subscribe(result => 
        result.forEach(reviewer => this.reviewers.push(new Reviewer(reviewer)))
      )
      this.columnDisplay =  [
        'checkbox',
        'name', 'kananame', 
        'unitName', 'groupName',
        'positionName', 'motivationName',
        'directivityName', 'charmName',
        'prefectureName', 'reviewerName', 'family',
        'station', 'route',
      ]
    }
    if (this.pageMode == 'reviewers') {
      this.columnDisplay = [
        'checkbox',
        'name', 'kananame',
        'unitName', 'groupName',
        'positionName', 'email'
      ]
    }
  }

  setMatTable(): void {
    this.dataSource = new MatTableDataSource(this.csvData);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'name': return item.firstName;
        default: return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  readFile($event: any) {
    if ($event.target.files[0]) {
      let file = $event.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        let data = reader.result;
        console.log(data)
        let dataArray = (<string>data).split(/\r\n|\n/);
        this.convertDataToModel(dataArray);
        this.setMatTable()
      }

      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
    }
  }

  resetFile() {
    this.fileInput.nativeElement.value = null;
  }

  resetTable() {
    this.resetFile();
    this.csvData = [];
    this.dataSource = new MatTableDataSource();
  }

  convertDataToModel(dataArray: string[]) {
    dataArray.forEach(data => {
        let item = data.split(",");
        let csvData = new CsvData();
        let targetUnit = this.units.find(unit => unit.id == parseInt(item[4]));
        let targetGroup = this.groups.find(group => group.id == parseInt(item[5]));
        let targetPosition = this.positions.find(position => position.id == parseInt(item[6]));
        if (this.pageMode == 'employees') {
          if (item.length != 15) {
            this.messageService.openSnackBar('CSVファイルのフォーマットが不正', '閉じる', 5000);
            this.resetFile();
            return
          }
          let targetMotivation = this.motivations.find(motivation => motivation.id == parseInt(item[7]));
          let targetDirectivity = this.directivities.find(dir => dir.id == parseInt(item[8]));
          let targetCharm = this.charms.find(charm => charm.id == parseInt(item[9]));
          let targetPrefecture = this.prefectures.find(prefec => prefec.id == parseInt(item[10]));
          let targetReviewer = this.reviewers.find(reviewer => reviewer.id == parseInt(item[11]));
          csvData.motivationId = parseInt(item[7]);
          csvData.motivationName = targetMotivation? targetMotivation.motivationName : "未登録";
          csvData.directivityId = parseInt(item[8]);
          csvData.directivityName = targetDirectivity? targetDirectivity.name : "未登録";
          csvData.charmId = parseInt(item[9]);
          csvData.charmName = targetCharm? targetCharm.name : "未登録";
          csvData.prefectureId = parseInt(item[10]);
          csvData.prefectureName = targetPrefecture? targetPrefecture.name : "未登録";
          csvData.reviewerId = parseInt(item[11]);
          csvData.reviewerName = targetReviewer? targetReviewer.name : "未登録";
          csvData.family = item[12];
          csvData.route = item[13];
          csvData.station = item[14];
        }
        if (this.pageMode == 'reviewers') {
          if (item.length != 8) {
            this.messageService.openSnackBar('CSVファイルのフォーマットが不正', '閉じる', 5000);
            this.resetFile();
            return
          }
          csvData.email = item[7];
          csvData.password = REVIEWER_DEFAULT_PWD;
        }
        csvData.checkbox = false;
        csvData.firstName = item[0];
        csvData.lastName = item[1];
        csvData.firstnameKana = item[2];
        csvData.lastnameKana = item[3];
        csvData.unitId = parseInt(item[4]);
        csvData.unitName = targetUnit? targetUnit.name : "未登録";
        csvData.groupId = parseInt(item[5]);
        csvData.groupName = targetGroup? targetGroup.name : "未登録";
        csvData.positionId = parseInt(item[6]);
        csvData.positionName = targetPosition? targetPosition.name : "未登録";
        this.csvData.push(csvData)
      })
      this.resetFile();
  }

  toggleSubmitButton(event) {
    console.log(event)
    if (event.checked) {
      this.checked = true
      this.countChecked++
    } else {
      this.checked = false
      this.countChecked--
    }
  }

  onSubmit() {
    let csvDataChecked  = this.csvData.filter(data => data.checkbox == true)
    if (csvDataChecked.length > 0) {
      let importData: any[] = [];
      if (this.pageMode == "employees") {
        this.employeeService.importEmployee(csvDataChecked).subscribe(result => this.resetTable());
      }
      if (this.pageMode == "reviewers") {
        this.reviewerService.importReviewer(csvDataChecked).subscribe(result => this.resetTable());
      }
    }
  }
}
