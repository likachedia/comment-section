import { Injectable, OnInit } from "@angular/core";
import { DataService } from "./dataService.service";
import { StorageService } from "./storageService.service";
import { Comment, Data, User } from "./utils";

@Injectable({
    providedIn: 'root'
})
export class SetDataService {

    constructor (private dataservice: DataService, private storageService: StorageService) {
        console.log("yrdy")
    }

    currentUser!: User
    commentsArray: Comment[] = []

    async setData() {
        const data: Data = await this.dataservice.getData()
        this.commentsArray = data.comments
        this.currentUser = data.currentUser
        console.log("User")
        console.log(this.currentUser)
        this.storageService.saveToLocalStorage('comments', this.commentsArray)
        this.storageService.saveToLocalStorage('currentUser', this.currentUser)
    }

    addComment(comment: Comment ) {
        this.commentsArray.push(comment)
        this.storageService.saveToLocalStorage('comments', this.commentsArray)
    }
    
}