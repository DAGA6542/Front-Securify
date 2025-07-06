import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-producto-listar-component',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon,
    CommonModule,
    MatCardModule

  ],
  templateUrl: './producto-listar-component.html',
  styleUrl: './producto-listar-component.css'
})
export class ProductoListarComponent {
  productos = [
    {
      nombre: 'Abrigo 01',
      precio: 100,
      imagenUrl: 'assets/abrigo.png'
    },
    {
      nombre: 'Playera 02',
      precio: 90,
      imagenUrl: 'assets/playera.webp'
    },
    {
      nombre: 'Saco 03',
      precio: 200,
      imagenUrl: 'assets/saco.jpg'
    },

    {
      nombre: 'Polo 04',
      precio: 45,
      imagenUrl: 'assets/polo.webp'
    },

    {
      nombre: 'Vestido 05',
      precio: 70,
      imagenUrl: 'assets/vestido.jpg'
    },

    {
      nombre: 'Vestido 06',
      precio: 60,
      imagenUrl: 'assets/vestidito.jpg'
    },

  ];

  agregarAlCarrito(producto: any) {
    console.log('Agregado al carrito:', producto);
    // Aquí puedes integrar con tu servicio de carrito
  }
}
