const boton = document.getElementById('boton')
const capital = document.getElementById('monto')
const numeroCuotas = document.getElementById('cuotas')
const ingresos = document.getElementById('ingresos')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const divSaludo = document.querySelector('#divSaludo')
const divPrestamo = document.querySelector('#divPrestamo')
const maximoCapital = 5000
const maximoCuotas = 12


function crearSaludo (user){
    const saludarTitulo = document.createElement('h2');
    saludarTitulo.innerText = `Hola ${user.nombre} ${user.apellido}, te otorgaremos un préstamo con las siguientes características:`;
    divSaludo.append(saludarTitulo)
}

function montoCuota(prestamo){
    let interes = 0
    const datos1 = {
        cuotasElegidas: numeroCuotas.value
    }
    if(datos1.cuotasElegidas<=6){
        interes = 2
    } else {
        interes = 5
    }
    let valorCuota = (prestamo/datos1.cuotasElegidas)*(1+(interes/100))
    return valorCuota
}

function calculadora(){
    const datos = {
        capital: capital.value,
        numeroCuotas: numeroCuotas.value,
        ingresos: ingresos.value
    }
    
    
    if (datos.capital<=maximoCapital && datos.numeroCuotas<=6 && (datos.ingresos>datos.capital || montoCuota(datos.capital)<datos.ingresos)){
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `Capital: ${datos.capital} Cuota mensual:${montoCuota(datos.capital)}`
        divPrestamo.append(prestamoParrafo)
    } else if(datos.capital<=maximoCapital && datos.numeroCuotas>6 && datos.numeroCuotas<=maximoCuotas && (datos.ingresos>datos.capital || montoCuota(datos.capital)<datos.ingresos)) {
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `Capital: ${datos.capital} Cuota mensual:${montoCuota(datos.capital)}`
        divPrestamo.append(prestamoParrafo)
    } else if(datos.capital<=maximoCapital && datos.numeroCuotas<=12 && montoCuota(datos.capital)>datos.ingresos){
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `No cumple con los requisitos crediticios para cumplir con la cuota mensual`
        divPrestamo.append(prestamoParrafo)
    } else {
        const prestamoParrafo = document.createElement('p')
        prestamoParrafo.innerText = `Requisitos: máximo de capital 5.000 USD y máximo de cuotas 12`
        divPrestamo.append(prestamoParrafo)
    }
}



boton.onclick = (e) => {
    e.preventDefault()
    
    // saludo a usuario
    const usuario = {
        nombre: nombre.value,
        apellido: apellido.value,
    }
    localStorage.setItem('usuarioStorage', JSON.stringify(usuario))
    crearSaludo(usuario)
    calculadora()

    // eliminar form
    boton.style.display = "none";
    capital.style.display = "none";
    numeroCuotas.style.display = "none";
    ingresos.style.display = "none";
    nombre.style.display = "none";
    apellido.style.display = "none";


}



