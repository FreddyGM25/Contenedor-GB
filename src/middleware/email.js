const nodemailer = require('nodemailer');
require("dotenv").config()

const mail = {
  user: 'freddyguetts@gmail.com',
  pass: 'nldnllqxrqmfcbzf'
}

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
  },
});

const sendEmail = async (email, html, rep, asunto) => {

  if (rep == 1) {
    try {
      await transporter.sendMail({
        from: `GRATITUD <${mail.user}>`, // sender address
        to: email, // list of receivers
        subject: "Activate Account", // Subject line
        text: "Link active account", // plain text body
        html, // html body
        attachments: [{
          filename: 'logogratitud.png',
          path: `${process.env.URLB}/serverimg/logogratitud.png`,
          cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
     }],
      });

      console.log("Email enviado correctamente")

    } catch (error) {
      console.log('Algo no va bien con el email', error);
      return false
    }
  }
  if (rep == 2) {
    try {
      await transporter.sendMail({
        from: `GRATITUD <${mail.user}>`, // sender address
        to: email, // list of receivers
        subject: "Reset password", // Subject line
        text: "Link reset account", // plain text body
        html, // html body
        attachments: [{
          filename: 'logogratitud.png',
          path: `${process.env.URLB}/serverimg/logogratitud.png`,
          cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
        }],
      });

      console.log("Email enviado correctamente")

    } catch (error) {
      console.log('Algo no va bien con el email', error);
      return false
    }
  }
  if (rep == 3) {
    try {
      await transporter.sendMail({
        from: `GRATITUD <${mail.user}>`, // sender address
        to: email, // list of receivers
        subject: asunto, // Subject line // plain text body
        html: html, // html body
        attachments: [{
          filename: 'logogratitud.png',
          path: `${process.env.URLB}/serverimg/logogratitud.png`,
          cid: 'logo' //my mistake was putting "cid:logo@cid" here! 
        }],
      });

      console.log("Email enviado correctamente")

    } catch (error) {
      console.log('Algo no va bien con el email', error);
      return false
    }
  }
}

