const axios = require('axios');
async function busca() {
  let paises = [
    'argentina',
    'brasil',
    'chile',
    'colombia',
    'paraguai',
    'peru',
    'suriname',
    'uruguay',
  ];
  let universidade = [];
  let paisErro = [];
  for (let pais in paises) {
    let resp = null;
    try {
      resp = await axios.get(
        `http://universities.hipolabs.com/search?country=${pais}`,
      );
      console.log(resp.data);
      process.exit();
      universidade.push(...resp.data);
    } catch (error) {
      paisErro.push(pais);
    }
  }
}

busca();
