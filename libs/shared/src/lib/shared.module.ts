import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsNextModule,
  ],
  exports: [
    ClarityModule,
    CommonModule,
    ClrFormsNextModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
