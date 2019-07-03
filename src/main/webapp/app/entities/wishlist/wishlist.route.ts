import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Wishlist } from 'app/shared/model/wishlist.model';
import { WishlistService } from './wishlist.service';
import { WishlistComponent } from './wishlist.component';
import { WishlistDetailComponent } from './wishlist-detail.component';
import { WishlistUpdateComponent } from './wishlist-update.component';
import { WishlistDeletePopupComponent } from './wishlist-delete-dialog.component';
import { IWishlist } from 'app/shared/model/wishlist.model';

@Injectable({ providedIn: 'root' })
export class WishlistResolve implements Resolve<IWishlist> {
  constructor(private service: WishlistService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWishlist> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Wishlist>) => response.ok),
        map((wishlist: HttpResponse<Wishlist>) => wishlist.body)
      );
    }
    return of(new Wishlist());
  }
}

export const wishlistRoute: Routes = [
  {
    path: '',
    component: WishlistComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'myfirstappApp.wishlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WishlistDetailComponent,
    resolve: {
      wishlist: WishlistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'myfirstappApp.wishlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WishlistUpdateComponent,
    resolve: {
      wishlist: WishlistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'myfirstappApp.wishlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WishlistUpdateComponent,
    resolve: {
      wishlist: WishlistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'myfirstappApp.wishlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const wishlistPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: WishlistDeletePopupComponent,
    resolve: {
      wishlist: WishlistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'myfirstappApp.wishlist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
