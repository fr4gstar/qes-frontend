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
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { StartDialogComponent } from "./start-dialog/start-dialog.component";
import { SafeHtmlPipe } from "./SafeHtmlPipe";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ResponsiveService } from "src/app/services/responsive-service.service";
import { GalleryModule } from "@ngx-gallery/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";

const config: SocketIoConfig = {
  url: "https://qes-backend.herokuapp.com/",
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    GameboxComponent,
    StartDialogComponent,
    SafeHtmlPipe,
  ],
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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatProgressBarModule,
    GalleryModule,
    MatSnackBarModule
  ],
  entryComponents: [StartDialogComponent],
  providers: [ResponsiveService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
