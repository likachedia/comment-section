import { Component, Input, OnInit } from '@angular/core';
import { SetDataService } from '../shared/currentUser.service';
import { StorageService } from '../shared/storageService.service';
import { Comment, User } from '../shared/utils';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  currentUser!: User
  comments: Comment[] = []
  imagePath = ''
  content = ''

  constructor(private setDataService: SetDataService, private storageService: StorageService,) { }
  
  ngOnInit() {
    this.modifayData()
    // await this.setDataService.setData();
    // this.comments = this.setDataService.commentsArray
    // this.currentUser = this.setDataService.currentUser
    this.imagePath =`../../${this.currentUser?.image?.png}`
  }

  addComment() {
    const newComment: Comment = {
      id: this.comments.length + 1,
      content: this.content,
      createdAt: "something",
      score: 0,
      user: this.currentUser,
      replies: []
    }
    this.setDataService.addComment(newComment);
    this.content = ''
  }

  async modifayData() {
    // await this.setDataService.setData()
    this.comments = this.storageService.getFromLocalStorage('comments')
    this.currentUser = this.storageService.getFromLocalStorage('currentUser')
  }
}
