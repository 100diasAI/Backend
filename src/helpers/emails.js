const nodemailer = require("nodemailer");

const emailRegistro = async (data) => {
//   console.log(`Data`, data);
  const { name, email, token } = data;

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "henrypfg11@gmail.com",
      pass: "chirxatvtficaopa",
    },
  });

  const info = await transport.sendMail({
    from: "Shopping Online - E-commerce",
    to: email,
    subject: "Shopping Online - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en Shopping Online",
    html: `<p>Hola : ${name}, Comprueba tu cuenta de Shopping Online</p>
    <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace: 
        <a href="https://shopping-online-production.up.railway.app/confirmar/${token}">Confirmar cuenta</a>
    </p>
    `,
  });
};

const emailOlvidePassword = async (data) => {
  //   console.log(`Data`, data);
    const { name, email, token } = data;
  
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "henrypfg11@gmail.com",
        pass: "chirxatvtficaopa",
      },
    });
  
    const info = await transport.sendMail({
      from: "Shopping Online - E-commerce",
      to: email,
      subject: "Shopping Online - Reestablece tu Password",
      text: "Comprueba tu cuenta en Meli-Ropa",
      html: `<p>Hola : ${name}, has solicitado reestablecer tu password en Shopping Online</p>
      <p> Sigue el siguiente enlace para generar un nuevo password: 
          <a href="https://shopping-online-production.up.railway.app/olvide-password/${token}">Reestablecer Password</a>
      </p>
      `,
    });
  };

module.exports = { emailRegistro, emailOlvidePassword };
