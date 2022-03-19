import { Component, OnInit } from '@angular/core';
import { SetDataService } from '../shared/currentUser.service';
import { DataService } from '../shared/dataService.service';
import { StorageService } from '../shared/storageService.service';
import { Comment, Data, User } from '../shared/utils';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(private dataService: DataService,
              private setDataService: SetDataService,
              private storageService: StorageService,
    ) { }

  ngOnInit(): void {
    // this.commentsArry = this.setDataService.commentsArray    
    this.modifayData()
    console.log(this.currentUser)
  }

  commentsArry: Comment[] = []
  currentUser: User = {
    "image": { 
      "png": "assets/images/avatars/image-juliusomo.png",
      "webp": "assets/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  }

  async modifayData() {
      // const data: Data = await this.dataService.getData()
      // const { comments, currentUser } = data
      // this.commentsArry = comments;
      
      // this.currentUser = currentUser;
      // console.log(this.currentUser)

     await this.setDataService.setData()
     this.commentsArry = this.storageService.getFromLocalStorage('comments')
     this.currentUser = this.storageService.getFromLocalStorage('currentUser')

   }
}
