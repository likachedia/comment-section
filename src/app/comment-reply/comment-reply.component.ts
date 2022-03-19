import { Component, Input, OnInit } from '@angular/core';
import { SetDataService } from '../shared/currentUser.service';
import { StorageService } from '../shared/storageService.service';
import { Reply, User, Comment } from '../shared/utils';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss']
})
export class CommentReplyComponent implements OnInit {
  @Input() reply!: Reply
  currentUser!: User
  comments: Comment[] = []
  isCurrentUser = false
  replying = false
  imagePath = ""

  constructor(private setDataService: SetDataService, private storageService: StorageService,) { }

  ngOnInit(): void {
    this.modifayData()
    // this.comments = this.setDataService.commentsArray
    // this.currentUser = this.setDataService.currentUser
    this.imagePath = `../${this.reply?.user?.image?.png}`
    this.isCurrentUser = this.reply.user.username == this.currentUser.username
  }

  

  displyReply() {
    this.replying = !this.replying
  }

  async modifayData() {
    // await this.setDataService.setData()
    this.comments = this.storageService.getFromLocalStorage('comments')
    this.currentUser = this.storageService.getFromLocalStorage('currentUser')
  }

}
