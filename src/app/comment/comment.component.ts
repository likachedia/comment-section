import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SetDataService } from '../shared/setDataService.service';
import { StorageService } from '../shared/storageService.service';
import { Comment, Reply, User } from '../shared/utils';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment
  @Output() delete: EventEmitter<number> = new EventEmitter()
  imagePath = ""
  currentUser!: User
  replying = false;
  isCurrentUser = false;
  updaiting = false

  constructor(private setDataService: SetDataService, private storageService: StorageService,) { }

  ngOnInit(): void {
    this.modifayData()
    // this.currentUser = this.setDataService.currentUser
    this.imagePath = `../${this.comment?.user?.image?.png}`
    this.isCurrentUser = this.comment.user.username == this.currentUser.username
  }

  displyReply() {
    this.replying = !this.replying;
  }
  
  updateComment(comment: Comment) {
    this.updaiting = !this.updaiting;
    this.setDataService.updateComment(comment);
  }

  deleteComment(id: number) {
    // this.delete.emit(id);
    console.log('from delet func')
    this.setDataService.deleteComment(id);
    console.log(this.setDataService.commentsArray)
  }

  increaseScore(id: number) {
    this.comment.score++;
    console.log(this.comment.score)
    this.setDataService.changeScore(id, this.comment.score)
  }

  decreaseScore(id: number) {
    this.comment.score--
    this.setDataService.changeScore(id, this.comment.score);
  }

  async modifayData() {
  //  await this.setDataService.setData()
  //  this.commentsArry = this.storageService.getFromLocalStorage('comments')
   this.currentUser = this.setDataService.currentUser
 }
}
