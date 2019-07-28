import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';

@NgModule({
  // imports: [
  //   HttpClientModule
  // ]
})
export class ServicesModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      //下面这些有什么用?
      providers: [
        QuoteService,
        ProjectService
      ]
    }
  }
}
