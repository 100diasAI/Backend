const bcrypt = require('bcrypt'); // Asegúrate de tener instalada esta dependencia

const encriptarContraseña = async (contraseña) => {
  try {
    // Definimos el número de saltos, que en tu caso es 10
    const saltos = 10;
    
    // Encriptamos la contraseña
    const contraseñaEncriptada = await bcrypt.hash(contraseña, saltos);
    
    // Mostramos la contraseña encriptada
    console.log("Contraseña encriptada:", contraseñaEncriptada);
    
    return contraseñaEncriptada;
  } catch (error) {
    console.error("Error encriptando la contraseña:", error);
  }
};

// Pide al usuario ingresar la contraseña a encriptar
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Ingresa la contraseña a encriptar: ', (contraseña) => {
  encriptarContraseña(contraseña).then(() => {
    readline.close();
  });
});
