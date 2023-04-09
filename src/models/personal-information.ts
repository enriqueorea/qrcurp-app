export interface PersonalInformation {
  curp: string;
  primerApellido: string;
  segundoApellido: string;
  nombreCompleto: string;
  sexo: Sexo;
  fechaNacimiento: string | Date;
  entidadFederativa: EntidadFederativa;
  numeroEntidadFederativa: string;
}

export interface Sexo {
  value: 'h' | 'm';
  viewValue: 'HOMBRE' | 'MUJER';
}

export interface EntidadFederativa {
  id: number;
  nombre: string;
}
