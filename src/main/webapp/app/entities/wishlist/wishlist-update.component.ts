import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IWishlist, Wishlist } from 'app/shared/model/wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'jhi-wishlist-update',
  templateUrl: './wishlist-update.component.html'
})
export class WishlistUpdateComponent implements OnInit {
  isSaving: boolean;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    date: []
  });

  constructor(protected wishlistService: WishlistService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ wishlist }) => {
      this.updateForm(wishlist);
    });
  }

  updateForm(wishlist: IWishlist) {
    this.editForm.patchValue({
      id: wishlist.id,
      name: wishlist.name,
      date: wishlist.date
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const wishlist = this.createFromForm();
    if (wishlist.id !== undefined) {
      this.subscribeToSaveResponse(this.wishlistService.update(wishlist));
    } else {
      this.subscribeToSaveResponse(this.wishlistService.create(wishlist));
    }
  }

  private createFromForm(): IWishlist {
    return {
      ...new Wishlist(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      date: this.editForm.get(['date']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWishlist>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
