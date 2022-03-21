import { Component, Input, OnInit } from '@angular/core';
import { SetDataService } from '../shared/setDataService.service';
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
  updaiting = false

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

  updateReply(reply: Reply) {
    this.updaiting = !this.updaiting;
    this.setDataService.updateReply(reply);
  }

  increaseScore(reply: Reply) {
    this.reply.score++;
    console.log(this.reply.score)
    this.setDataService.changeScoreReply(reply, this.reply.score)
  }

  decreaseScore(reply: Reply) {
    this.reply.score--
    this.setDataService.changeScoreReply(reply, this.reply.score);
  }

  deleteComment(reply: Reply) {
    console.log('from delet func reply')
    this.setDataService.deleteReply(reply);
  }
  async modifayData() {
    this.comments = this.storageService.getFromLocalStorage('comments')
    this.currentUser = this.storageService.getFromLocalStorage('currentUser')
  }

}
