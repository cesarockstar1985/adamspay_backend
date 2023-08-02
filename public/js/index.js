$(function() {

    const loginForm   = $('#loginform')

    console.log(loginForm.parent())

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

        // window.location = `chat.html?nombre=${ nombre }&sala=${ sala }`
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
})