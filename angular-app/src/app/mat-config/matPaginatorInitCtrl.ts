import {MatPaginatorIntl} from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class MatPaginatorIntlCtrl extends MatPaginatorIntl {
    itemsPerPageLabel = '表示件数:'; 
    previousPageLabel = '前へ';
    nextPageLabel = '次へ';
    lastPageLabel = '最後へ';
    firstPageLabel = '最初へ';
  
    getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 od ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' / ' + length;
    };
  }