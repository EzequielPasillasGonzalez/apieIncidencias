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
    const adscripcionResp = "Departamento de Ciencias de la Información y Desarrollo Tecnológicos"
    const fechaPermiso = "Fecha del permiso:"

    const motivo = 'Motivo del permiso';
    const fraccion1 = 'FRACCIÓN I';
    const fraccion2 = 'FRACCIÓN II.';
    const fraccion3 = 'FRACCIÓN III.'
    const fraccion4 = "FRACCIÓN IV."
    const fraccion5 = "FRACCIÓN V."
    const fraccion6 = "FRACCIÓN VI."
    const otraClausula = "OTRA CLAUSULA."

    const respFraccion1 = 'Incapacidad médica (IMSS)';
    const respFraccion2 = 'Permiso 4 días hábiles con goce de salario (Permiso de cuatro días hábiles con goce de salario cuando fallezca algún familiar directo, entendiéndose como tales a los padres, hermanos, hijos y cónyuge, exhibiendo el comprobante correspondiente).';
    const respFraccion3 = 'Permiso 8 días hábiles con goce de salario (Permiso de cuatro días hábiles con goce de salario cuando contraigan matrimonio civil, exhibiendo el comprobante correspondiente).'
    const respFraccion4 = "Permiso por motivos personales (en una o varias ocasiones, pero sin que la suma de los días exceda de 15 en un semestre o de 30 en un año. Siempre que los intereses académicos no resulten afectados)."
    const respFraccion5 = "Permiso ecónomico durante el Ciclo escolar (Cuando el titular de la dependencia lo autorice en los términos del artículo 147 y 176 del Estatuto General y el artículo 52 del EPA)."
    const respFraccion6 = "Permiso o licencia para asistir a seminarios, foros, congresos (La solicitud de permiso deberá presentarse por escrito por lo menos con cuatro días hábiles de anticipación. La respuesta a la solicitud de permiso deberá hacerse por escrito por el titular de la dependencia en un término no mayor de 3 días hábiles)."


    const observacionesMaterias = "Obervaciones: de las siguientes materias"
    const crn = "CRN:"
    const clave = "CLAVE:"
    const materia = "Materia:"

    const firmaUsaurio = "Nombre y Firma del trabajador"
    const firmaJefe = "Jefe inmediato"
    const nombreJefe = "Mtro. Jóse Guadalupe Morales Montelongo"
    const nombreCoordinador = "Lic. Oscar J. Magaña Orozco"
    const firmaCoordinador = "Coordinación de Personal"
    const labelfirmaJefe = "(nombre y firma)"



    const nombreResp = usuario.nombre
    const codigoResp = usuario.codigo
    const plazaResp = usuario.plaza
    const fechaPermisoResp = usuario.fechaPermiso
    let respFraClausula = ""
    if (usuario.FraClausula) {
        respFraClausula = usuario.FraClausula
    }


    usuario.idMotivo = 1

    return new Promise((resolve, reject) => {
        try {
            // Create a document
            const doc = new PDFDocument({ size: 'A4' });
            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);

            const logoUDG = path.join(__dirname, '../assets/logoudg.png')
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

            //? Dibujar una linea vertical
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
            doc.fontSize(10).text(titulo, 450, 30, {
                width: 100,

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

            doc.fontSize(9).text(`${adscripcionResp}`, 220, 190, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            })

            doc.fontSize(12).text(`${fechaPermisoResp}`, 220, 212, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            })

            // Restablecer el estilo de línea a su valor por defecto
            doc.undash();


            doc.moveDown().fontSize(15).text(`${motivo}`, 230, 240, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 5
            }).stroke()

            doc.fontSize(12).text(`${fraccion1}`, 70, 257, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 5
            }).stroke()



            doc.text(`${fraccion2}`, 70, 278, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 5
            })



            doc.text(`${fraccion3}`, 70, 325, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${fraccion4}`, 70, 365, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${fraccion5}`, 70, 400, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${fraccion6}`, 70, 435, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${otraClausula}`, 70, 495, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 7
            })

            // Restablecer el estilo de línea a su valor por defecto
            doc.undash();

            doc.fontSize(10).text(`${respFraccion1}`, 245, 255, {
                align: 'left',

                baseline: 'ideographic',
                paragraphGap: 5
            }).stroke()



            doc.fontSize(9).text(`${respFraccion2}`, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 7
            })



            doc.text(`${respFraccion3}`, {
                align: 'left',

                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${respFraccion4}`, {
                align: 'left',

                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${respFraccion5}`, {
                align: 'left',

                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${respFraccion6}`, {
                align: 'left',

                baseline: 'ideographic',
                paragraphGap: 7
            })

            doc.text(`${respFraClausula}`, {
                align: 'left',

                baseline: 'ideographic',
                paragraphGap: 7
            })

            // Restablecer el estilo de línea a su valor por defecto
            doc.undash();

            // Dibujar cuadro a cada campo de los motivos de permiso
            doc.rect(70, 220, 470, 20).stroke();
            doc.rect(70, 240, 470, 20).stroke();
            doc.rect(70, 260, 470, 46).stroke();
            doc.rect(70, 306, 470, 40).stroke();
            doc.rect(70, 346, 470, 35).stroke();
            doc.rect(70, 381, 470, 38).stroke();
            doc.rect(70, 419, 470, 60).stroke();
            doc.rect(70, 479, 470, 60).stroke();

            //? Dibujar una linea vertical
            doc.rotate(90, { origin: [180, 100] })
                .rect(320, 40, 299, 0).stroke();

            doc.rect(320, 92, 299, 0).stroke();

            //Reset rotation and fill style to default before adding text
            doc.rotate(-90, { origin: [180, 100] })

            // Dibujar cuadro
            doc.rotate(0, { origin: [250, 100] })
                .fill(225, 0, 0).fillOpacity(0.5);

            doc.rect(70, 220, 470, 20).fill('gray').fillOpacity(0.8); // Dibuja el segundo rectángulo (trasero)        

            // Reset rotation and fill style to default before adding text
            doc.rotate(0, { origin: [250, 100] })
                .fill('black').fillOpacity(1); // Reset fill to black

            // Dibujar cuadro
            doc.rotate(0, { origin: [250, 100] })
                .fill(225, 0, 0).fillOpacity(0.5);


            switch (usuario.idMotivo) {
                case 1:
                    // Fraccion 1    
                    doc.rect(188, 240, 52, 20).fill('black') // Dibuja el segundo rectángulo (trasero) 
                    break;
                case 2:

                    // Fraccion 2    
                    doc.rect(188, 260, 52, 46); // Dibuja el segundo rectángulo (trasero)  
                    break;
                case 3:
                    // Fraccion 3
                    doc.rect(188, 306, 52, 40); // Dibuja el segundo rectángulo (trasero)   
                    break;
                case 4:
                    // Fraccion 4
                    doc.rect(188, 346, 52, 35); // Dibuja el segundo rectángulo (trasero) 
                    break;
                case 5:
                    // Fraccion 5
                    doc.rect(188, 381, 52, 38); // Dibuja el segundo rectángulo (trasero) 
                    break;
                case 6:
                    // Fraccion 6
                    doc.rect(188, 419, 52, 60); // Dibuja el segundo rectángulo (trasero)  
                    break;
                case 7:
                    // Fraccion 7
                    doc.rect(188, 479, 52, 60); // Dibuja el segundo rectángulo (trasero)  
                    break;
                default:

                    break;
            }

            // Reset rotation and fill style to default before adding text
            doc.rotate(0, { origin: [250, 100] })
                .fill('black').fillOpacity(1); // Reset fill to black


            //Parte de materias
            // Restablecer el estilo de línea a su valor por defecto
            doc.undash();


            doc.moveDown().fontSize(15).text(`${observacionesMaterias}`, 70, 565, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
                paragraphGap: 5
            }).stroke()

            doc.fontSize(12).text(`${crn}`, 70, 585, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',

            }).stroke()



            doc.text(`${clave}`, 150, 585, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',

            })



            doc.text(`${materia}`, 310, 585, {
                align: 'left',
                indent: 10,
                baseline: 'ideographic',
            })


            // Dibujar cuadro a campo de materias
            doc.rect(70, 545, 470, 80).stroke();



            //Parte de firmas
            // Restablecer el estilo de línea a su valor por defecto
            doc.undash();


            doc.moveDown().fontSize(10).text(`${firmaUsaurio}`, 70, 740, {
                align: 'center',
                // indent: 10,
                width: 135,
                baseline: 'ideographic',
            }).stroke()


            doc.text(`${nombreResp}`, -250, 728, {
                align: 'center',
                baseline: 'ideographic',
                // paragraphGap: 5
            })

            doc.text(`${firmaJefe}`, 90, 747, {
                align: 'center',
                // indent: 10,
                baseline: 'ideographic',

            }).stroke()



            doc.text(`${nombreJefe}`, 240, 725, {
                align: 'center',
                // indent: 10,
                width: 135,
                baseline: 'ideographic',

            })



            doc.text(`${nombreCoordinador}`, 395, 730, {
                align: 'center',
                //     indent: 10,
                width: 135,
                baseline: 'ideographic',
            })

            doc.text(`${firmaCoordinador}`, 400, 745, {
                align: 'center',
                //     indent: 10,
                baseline: 'ideographic',

            })



            doc.text(`${labelfirmaJefe}`, 90, 758, {
                align: 'center',
                // indent: 10,
                baseline: 'ideographic',
            })

            doc.text(`${labelfirmaJefe}`, 400, 758, {
                align: 'center',
                // indent: 10,
                baseline: 'ideographic',
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