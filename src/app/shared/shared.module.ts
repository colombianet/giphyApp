import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    SearchComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    SearchComponent
  ]
})
export class SharedModule { }
