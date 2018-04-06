import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {APIService} from '../services/api.service';

@Component({
    selector: 'confirm-help',
    template: `
        <h1 mat-dialog-title class="text">Confirm</h1>

        <div mat-dialog-content class="text">
            <p>Your help request has been recieved; A member of our support staff is on their way.</p>
        </div>

        <div mat-dialog-actions class="items">
            <button mat-raised-button (click)="cancel()">Cancel</button>
            <button mat-raised-button (click)="confirmHelp()" cdkFocusInitial>Confirm</button>
        </div>
    `,
    styles [`
        .text {
            text-align: center;
            font-family: Roboto, "Helvetica Neue", sans-serif;
        }

        .items {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    `]
})

export class ConfirmHelpDialog {
    
    constructor(public dialogRef: MatDialogRef<ConfirmHelpDialog>, 
                @Inject(MAT_DIALOG_DATA) public data: any,
                public api: APIService) {}

    public confirmHelp() {
        this.api.help("confirm").subscribe(success => {
            if (success)
                this.dialogRef.close();
            else
                console.error("failed to confirm help request");
        });
    }

    public cancel() {
        this.api.help("cancel").subscribe(success => {
            if (success)
                this.dialogRef.close();
            else
                console.error("failed to cancel help request");
        });
    }
}
