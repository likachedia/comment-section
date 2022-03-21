import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SetDataService } from '../shared/setDataService.service';
import { StorageService } from '../shared/storageService.service';
import { Comment, Reply, User } from '../shared/utils';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  @Input() reply!: Reply | Comment
  // @Output() addComm: EventEmitter<Comment | Reply> = new EventEmitter()
   @Output() hidereply: EventEmitter<Boolean> = new EventEmitter()
  currentUser!: User
  comments: Comment[] = []
  imagePath = ''
  content = ''

  constructor(private setDataService: SetDataService) { }
  
  ngOnInit() {
    this.currentUser = this.setDataService.currentUser
    this.imagePath =`../../${this.currentUser?.image?.png}`
  }

  addReply(reply: Comment | Reply) {
    let newReply: Reply;

    if('replyingTo' in reply) {
      let id =  this.setDataService.commentsArray.filter((ele) => ele.user.username == reply.replyingTo)[0].replies?.length;
       newReply = {
        id: id! + 1,
        content: this.content,
        createdAt: this.getCreatedData(),
        score: 0,
        user: this.currentUser,
        replies: [],
        replyingTo: reply.replyingTo
      } 
     
    } else {
      newReply = {
        id: this.reply.replies!.length + 1,
        content: this.content,
        createdAt: this.getCreatedData(),
        score: 0,
        user: this.currentUser,
        replies: [],
        replyingTo: reply.user.username
      }
    }
    this.setDataService.addReply(newReply);
    this.hidereply.emit(true);
    this.content = ''
  }

  getCreatedData() {
    const dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate = year + " " + month + " " + day;
    return newdate.toString();
  }
 

  addComment() {
    console.log(this.reply)

    if(this.reply) {
      this.addReply(this.reply);
    } else {
      const newComment: Comment = {
        id: this.comments.length + 1,
        content: this.content,
        createdAt: this.getCreatedData(),
        score: 0,
        user: this.currentUser,
        replies: []
      }
      this.setDataService.addComment(newComment);
      this.content = ''
    }
  }

}
