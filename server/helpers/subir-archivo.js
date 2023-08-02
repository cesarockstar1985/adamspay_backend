const { resolve } = require('path');
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'],carpeta = '' ) => {

    return new Promise( (resolve, reject) => {
        const { file } = files;
        const nombreCortado = file.name.split('.')
        const extension = nombreCortado [ nombreCortado.length -1 ]
    
        // Vaidar la extension
        if( !extensionesValidas.includes( extension ) ){
            return reject( `La extension ${ extension } no es permitida. Los files permitidos son ${ extensionesValidas }` )
        }
    
        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join( __dirname, '../../public/assets/', carpeta, nombreTemp );
    
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject( err )
            }
    
            resolve( nombreTemp )
        })
    })

}

module.exports = {
    subirArchivo
}