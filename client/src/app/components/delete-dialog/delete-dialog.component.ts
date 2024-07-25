import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {setOffsetToUTC} from "ngx-bootstrap/chronos/units/offset";

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  className: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.className = (this.data.substring(26).split('/')[0]).charAt(0).toUpperCase() + this.data.substring(26).split('/')[0].slice(1).substring(0, this.data.substring(26).split('/')[0].length - 2);
  }

  onNoClick(): void {
    this.dialogRef.close("no");
  }

  onYesClick(): void {
    this.dialogRef.close();
  }
}
