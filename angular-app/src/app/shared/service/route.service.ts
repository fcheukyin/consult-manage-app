import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, map, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
    
    @Output() routeTitle: EventEmitter<any> = new EventEmitter();
    @Output() previousRoute: EventEmitter<any> = new EventEmitter();

    constructor() {}

    getTitle(router: Router) {
        router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => router)
            ).subscribe((event) => {
            this.routeTitle.emit(router.routerState.snapshot.root.firstChild.data.title);
        });
    }

    getPreviousRoute(router: Router) {
        router.events
        .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
        .subscribe((events: RoutesRecognized[]) => {
            let previousUrl = events[0].urlAfterRedirects
            this.previousRoute.emit(previousUrl);
        });
    }
}