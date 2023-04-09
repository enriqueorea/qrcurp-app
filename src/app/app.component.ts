import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { estadosMexico, sexo } from 'src/constants';
import { EntidadFederativa, Sexo } from 'src/models/personal-information';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  _snackBar = inject(MatSnackBar);

  savePersonalInformation() {
    console.log({
      ...this.personalInformationForm.value,
      fechaNacimiento: moment(
        this.personalInformationForm.value.fechaNacimiento
      ).format('DD/MM/YYYY'),
    });
  }

  async startQrCodeScanner() {
    try {
      await BarcodeScanner.prepare();
      await BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.treathQrCodeContent(result.content);
        this._snackBar.open('Se ha escaneado el código QR', 'Cerrar');
      }
      console.log(result);
    } catch (error) {
      console.error(error);
      await BarcodeScanner.showBackground();
      await BarcodeScanner.stopScan();
    }
  }

  ngOnInit() {}

  treathQrCodeContent(content: string) {
    const personalInformation = content
      .split('|')
      .filter((entry) => /\S/.test(entry));
    const [
      curp,
      primerApellido,
      segundoApellido,
      nombreCompleto,
      sexo,
      fechaNacimiento,
      nombreEntidad,
      numeroEntidad,
    ] = personalInformation;

    const sexoValue = this.sexos.find((s) => s.viewValue === sexo);

    this.personalInformationForm.patchValue({
      curp,
      primerApellido,
      segundoApellido,
      nombreCompleto,
      sexo: sexoValue,
      fechaNacimiento: moment(fechaNacimiento, 'DD/MM/YYYY').toDate(),
      entidadFederativa: this.entidades.find(
        (e) => e.nombre.toUpperCase() === nombreEntidad
      ),
      numeroEntidadFederativa: numeroEntidad,
    });
  }
}
