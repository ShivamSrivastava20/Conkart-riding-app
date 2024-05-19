import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { GooglemapComponent } from '../googlemap/googlemap/googlemap.component';
@NgModule({
  declarations: [
    DashboardComponent,
    GooglemapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatCardModule
  ]
})
export class DashboardModule { }
