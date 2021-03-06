import { Injectable } from "@angular/core";
import { APIService } from "./api.service";
import { MatDialog } from "@angular/material";
import { ErrorModalComponent } from "app/modals/errormodal/errormodal.component";
import { ErrorMessage } from "app/objects/objects";
import { Event, BasicRoomInfo, BasicDeviceInfo } from "./socket.service";


export const PowerOn = "power-on";
export const PowerOff = "power-off";
export const SwitchInput = "set-input";
export const SetVolume = "set-volume";
export const SetMute = "set-mute";
export const BlankDisplay = "set-blank";
export const Share = "start-sharing";
export const Unshare = "stop-sharing";
export const Mirror = "mirror-fail";

@Injectable()
export class ErrorService {
  errorAlreadyShowing = false;

  private _errorMessages: Map<string, ErrorMessage>;

  constructor(private api: APIService, private dialog: MatDialog) {
    this.api.getErrorMessageConfig().subscribe((answer) => {
      this._errorMessages = answer as Map<string, ErrorMessage>;
      console.log("error messages", this._errorMessages);
    })
  }

  public show = (cmdType: string, errDetails: any) => {
    if (!this.errorAlreadyShowing) {
      // send shown error
      this._sendErrEvent(true, cmdType, errDetails);
      this.errorAlreadyShowing = true;
      this.dialog.open(ErrorModalComponent, {
        data: {
          headerMessage: this._errorMessages[cmdType].title,
          bodyMessage: this._errorMessages[cmdType].body,
          errorMessage: errDetails
        }}).afterClosed().subscribe(() => {
          this.errorAlreadyShowing = false;
        });
    } else {
      // send hidden error
      this._sendErrEvent(false, cmdType, errDetails);
    }
  }

  private _sendErrEvent(shown: boolean, cmdType: string, errDetails: any) {
    const event = new Event();

    event.EventTags = ["ui-event", "blueberry-ui"];

    event.AffectedRoom = new BasicRoomInfo(
      APIService.building + "-" + APIService.roomName
    );
    event.TargetDevice = new BasicDeviceInfo(APIService.piHostname);
    event.GeneratingSystem = APIService.piHostname;
    event.Timestamp = new Date();
    event.User = "";
    event.Data = errDetails;

    if (shown) {
      event.Key = "user-sys-err-shown";
    } else {
      event.Key = "user-sys-err-hidden";
    }
    event.Value = cmdType;

    this.api.sendEvent(event);
  }
}
