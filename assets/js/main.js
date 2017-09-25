'use strict';
let imput_nombre = $(`#nombre`);
let imput_apellido = $(`#apellido`);
let imput_dni = $(`#dni`);
let imputAsiento = $(`#asiento`);
let btn_enviar = $(`#btn_enviar`);
let btn_reservar = $(`#btn_reservar`);
let btn_liberar = $(`#btn_liberar`);
let btn_buscar = $(`#btn_buscar`);
let btn_principal = $(`#btn_principal`);
let btn_principalListar = $(`#btn_principalListar`);

class App_pasajeros
{
    constructor()
    {
        this.opcion = $(`#opcion`);
        this.selecAsientos = $(`#div_Asientos`);
        this.secMenu = $(`#div_menu`);
        this.secAsientosInfo = $(`#secAsientosInfo`);
        this.secListar = $(`#secListar`);

    }
    opciones()
    {
        if(this.opcion.val() == 1)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.removeClass(`oculto`);
            this.selecAsientos.removeClass(`oculto`);
            imput_dni.removeAttr(`disabled`);
            imput_nombre.removeAttr(`disabled`);
            imput_apellido.removeAttr(`disabled`);
            btn_reservar.removeClass(`oculto`);
            btn_liberar.addClass(`oculto`);
            btn_buscar.addClass(`oculto`);
        }
        else if(this.opcion.val() == 2)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.removeClass(`oculto`);
            this.selecAsientos.removeClass(`oculto`);
            imput_dni.attr(`disabled`, true);
            imput_nombre.attr(`disabled`, true);
            imput_apellido.attr(`disabled`, true);
            btn_reservar.addClass(`oculto`);
            btn_liberar.removeClass(`oculto`);
            btn_buscar.addClass(`oculto`);
        }
        else if(this.opcion.val() == 3)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.removeClass(`oculto`);
            this.selecAsientos.addClass(`oculto`);
            imput_dni.removeAttr(`disabled`);
            imput_dni.focus();
            imput_nombre.attr(`disabled`, true);
            imput_apellido.attr(`disabled`, true);
            btn_reservar.addClass(`oculto`);
            btn_liberar.addClass(`oculto`);
            btn_buscar.removeClass(`oculto`);
        }
        else if(this.opcion.val() == 4)
        {
            this.secMenu.addClass(`oculto`);
            this.secAsientosInfo.addClass(`oculto`);
            this.secListar.removeClass(`oculto`);
            vuelo.listar();
        }
        else
        {
            alert(`Opcion incorrecta. Vuelva a ingresar`);
            this.enfocar();
        }
    }
}

class Pasajero
{
    constructor(nombre, apellido, dni, asiento)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.asiento = asiento;
    }
    mostrar()
    {
        if(this.nombre != undefined)
        {
            imput_nombre.val(this.nombre);
            imput_apellido.val(this.apellido);
            imput_dni.val(this.dni);
            imputAsiento.val(this.asiento);
        }
        else
        {
            this.limpiarTodo(false);
        }
    }
    limpiarTodo(todo)
    {
        imput_nombre.val(``);
        imput_apellido.val(``);
        imput_dni.val(``);
        if(todo)
        {
            imputAsiento.val(``);
        }
    }
}

class Cpasajeros
{
    constructor()
    {
        this.contenedorListar = $(`#contenedorListar`);
        this.tablero = $(`#tablero`);
        this.pasajeros = [];
        this.numAsiento = 0;
        this.crearCeldas(10);
        this.celdas = $(`td`);
        for(let i = 0; i < this.celdas.length; i++)
        {
            this.pasajeros[i] = new Pasajero(undefined, undefined, undefined, undefined);
        }
    }
    redireccionar(event)
    {
        this.numAsiento = (event.target.textContent);
        imputAsiento.val(this.numAsiento);
        this.pasajeros[this.numAsiento - 1].mostrar();
        imput_dni.focus();
    }
    reservar()
    {
        if(imputAsiento.val() != `` && imput_nombre.val() != `` && imput_apellido.val() != `` && imput_dni.val() != ``)
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(imput_nombre.val(), imput_apellido.val(), imput_dni.val(), this.numAsiento);
            this.pasajeros[0].limpiarTodo(true);
            for(let i in this.celdas)
            {
                if(this.celdas[i].textContent == this.numAsiento)
                {
                    this.celdas[i].classList.add(`pintar`);
                    break;
                }
            }
        }
        else
        {
            alert(`Faltan datos`);
            imput_nombre.focus();
        }
    }
    liberar()
    {
        if(this.pasajeros[this.numAsiento - 1].nombre != undefined)
        {
            this.pasajeros[this.numAsiento - 1] = new Pasajero(undefined, undefined, undefined, undefined);
            this.pasajeros[0].limpiarTodo(true);
        }
        for(let i in this.celdas)
        {
            if(this.celdas[i].textContent == this.numAsiento)
            {
                this.celdas[i].classList.remove(`pintar`);
                break;
            }
        }
    }
    buscar()
    {
        for(let i in this.pasajeros)
        {
            if(imput_dni.val() == this.pasajeros[i].dni)
            {
                this.pasajeros[i].mostrar();
                break;
            }
            else
            {
                if(i == this.pasajeros.length - 1)
                {
                    this.pasajeros[0].limpiarTodo(true);
                    alert(`No se encontro el DNI`);
                }
            }
        }
        imput_dni.focus();
    }
    listar()
    {
        let contenedor = ``;
        for(let i in this.pasajeros)
        {
            if(this.pasajeros[i].nombre != undefined)
            {
                contenedor += `<h4><b>Nombre:</b> ${this.pasajeros[i].nombre}</h4>`;
                contenedor += `<h4><b>Apellido:</b> ${this.pasajeros[i].apellido}</h4>`;
                contenedor += `<h4><b>DNI:</b> ${this.pasajeros[i].dni}</h4>`;
                contenedor += `<h4><b>Asiento:</b> ${this.pasajeros[i].asiento}</h4></br>`;
            }
        }
        this.contenedorListar.html(contenedor);
    }
    crearCeldas(total)
    {
        let numFilas = total/5;
        let numColum = total/2;
        this.tablero.empty();
        for(let i = 0; i < numFilas; i++)
        {
            let fila = $(`<tr>`);
            for(let j = 0; j < numColum; j++)
            {
                let columna = $(`<td>`);
                columna.id = `${i}${j}`;
                columna.text(i * numColum + j + 1);
                columna.addClass(`btn`);
                columna.addClass(`btn-default`);
                columna.click((event) => this.redireccionar(event));
                fila.append(columna);
            }
            this.tablero.append(fila);
        }
    }
}

let vuelo = new   Cpasajeros();
let apli = new App_pasajeros();

btn_enviar.click(function(e)
{
    e.preventDefault();
    apli.opciones();
});

btn_reservar.click(function(e)
{
    e.preventDefault();
    vuelo.reservar();
    setTimeout(function()
    {
        apli.secMenu.removeClass(`oculto`);
        apli.secAsientosInfo.addClass(`oculto`);
    }, 500);
});

btn_buscar.click(function(e)
{
    e.preventDefault();
    vuelo.buscar();
});

btn_principal.click(function(e)
{
    e.preventDefault();
    apli.secMenu.removeClass(`oculto`);
    apli.secAsientosInfo.addClass(`oculto`);
    apli.enfocar();
});

btn_principalListar.click(function(e)
{
    btn_principal.click();
    apli.secListar.addClass(`oculto`);
});
