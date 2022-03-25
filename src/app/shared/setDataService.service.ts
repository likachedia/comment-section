import { Injectable, OnInit } from '@angular/core';
import { DataService } from './dataService.service';
import { StorageService } from './storageService.service';
import { Comment, Data, Reply, User } from './model';

@Injectable({
  providedIn: 'root',
})
export class SetDataService {
  currentUser!: User;
  commentsArray: Comment[] = [];
  replying = false;

  constructor(
    private dataservice: DataService,
    private storageService: StorageService
  ) {}

  async setData() {
    const data: Data = await this.dataservice.getData();
    this.commentsArray = this.storageService.getFromLocalStorage('comments')
      ? this.storageService.getFromLocalStorage('comments')!
      : [];
    if (!this.commentsArray || this.commentsArray.length == 0) {
      this.commentsArray = data.comments;
    }
    this.currentUser = data.currentUser;
    this.storageService.saveToLocalStorage('comments', this.commentsArray);
    this.storageService.saveToLocalStorage('currentUser', this.currentUser);
  }

  addComment(comment: Comment) {
    this.commentsArray.push(comment);
    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }

  addReply(reply: Reply) {
    let username = reply.replyingTo;
    this.commentsArray = this.commentsArray.map((ele) => {
      if (ele.user.username == username) {
        ele.replies?.push(reply);
        return ele;
      }
      return ele;
    });

    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }

  deleteComment(id: number) {
    this.commentsArray = this.commentsArray.filter((ele) => ele.id !== id);
    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }

  updateComment(upDatedComment: Comment) {
    this.commentsArray = this.commentsArray.map((comment) => {
      if (comment.id == upDatedComment.id) {
        comment.content = upDatedComment.content;
        return comment;
      }
      return comment;
    });

    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }

  updateReply(updatedReply: Reply) {
    this.commentsArray = this.changeObj(
      this.commentsArray,
      updatedReply,
      'content',
      updatedReply.content
    );

    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }

  deleteReply(reply: Reply) {
    let username = reply.replyingTo;
    let replyId = reply.id;
    this.commentsArray = this.commentsArray.map((ele) => {
      if (ele.user.username == username) {
        ele.replies = ele.replies?.filter((reply) => reply.id !== replyId);
        return ele;
      }
      return ele;
    });
    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }
  changeScore(id: number, score: number) {
    this.commentsArray = this.commentsArray.map((ele) => {
      if (ele.id == id) {
        ele.score = score;
        return ele;
      }
      return ele;
    });
    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }

  changeScoreReply(reply: Reply, score: number) {
    this.commentsArray = this.changeObj(
      this.commentsArray,
      reply,
      'score',
      reply.score
    );
    this.storageService.saveToLocalStorage('comments', this.commentsArray);
  }

  changeObj<T extends keyof Reply>(
    data: Comment[],
    upData: Reply,
    propertyName: T,
    newData: Reply[T]
  ) {
    return data.map((ele: Comment) => {
      if (ele.user.username == upData.replyingTo) {
        ele.replies = ele.replies?.map((reply) => {
          if (reply.id == upData.id) {
            reply[propertyName] = newData;
            return reply;
          }
          return reply;
        });
        return ele;
      }
      return ele;
    });
  }
}
