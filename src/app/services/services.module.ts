import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.service';
// import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  // imports: [
  //   HttpClientModule
  // ]
})
export class ServicesModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService
      ]
    }
  }
}
