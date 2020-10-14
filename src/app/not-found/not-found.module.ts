import {NgModule} from '@angular/core';
import {NotFoundComponent} from './not-found.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [RouterModule.forChild([
    {path: '', component: NotFoundComponent}
  ])],
  exports: [NotFoundComponent]
})
export class NotFoundModule {
}
