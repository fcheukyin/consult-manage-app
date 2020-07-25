import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('HomePage <=> Page', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: '50px',
                left: 0,
                width: '100%'
              })
        ]),query(':enter', [
            style({ top: '140%', opacity: 0})
          ]),
          query(':leave', animateChild()),
          group([
            query(':leave', [
              animate('250ms ease-out', style({ top: '50px', opacity: 0}))
            ]),
            query(':enter', [
              animate('300ms ease-out', style({top: '50px', opacity: 1}))
            ])
          ]),
          query(':enter', animateChild()),
        ]),
        transition('* <=> FilterPage', [
          style({ position: 'relative' }),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%'
            })
          ]),
          query(':enter', [
            style({ left: '-100%'})
          ]),
          query(':leave', animateChild()),
          group([
            query(':leave', [
              animate('200ms ease-out', style({ left: '100%'}))
            ]),
            query(':enter', [
              animate('300ms ease-out', style({ left: '0%'}))
            ])
          ]),
          query(':enter', animateChild()),
        ])])