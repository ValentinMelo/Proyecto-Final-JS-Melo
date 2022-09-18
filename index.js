let boton = document.getElementById('boton')

boton.onclick = (e)=>{
    let capital = document.getElementById('monto').value
    let numeroCuotas = document.getElementById('cuotas').value
    let ingresos = document.getElementById('ingresos').value
    let maximoCapital = 5000
    let maximoCuotas = 12
    e.preventDefault()

    function montoCuota(prestamo){
        let interes = 0
        if(numeroCuotas<=6){
            interes = 2
        } else {
            interes = 5
        }
        let valorCuota = (prestamo/numeroCuotas)*(1+(interes/100))
        return valorCuota
    }

    
    let prestamoPedido = [capital, montoCuota(capital)]
    let cobrable = 0

    if (capital<=maximoCapital && numeroCuotas<=6 && (ingresos>capital || montoCuota(capital)<ingresos)){
        for(let i=1;i<=numeroCuotas;i++){
                console.log('Cuota ',i,': ',montoCuota(capital))
                cobrable = 1
        }
    } else if(capital<=maximoCapital && numeroCuotas>6 && numeroCuotas<=maximoCuotas && (ingresos>capital || montoCuota(capital)<ingresos)) {
        for(let i=1;i<=numeroCuotas;i++){
            console.log('Cuota ',i,': ',montoCuota(capital))
            cobrable = 1
    }
    } else if(capital<=maximoCapital && numeroCuotas<=12 && montoCuota(capital)>ingresos){
        alert ('No cumple con los requisitos crediticios para cumplir con la cuota mensual')
    } else {
        alert ('Requisitos: máximo de capital 5.000 USD y máximo de cuotas 12')
    }



    while(cobrable===1){
        let decision = parseInt(prompt(`Te hemos otorgado el siguiente préstamo: capital total de ${prestamoPedido[0]} y cuotas mensuales fijas de ${prestamoPedido[1]}. Deseas obtener otro préstamo? 1.Si 2.No`))   
        if (decision===1 && ingresos>capital){      
            let montoRestante = (maximoCapital - capital)
            alert(`Te otorgaremos un último préstamo de ${montoRestante} y con una cuota mensual de ${montoCuota(montoRestante)}`)
            prestamoPedido.push(montoRestante, montoCuota(montoRestante))
            alert(`Tus préstamos aprobados son los siguientes: Préstamo 1 (Capital: ${prestamoPedido[0]} y cuota: ${prestamoPedido[1]}) y Préstamo 2 (Capital: ${prestamoPedido[2]} y cuota: ${prestamoPedido[3]})`)
        } else if (decision===1 && ingresos>montoCuota(capital)){      
            let montoRestante2 = ((ingresos - montoCuota(capital))*0.5)
            alert(`Te otorgaremos un último préstamo de ${montoRestante2} y con una cuota mensual de ${montoCuota(montoRestante2)}`)
            prestamoPedido.push(montoRestante2, montoCuota(montoRestante2))
            alert(`Tus préstamos aprobados son los siguientes: Préstamo 1 (Capital: ${prestamoPedido[0]} y cuota: ${prestamoPedido[1]}) y Préstamo 2 (Capital: ${prestamoPedido[2]} y cuota: ${prestamoPedido[3]})`)
        } else if(decision!==1){       
            alert('Muchas gracias por pedir su préstamo con nosotros!')
        }
        break
    }


    const totalCuotas = [prestamoPedido[1], prestamoPedido[3]]
    totalCuotas.forEach( (datos)=> {
    const parrafo = document.createElement ('p')
    parrafo.innerText = `Cuota prestamo: ${datos}`
    parrafo.className = 'cuota-prestamo'
    document.body.appendChild(parrafo)
    const boton = document.createElement('button')
    boton.innerText = 'Elegir cuenta bancaria desde la cual se debitarán los fondos'
    document.body.appendChild(boton)
    })
    
    

}