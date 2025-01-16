import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsStatsService {

  constructor() { }

  
  getCardsTotalStats(){
    return [
      {name : 'Lecturas OK', value : 1234, icon : 'lecturas_ok.svg'},
      {name : 'Alertas medias', value : 196, icon : 'aler_med.svg'},
      {name : 'Alertas rojas', value : 12, icon : 'aler_rojas.svg'},
      {name : 'Sensores deshabilitados', value : 4, icon : 'sens_desh.svg'}
    ]
  }


  getCardStats() {
    return [
      { name: 'Temperatura', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'temperatura.svg' },
      { name: 'Presión', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'presion.svg' },
      { name: 'Viento', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'viento.svg' },
      { name: 'Niveles', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'niveles.svg' },
      { name: 'Energia', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'energia.svg' },
      { name: 'Tensión', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'tension.svg' },
      { name: 'Monóxido de carbono', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'monoxido.svg' },
      { name: 'Otros gases', value_ok: 100, value_avg : 20, value_warn : 3, icon: 'otros.svg' },
    ];
  }



}
