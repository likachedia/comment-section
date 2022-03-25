import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from './shared/model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Comment[], ...args: unknown[]) {
    return value.sort((a,b) => b.score - a.score);
  }

}
