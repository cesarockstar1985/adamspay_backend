var params = new URLSearchParams(window.location.search);

if ( !params.has('id')) {
    window.location = 'index.html';
    throw new Error('El nombre y id son necesarios');
}

const baseUrl = 'http://localhost:3000'

const userName  = $('#userName')
const username  = $('#username')
const userImage = $('#userImage, #user-profile-img')
const userId    = $('#userId')
const id        = params.get('id')

const fetchUser = async () => {
    const request = await fetch( baseUrl + '/user/getUser/' + id ) 
    const { usuario } = await request.json()
    const { nombre, image }  = usuario

    username.val( nombre )
    userImage.attr( 'src', baseUrl + '/assets/images/users/' + ( image === '' ? 'default_user.jpg' : image ) )
    userId.val( id )
    userName.text( nombre )
}

fetchUser()