import { Component, Input, OnInit } from '@angular/core';
import { SetDataService } from '../shared/currentUser.service';
import { StorageService } from '../shared/storageService.service';
import { Comment, Reply, User } from '../shared/utils';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment
  imagePath = ""
  currentUser!: User
  replying = false;
  isCurrentUser = false
  constructor(private setDataService: SetDataService, private storageService: StorageService,) { }

  ngOnInit(): void {
    this.modifayData()
    // this.currentUser = this.setDataService.currentUser
    this.imagePath = `../${this.comment?.user?.image?.png}`
    this.isCurrentUser = this.comment.user.username == this.currentUser.username
  }

  displyReply() {
    this.replying = !this.replying
  }
  

  async modifayData() {
  //  await this.setDataService.setData()
  //  this.commentsArry = this.storageService.getFromLocalStorage('comments')
   this.currentUser = this.storageService.getFromLocalStorage('currentUser')
 }
}
