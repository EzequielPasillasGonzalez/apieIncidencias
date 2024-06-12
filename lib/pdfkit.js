const PDFDocument = require('pdfkit')

const fs = require('fs');
const path = require('path')


// const buildPDF = async (dataCallback, endCallback, usuario) => {

//     const titulo = 'Carta de Aceptación';
//     const lorem = "Consectetur nulla id aliquip exercitation amet quis. Do ad fugiat cillum veniam culpa dolore exercitation est commodo ut id eiusmod pariatur non. Cupidatat consectetur dolore ad anim adipisicing excepteur quis sint ut sint dolor anim id duis. Quis nostrud duis id tempor consectetur exercitation minim amet in exercitation reprehenderit nulla nisi adipisicing.Anim ipsum amet labore Lorem magna ipsum tempor esse ipsum anim magna occaecat proident. Laboris anim ad deserunt veniam ea laborum Lorem magna do. Sit ipsum sunt labore ipsum. Duis minim do dolor nulla. Laborum proident amet incididunt veniam do nostrud irure nulla ex minim duis officia ea excepteur. Deserunt laborum magna culpa culpa commodo aliquip et minim et ipsum commodo pariatur anim fugiat. Sunt consectetur labore adipisicing consequat pariatur ullamco dolor nostrud ipsum ullamco do quis reprehenderit eiusmod."


//     try {
//         // Create a document
//         const doc = new PDFDocument();


//         doc.on("data", dataCallback);
//         doc.on("end", endCallback);        

//         // const logoC5 = path.join(__dirname, '../assets/logo.png')   
//         // //? Agegar imagen     
//         // doc.image(logoC5, 45, 50, {
//         //     fit: [100, 100],    //? Tamaño de la imagen        
//         // });

//         doc.fontSize(25);
//         doc.text(`${titulo}`, {
//             align: 'center',            
//             paragraphGap: 20
//         } ).stroke()

//         doc.fontSize(12);
//         doc.text(`${lorem}`, {
//             align: 'left',
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })

//         doc.text(`${lorem}`, {
//             align: 'left',     
//             paragraphGap: 5 //? Espacio despues del parrafo
//         })

//         // const logoJalisco = path.join(__dirname, '../assets/rombo.png')

//         // //? Agegar imagen
//         // doc.image(logoJalisco, 490, 20, {
//         //     fit: [90, 90],//? Tamaño de la imagen
//         // });


//         // const firmaUsuario = path.join(__dirname, '../assets/firma.jpeg')   
//         // //? Agegar imagen     
//         // doc.image(firmaUsuario, 70, 620, {
//         //     fit: [100, 100],    //? Tamaño de la imagen                    
//         // })


//         //? Dibujar una linea
//         doc.rect(70, 680, 110, 0).stroke();

//         //? Texto debajo de la primera linea
//         doc.text(`Firma de ${usuario.usuario}`, 70, 695,)

//         // const firmaEncargado = path.join(__dirname, '../assets/firma2.jpeg')   
//         // //? Agegar imagen     
//         // doc.image(firmaEncargado, 400, 620, {
//         //     fit: [100, 100],    //? Tamaño de la imagen        
//         // });

//         doc.rect(400, 680, 110, 0).stroke();

//         doc.text(`Firma de ${usuario.encargado}`, 400, 695,)

//         //? Agergar otra pagina
//         doc.addPage()

//         doc.fontSize(12);
//         doc.text(`${lorem}`, {
//             align: 'left'
//         })        

//         doc.end();

//     } catch (error) {        
//         return ({
//             ok: false,
//             body: `${error.mesagge}`
//         })
//     }


// }

const buildPDF = async (filePath, usuario) => {
    const nombreUIniversidad = 'Universidad de Guadalajara';
    const nombreCentroUniversitario = 'Centro Universirtario de Tonalá';
    const titulo = 'Registro de Incidencias y Faltas de asistencias'
    const nombre = "Nombre del solicitante:"
    const codigo = "Código:"
    const plaza = "Plaza:"
    const adscripcion = "Adscripción:"
    const fechaPermiso = "Fecha del permiso:"
    const nombreResp = usuario.nombre
    const codigoResp = usuario.codigo
    const plazaResp = usuario.plaza
    const adscripcionResp = "Departamento de Ciencias de la Información y Desarrollo Tecnológicos"
    const fechaPermisoResp = "2/02/24 14:00 a 16:00"


    return new Promise((resolve, reject) => {
        try {
            // Create a document
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);

            const logoUDG = path.join(__dirname, '../assets/universidad-de-guadalajara-eps-vector-logo.png')
            //? Agegar imagen     
            doc.image(logoUDG, 45, 10, {
                fit: [100, 100],    //? Tamaño de la imagen        
            });

            doc.fontSize(15).text(`${nombreUIniversidad}`, {
                align: 'left',
                indent: 60,
            }).stroke()

            // Restablecer el estilo de línea a su valor por defecto
            doc.undash();

            doc.fontSize(10).text(`${nombreCentroUniversitario}`, {
                align: 'left',
                indent: 60,
                paragraphGap: 20
            }).stroke()



            doc.moveDown().fontSize(12).text(`${nombre}`, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 5
            })



            doc.text(`${codigo}`, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 5
            })



            doc.text(`${plaza}`, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${adscripcion}`, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${fechaPermiso}`, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            // Dibujar cuadro a cada campo
            doc.rect(70, 115, 470, 20).stroke();
            doc.rect(70, 135, 470, 20).stroke()
            doc.rect(70, 155, 470, 20).stroke()
            doc.rect(70, 175, 470, 20).stroke()
            doc.rect(70, 195, 470, 20).stroke()

            //? Dibujar una linea
            doc.rotate(90, { origin: [195, 100] })
                .rect(210, 85, 100, 0).stroke();

            //Reset rotation and fill style to default before adding text
            doc.rotate(-90, { origin: [195, 100] })

            // Dibujar cuadro
            doc.rotate(0, { origin: [250, 100] })
                .fill(225, 0, 0).fillOpacity(0.5);

            doc.rect(70, 115, 140, 100).fill('gray').fillOpacity(0.8); // Dibuja el segundo rectángulo (trasero)        

            // Reset rotation and fill style to default before adding text
            doc.rotate(0, { origin: [250, 100] })
                .fill('black').fillOpacity(1); // Reset fill to black

            //De lado izquierdo
            doc.fontSize(10).text(titulo, 490, 30, {

            }).stroke();


            // Restablecer el estilo de línea a su valor por defecto
            doc.undash();

            doc.fontSize(12).text(`${nombreResp}`, 220, 130, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            })

            doc.text(`${codigoResp}`, 220, 152, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            })

            doc.text(`${plazaResp}`, 220, 172, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            })

            doc.fontSize(10).text(`${adscripcionResp}`, 220, 192, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            })

            doc.fontSize(12).text(`${fechaPermisoResp}`, 220, 212, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            })



            doc.end();
            stream.on('finish', resolve);
            stream.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
};

