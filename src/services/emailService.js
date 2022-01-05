const nodemailer=require('nodemailer')
let instance = null

class EmailService {

        async sendOrderEmail(email,orden){
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.SENDER_PASSWORD
                }
            });

            let texto = 'Orden Confirmada \n\n'
            texto +='Detalles \n\n'
            texto += 'Fecha: '+ orden.fechaYHora + '\n'
            texto += 'Total:' + orden.total + '\n\n'
            texto += 'Items:\n'
            texto+= orden.items.map(item => `Producto ${item.idProducto} Cantidad: ${item.cantidad} Precio: ${item.precio}\n`)
            await transporter.sendMail({
                from: '"Commerce 👻" <ian.jerde55@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Commerce orden confirmada ✔", // Subject line
                text: texto, // plain text body
              });
        }
        /**
         * 
         * @returns EmailService
         */
        static getInstance() {
            if (instance == null) {
              instance = new EmailService()
            }
        
            return instance
          }

}
module.exports= EmailService