export class Reservacion {
    _id?: number;
    fecha_ingreso: Date;
    fecha_termino: Date;
    hora_llegada: Number;
    hora_salida: Number;
    huespedes: Number;

    constructor(fecha_ingreso: Date, fecha_termino: Date, hora_llegada: Number, hora_salida: Number, huespedes: Number) {
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_termino = fecha_termino;
        this.hora_llegada = hora_llegada;
        this.hora_salida = hora_salida;
        this.huespedes = huespedes;
    }
}