import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { estadosMexico, sexo } from 'src/constants';
import { EntidadFederativa, Sexo } from 'src/models/personal-information';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sexos = sexo;
  entidades = estadosMexico;
  title = 'qrcurp-app';

  personalInformationForm = new FormGroup({
    curp: new FormControl<string>(''),
    primerApellido: new FormControl<string>(''),
    segundoApellido: new FormControl<string>(''),
    nombreCompleto: new FormControl<string>(''),
    sexo: new FormControl<string | Sexo>(''),
    fechaNacimiento: new FormControl<string | Date>(''),
    entidadFederativa: new FormControl<string | EntidadFederativa>(''),
    numeroEntidadFederativa: new FormControl<string>(''),
  });

  savePersonalInformation() {
    console.log({
      ...this.personalInformationForm.value,
      fechaNacimiento: moment(
        this.personalInformationForm.value.fechaNacimiento
      ).format('DD/MM/YYYY'),
    });
  }

  async startQrCodeScanner() {
    BarcodeScanner.prepare();
    try {
      const result = await BarcodeScanner.startScan();
      console.log(result);
    } catch (error) {
      console.log(error);
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    }
  }

  ngOnInit() {}
}
