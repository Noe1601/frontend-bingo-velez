import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PartidasService } from '../../services/partidas.service';

@Component({
  selector: 'app-assign-jugadas',
  templateUrl: './assign-jugadas.component.html',
  styleUrls: ['./assign-jugadas.component.scss']
})
export class AssignJugadasComponent implements OnInit {

  public assignForm: FormGroup;
  public canShowGenericInputPrice: boolean = false;
  public assignSamePriceForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _partidaService: PartidasService,
    private _fb: FormBuilder,
    private _modal: MatDialog) {

    this.assignForm = this._fb.group({
      cosita_price: ['', Validators.required],
      medio_price: ['', Validators.required],
      sumita_price: ['', Validators.required],
      letra_t_price: ['', Validators.required],
      bingo_regular_price: ['', Validators.required],
      bingo_4_esquinas_price: ['', Validators.required],
      bingo_4_esquinas_fecha_price: ['', Validators.required],
      letra_x_price: ['', Validators.required],
      letra_l_price: ['', Validators.required],
      carton_lleno: ['', Validators.required],
      media_c_price: ['', Validators.required],
      cometa_price: ['', Validators.required],
    });

    this.assignSamePriceForm = this._fb.group({
      price: ['', Validators.required]
    })

  }

  ngOnInit(): void { 
    this.getPartidaById(this.data.partida.id);
  }

  assignPricesPlaysToPartida(){

    const request = {
      partida_id: this.data.partida.id,
      ...this.assignForm.value
    };

    this._partidaService.createPartidaJugada(this.data.partida.id,request).subscribe(data => {
        this._modal.closeAll();
        Swal.fire('Asignando precios a partidas', 'Se asignaron los precios satisfactoriamente.', 'success')
    }, err => {
      console.log(err);
      Swal.fire('Asignando precios a partidas', 'Ocurrio un error.', 'error')
    })

  }


  getPartidaById(id: any){
    this._partidaService.getPartidaJugada(id).subscribe(data => {
      this.assignForm.patchValue({
      cosita_price: data.list.cosita_price,
      medio_price: data.list.medio_price,
      sumita_price: data.list.sumita_price,
      letra_t_price: data.list.letra_t_price,
      bingo_regular_price: data.list.bingo_regular_price,
      bingo_4_esquinas_price: data.list.bingo_4_esquinas_price,
      bingo_4_esquinas_fecha_price: data.list.bingo_4_esquinas_fecha_price,
      letra_x_price: data.list.letra_x_price,
      letra_l_price: data.list.letra_l_price,
      carton_lleno: data.list.carton_lleno,
      media_c_price: data.list.media_c_price,
      cometa_price: data.list.cometa_price,
      });
    });
  }

  changeSelection(){
    this.canShowGenericInputPrice = !this.canShowGenericInputPrice;
  }

  assignSamePrice(){
    const { price } = this.assignSamePriceForm.value;

    this.assignForm.patchValue({
      cosita_price: price,
      medio_price: price,
      sumita_price: price,
      letra_t_price: price,
      bingo_regular_price: price,
      bingo_4_esquinas_price: price,
      bingo_4_esquinas_fecha_price: price,
      letra_x_price: price,
      letra_l_price: price,
      carton_lleno: price,
      media_c_price: price,
      cometa_price: price,
      });
    
      this.changeSelection();
  }
}
