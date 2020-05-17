import { Injectable, HostListener } from '@angular/core';

export const SM_WIDTH = 599;
export const MD_WIDTH = 768;
export const LG_WIDTH = 992;

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor() { }

  checkScreensize() {
    if (window.innerWidth <= SM_WIDTH) {
      return "sm";
    }
    if (window.innerWidth <= MD_WIDTH) {
      return "md";
    }
    
    return "lg";
  }

  datepickerTouchUi() {
    if (this.checkScreensize() == 'sm') {
      return true;
    }
    return false;
  }
}