const getTemplate = (name, token, URL, text, resp) => {

  if (resp == 1) {
    return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossorigin="anonymous"
      />
      <title>Document</title>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"
      ></script>
      <script>
        const styles = {
          stylesA: {
            color: "blue",
            textDecoration: "none",
            fontSize: "24px",
          },
        };
      </script>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
        * {
          font-family: "Poppins";
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div>
          <img src="./logogratitud.png" alt="" />
        </div>
        <div>
          <p style="color: #a07260; font-size: 24px; max-width: 900px">
            Hola ${name}, Siga este enlace para verificar su dirección de correo
            electrónico.
          </p>
          <br />
          <a
            href="${process.env.URLA}?token=${token}"
            style="color: blue; text-decoration: none; font-size: 24px"
            >Haz click aquí</a
          >
          <br />
          <br />
          <p style="color: #a07260; font-size: 24px; max-width: 900px">
            En caso de que no puedas ingresar a través del link, puedes copiar y
            pegar en tu navegador el siguiente link.
          </p>
          <br />
          <a
            href="${process.env.URLA}?token=${token}"
            style="color: blue; text-decoration: none; font-size: 24px"
            >${process.env.URLA}?token=${token}</a
          >
          <h3 style="margin-top: 30%; color: #F36A6A; ">Gratitud.link Team</h3>
          <div style="margin-top: 10%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <p style="color: #a07260;">
              Enviamos este email porque creo una cuenta en nuestro sitio web, si
              no es usted quien lo hizo, reenvíe este correo electrónico a
              hola@gratitud.link y lo arreglaremos, porque enviar correos
              electrónicos no deseados definitivamente no es lo nuestro.
            </p>
            <p style="color: #a07260;">gratitud.link</p>
            <p style="color: #a07260;">Hecho en el Paraíso, Cancún Quintana Roo, México.</p>
            <span style="color: #F36A6A;">Aviso de Privacidad</span>
          </div>
        </div>
      </div>
    </body>`;
  }
  if (resp == 2) {
    return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossorigin="anonymous"
      />
      <title>Document</title>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"
      ></script>
      <script>
        const styles = {
          stylesA: {
            color: "blue",
            textDecoration: "none",
            fontSize: "24px",
          },
        };
      </script>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
        * {
          font-family: "Poppins";
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div>
          <img src="./logogratitud.png" alt="" />
        </div>
        <div>
          <p style="color: #a07260; font-size: 24px; max-width: 900px">
            Hola ${name}, Siga este enlace para reiniciar la contraseña.
          </p>
          <br />
          <a
            href="${process.env.URLR}?token=${token}"
            style="color: blue; text-decoration: none; font-size: 24px"
            >Haz click aquí</a
          >
          <br />
          <br />
          <p style="color: #a07260; font-size: 24px; max-width: 900px">
            En caso de que no puedas ingresar a través del link, puedes copiar y
            pegar en tu navegador el siguiente link.
          </p>
          <br />
          <a
            href="${process.env.URLR}?token=${token}"
            style="color: blue; text-decoration: none; font-size: 24px"
            >${process.env.URLR}?token=${token}</a
          >
          <h3 style="margin-top: 30%; color: #F36A6A; ">Gratitud.link Team</h3>
          <div style="margin-top: 10%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <p style="color: #a07260;">
              Enviamos este email porque creo una cuenta en nuestro sitio web, si
              no es usted quien lo hizo, reenvíe este correo electrónico a
              hola@gratitud.link y lo arreglaremos, porque enviar correos
              electrónicos no deseados definitivamente no es lo nuestro.
            </p>
            <p style="color: #a07260;">gratitud.link</p>
            <p style="color: #a07260;">Hecho en el Paraíso, Cancún Quintana Roo, México.</p>
            <span style="color: #F36A6A;">Aviso de Privacidad</span>
          </div>
        </div>
      </div>
    </body>`;
  }
  if (resp == 3) {
    return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossorigin="anonymous"
      />
      <title>Document</title>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"
      ></script>
      <script>
        const styles = {
          stylesA: {
            color: "blue",
            textDecoration: "none",
            fontSize: "24px",
          },
        };
      </script>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
        * {
          font-family: "Poppins";
        }
  
        @media screen and (min-width: 1200px) {
          .container{
            max-width: 900px;
          }
        
        }
  
      </style>
    </head>
    <body>
      <div class="container">
        <div style="display: flex; justify-content: center">
          <img src="cid:logo" alt="" />
        </div>
        <br />
        <br>
        <div>
          <h3 style="font-weight: 400">Hola ${name}</h3>
          <br />
          <p style="color: rgb(49, 49, 49); font-size: 24px; max-width: 900px">
            Hola,  <br/><br/> ${text}
          </p>
          <br><br>
          <div style="width: 100%; display: flex; justify-content: center;">
          <a href="${URL}"><button type="button" class="btn btn-primary" style="border: 0; border-radius: 50px; font-size: 24px; padding: 15px 30px; background-color: #F36A6A;">Continuar aquí</button></a></div>
          <br />
          <div
            style="
              margin-top: 10%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
            "
          >
           <h3 style="margin-top: 30%; color: #f36a6a">Gratitud.link Team</h3>
           <br><br>
            <p style="color: #a07260">
              Enviamos este email porque creo una cuenta en nuestro sitio web, si
              no es usted quien lo hizo, reenvíe este correo electrónico a
              hola@gratitud.link y lo arreglaremos, porque enviar correos
              electrónicos no deseados definitivamente no es lo nuestro.
            </p>
            <p style="color: #a07260">gratitud.link</p>
            <p style="color: #a07260">
              Hecho en el Paraíso, Cancún Quintana Roo, México.
            </p>
            <span style="color: #f36a6a">Aviso de Privacidad</span>
            <br>
          </div>
        </div>
      </div>
    </body>`
  }
}


module.exports = {
  sendEmail,
  getTemplate
}