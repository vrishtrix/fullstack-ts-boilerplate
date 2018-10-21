import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
