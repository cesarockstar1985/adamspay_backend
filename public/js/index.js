$(function() {

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

    const changeLoginText = ( toggler ) => {
        toggler.attr('data-bs-toggle', '')
        toggler.find('.togglerText').text('Logout')
        toggler.attr('data-authenticated', 'true')
    }

    const loginForm = $('#loginform')
    const navbarToggler = $('#navToggler')
    const authUser = localStorage.getItem('all_users')

    if(authUser){
        changeLoginText(navbarToggler)
    }

    if(navbarToggler.attr('data-authenticated') == 'true'){
        navbarToggler.on('click', async function(){
            localStorage.removeItem('all_users')
            navbarToggler.attr('data-bs-toggle', 'collapse')
            navbarToggler.attr('data-authenticated', 'false')
            navbarToggler.find('.togglerText').text('Login')
            loginForm.show() 
        })
    }

    // Envia el formulario de login
    loginForm.submit(async function(e){
        e.preventDefault()

        const body = {
            nombre:   $('[name=nombre]').val(),
            password: $('[name=password]').val()
        }

        const response = await fetch( baseUrl + '/auth/login', postOptionsFunc( body ) )
        const result = await response.json()
        const { msg, usuario = [] } = result
        const { id, nombre, email } = usuario

        if(msg)
           return alert(msg)

        localStorage.setItem('all_users', JSON.stringify({ id, nombre, email }))

        loginForm.hide()
        $('[data-bs-target="#navbarHeader"]').click()

        changeLoginText(navbarToggler)
    });

    $('.btn-comprar').on('click', async function(){
        const authenticated = localStorage.getItem('all_users')
        
        if(!authenticated){
            let expanded = $('#navToggler').attr('aria-expanded')
            if(expanded == 'false'){
                $('[data-bs-target="#navbarHeader"]').click()
            }
            window.scrollTo(0, 0);
            return;
        }

        const { email, id } = JSON.parse(authenticated);
        const body = {
            productoId: $(this).attr('data-product-id'),
            name: $(this).attr('data-product-name'),
            label: $(this).attr('data-product-label'),
            value: $(this).attr('data-product-price'),
            userId: id,
            email
        }

        const response = await fetch( baseUrl + '/pedidos/checkout', postOptionsFunc( body ) )
        const { debt } = await response.json()
        const { payUrl } = debt

        localStorage.setItem('pedido', JSON.stringify(debt))

        window.location = payUrl
    })
})