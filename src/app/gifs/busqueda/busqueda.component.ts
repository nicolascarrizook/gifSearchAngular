import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})

export class BusquedaComponent {

  //Take the input value and pass it to the parent component
  
  @ViewChild('txtbuscar') txtbuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) {

  }

    buscar() {
      const valor = this.txtbuscar.nativeElement;
      this.gifsService.buscarGifs(valor.value);
      this.txtbuscar.nativeElement.value = '';
    }
}
