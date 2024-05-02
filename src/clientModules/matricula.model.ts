export class Matricula {
  matr_alu_dni?: string;
  matr_assig_codi?: string;
  matr_convocatoria?: number;
  matr_nota?: number;

  constructor(matr_alu_dni: string, matr_assig_codi: string, matr_convocatoria: number, matr_nota: number) {
    this.matr_alu_dni = matr_alu_dni;
    this.matr_assig_codi = matr_assig_codi;
    this.matr_convocatoria = matr_convocatoria;
    this.matr_nota = matr_nota;
  }
}

