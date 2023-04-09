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
  value: string;
  viewValue: string;
}

export interface EntidadFederativa {
  id: number;
  nombre: string;
}
