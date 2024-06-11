const PDFDocument = require('pdfkit')

const fs = require('fs');


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
    const titulo = 'Carta de Aceptación';
    const lorem = "Consectetur nulla id aliquip exercitation amet quis. Do ad fugiat cillum veniam culpa dolore exercitation est commodo ut id eiusmod pariatur non. Cupidatat consectetur dolore ad anim adipisicing excepteur quis sint ut sint dolor anim id duis. Quis nostrud duis id tempor consectetur exercitation minim amet in exercitation reprehenderit nulla nisi adipisicing.Anim ipsum amet labore Lorem magna ipsum tempor esse ipsum anim magna occaecat proident. Laboris anim ad deserunt veniam ea laborum Lorem magna do. Sit ipsum sunt labore ipsum. Duis minim do dolor nulla. Laborum proident amet incididunt veniam do nostrud irure nulla ex minim duis officia ea excepteur. Deserunt laborum magna culpa culpa commodo aliquip et minim et ipsum commodo pariatur anim fugiat. Sunt consectetur labore adipisicing consequat pariatur ullamco dolor nostrud ipsum ullamco do quis reprehenderit eiusmod."

    return new Promise((resolve, reject) => {
        try {
            // Create a document
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(filePath);            

            doc.pipe(stream);

            doc.fontSize(25);
            doc.text(`${titulo}`, {
                align: 'center',            
                paragraphGap: 20
            }).stroke();

            doc.fontSize(12);
            doc.text(`${lorem}`, {
                align: 'left',
                baseline: 'ideographic',
                paragraphGap: 5
            });

            doc.text(`${lorem}`, {
                align: 'left',     
                paragraphGap: 5
            });

            // Dibujar una linea
            doc.rect(70, 680, 110, 0).stroke();

            // Texto debajo de la primera linea
            doc.text(`Firma de ${usuario.usuario}`, 70, 695);

            doc.rect(400, 680, 110, 0).stroke();
            doc.text(`Firma de ${usuario.encargado}`, 400, 695);

            // Agregar otra pagina
            doc.addPage();
            doc.fontSize(12);
            doc.text(`${lorem}`, {
                align: 'left'
            });

            doc.end();
            stream.on('finish', resolve);
            stream.on('error', reject);
        } catch (error) {        
            reject(error);
        }
    });
};

module.exports = {
    buildPDF
}