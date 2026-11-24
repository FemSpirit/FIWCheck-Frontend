import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import type { DialogData } from '../registrierung';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatButtonModule,
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
   data: DialogData = inject(MAT_DIALOG_DATA);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<ConfirmComponent>);

  goToLogin() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}