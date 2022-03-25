import { Component, OnInit } from '@angular/core';
import { SetDataService } from '../shared/setDataService.service';
import { DataService } from '../shared/dataService.service';
import { StorageService } from '../shared/storageService.service';
import { Comment, Data, Reply, User } from '../shared/model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  commentsArry: Comment[] = [];
  currentUser!: User;

  constructor(public setDataService: SetDataService) { }

  async ngOnInit() {
    await this.modifayData()
  }

  async modifayData() {
     await this.setDataService.setData()
     this.currentUser = this.setDataService.currentUser
   }
}
