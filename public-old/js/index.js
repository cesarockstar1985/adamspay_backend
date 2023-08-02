$(function() {

    const salasSelect = $('#salasSelect')
    const loginForm   = $('#loginform')

    // Envia el formulario de login
    loginForm.submit(async function(e){
        e.preventDefault()
        
        const body = {
            nombre:   $('[name=nombre]').val(),
            password: $('[name=password]').val()
        }

        const response = await fetch( baseUrl + '/auth/login', postOptionsFunc( body ) )
        const result = await response.json()
        const { msg } = result

        if(msg)
           return alert(msg)

        const { nombre, sala } = body

        window.location = `chat.html?nombre=${ nombre }&sala=${ sala }`
    });

    const postOptionsFunc = ( body ) => {
        return {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        }
    }

    // Traer las salas para el select del index
    const renderizarsalasFetch = async () => {
        const response = await fetch( baseUrl + '/salas/getSalas' )
        const result   = await response.json()

        let html = ''
        
        $.each(result.salas, function(index, value){  
            const { id, nombre } = value
            html += `<option value="${ id }">${ nombre }</option>`
        })

        salasSelect.append(html)
    }

    renderizarsalasFetch()
})