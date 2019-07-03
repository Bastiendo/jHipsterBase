import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWishlist } from 'app/shared/model/wishlist.model';

type EntityResponseType = HttpResponse<IWishlist>;
type EntityArrayResponseType = HttpResponse<IWishlist[]>;

@Injectable({ providedIn: 'root' })
export class WishlistService {
  public resourceUrl = SERVER_API_URL + 'api/wishlists';

  constructor(protected http: HttpClient) {}

  create(wishlist: IWishlist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wishlist);
    return this.http
      .post<IWishlist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(wishlist: IWishlist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wishlist);
    return this.http
      .put<IWishlist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWishlist>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWishlist[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(wishlist: IWishlist): IWishlist {
    const copy: IWishlist = Object.assign({}, wishlist, {
      date: wishlist.date != null && wishlist.date.isValid() ? wishlist.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((wishlist: IWishlist) => {
        wishlist.date = wishlist.date != null ? moment(wishlist.date) : null;
      });
    }
    return res;
  }
}
