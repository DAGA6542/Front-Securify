import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListItem, MatListModule, MatNavList} from '@angular/material/list';
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from '@angular/material/expansion';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home   {
  title = 'Securify';
  role: string = '';
  loggedIn: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;
}
