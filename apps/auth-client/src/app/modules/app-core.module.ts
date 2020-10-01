import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { NgxsModule } from '@ngxs/store';

import { environment } from '../../environments/environment';

import { NotFoundComponent } from '../not-found/not-found.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule,
        NgxsModule.forRoot([], { developmentMode: !environment.production })
    ],
    declarations: [
        NotFoundComponent,
        UsersListComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [MatButtonModule]
})
export class AppCoreModule {}