// const buildPDF = async (dataCallback, endCallback, usuario) => {


//     console.log(usuario);

//     const nombreUIniversidad = 'Universidad de Guadalajara';
//     const nombreCentroUniversitario = 'Centro Universirtario de Tonalá';
//     const titulo = 'Registro de Incidencias y Faltas de asistencias'
//     const nombre = "Nombre del solicitante:"
//     const codigo = "Código:"
//     const plaza = "Plaza:"
//     const adscripcion = "Adscripción:"
//     const fechaPermiso = "Fecha del permiso:"
//     const nombreResp = usuario.nombre
//     const codigoResp = usuario.codigo
//     const plazaResp = usuario.plaza
//     const adscripcionResp = "Departamento de Ciencias de la Información y Desarrollo Tecnológicos"
//     const fechaPermisoResp = "2/02/24 14:00 a 16:00"


//     try {
//         // Create a document
//         const doc = new PDFDocument();


//         doc.on("data", dataCallback);
//         doc.on("end", endCallback);

//         const logoUDG = path.join(__dirname, '../assets/universidad-de-guadalajara-eps-vector-logo.png')
//         //? Agegar imagen     
//         doc.image(logoUDG, 45, 10, {
//             fit: [100, 100],    //? Tamaño de la imagen        
//         });

//         doc.fontSize(15).text(`${nombreUIniversidad}`, {
//             align: 'left',
//             indent: 60,
//         }).stroke()

//         // Restablecer el estilo de línea a su valor por defecto
//         doc.undash();

//         doc.fontSize(10).text(`${nombreCentroUniversitario}`, {
//             align: 'left',
//             indent: 60,
//             paragraphGap: 20
//         }).stroke()



//         doc.moveDown().fontSize(12).text(`${nombre}`, {
//             align: 'left',
//             indent: 10,
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })



//         doc.text(`${codigo}`, {
//             align: 'left',
//             indent: 10,
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })



//         doc.text(`${plaza}`, {
//             align: 'left',
//             indent: 10,
//             baseline: 'ideographic',
//             paragraphGap: 7
//         })

//         doc.text(`${adscripcion}`, {
//             align: 'left',
//             indent: 10,
//             baseline: 'ideographic',
//             paragraphGap: 7
//         })

//         doc.text(`${fechaPermiso}`, {
//             align: 'left',
//             indent: 10,
//             baseline: 'ideographic',
//             paragraphGap: 7
//         })

//         // Dibujar cuadro a cada campo
//         doc.rect(70, 115, 470, 20).stroke();
//         doc.rect(70, 135, 470, 20).stroke()
//         doc.rect(70, 155, 470, 20).stroke()
//         doc.rect(70, 175, 470, 20).stroke()
//         doc.rect(70, 195, 470, 20).stroke()

//         //? Dibujar una linea
//         doc.rotate(90, { origin: [195, 100] })
//             .rect(210, 85, 100, 0).stroke();

//         //Reset rotation and fill style to default before adding text
//         doc.rotate(-90, { origin: [195, 100] })            

//         // Dibujar cuadro
//         doc.rotate(0, { origin: [250, 100] })            
//             .fill(225, 0, 0).fillOpacity(0.5);

//         doc.rect(70, 115, 140, 100).fill('gray').fillOpacity(0.8); // Dibuja el segundo rectángulo (trasero)        

//         // Reset rotation and fill style to default before adding text
//         doc.rotate(0, { origin: [250, 100] })
//             .fill('black').fillOpacity(1); // Reset fill to black

//         //De lado izquierdo
//         doc.fontSize(10).text(titulo, 490, 30, {

//         }).stroke();


//         // Restablecer el estilo de línea a su valor por defecto
//         doc.undash();

//         doc.fontSize(12).text(`${nombreResp}`, 220,130, {
//             align: 'left',            
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })

//         doc.text(`${codigoResp}`, 220,152, {
//             align: 'left',            
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })

//         doc.text(`${plazaResp}`, 220,172, {
//             align: 'left',            
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })

//         doc.fontSize(10).text(`${adscripcionResp}`, 220,192, {
//             align: 'left',            
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })

//         doc.fontSize(12).text(`${fechaPermisoResp}`, 220,212, {
//             align: 'left',            
//             baseline: 'ideographic',
//             paragraphGap: 5
//         })





//         doc.end();

//     } catch (error) {
//         return ({
//             ok: false,
//             body: `${error}`
//         })
//     }


// }

module.exports = {
    buildPDF
}