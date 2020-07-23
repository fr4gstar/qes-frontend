import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LobbyComponent } from "./lobby/lobby.component";
import { GameboxComponent } from "./gamebox/gamebox.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StartDialogComponent } from './start-dialog/start-dialog.component';

const config: SocketIoConfig = {
  url: "http://qes-backend.herokuapp.com/",
  options: {},
};

@NgModule({
  declarations: [AppComponent, LobbyComponent, GameboxComponent, StartDialogComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatGridListModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule
  ],entryComponents: [
    StartDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
