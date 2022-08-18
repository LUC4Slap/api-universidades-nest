/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const console = require('console');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const universitySchema = new Schema({
  id: ObjectId,
  name: String,
  webPage: String,
  country: String,
});

const MyModel = mongoose.model('universities', universitySchema);

async function busca() {
  let paises = [
    'argentina',
    'brazil',
    'chile',
    'colombia',
    'paraguay',
    'peru',
    'suriname',
    'uruguay',
  ];
  let paisErro = [];
  for (let pais of paises) {
    // console.log(`Pais: ${pais}`);
    let resp = null;
    try {
      resp = await axios.get(
        `http://universities.hipolabs.com/search?country=${pais}`,
      );
      await salvarUniversidade(resp.data);
    } catch (error) {
      paisErro.push(pais);
    }
  }

  if (paisErro.length > 0) {
    for (let pais of paisErro) {
      console.log(`Pais erro: ${pais}`);
      let resp = null;
      try {
        resp = await axios.get(
          `http://universities.hipolabs.com/search?country=${pais}`,
        );
        await salvarUniversidade(resp.data);
      } catch (error) {
        console.log('Falha para pesquisar pais novamente');
      }
    }
  }
}

async function salvarUniversidade(universidades) {
  let universidadesErro = [];
  for (let universidade of universidades) {
    try {
      let parser = {
        name: universidade.name,
        webPage: universidade.web_pages[0],
        country: universidade.country,
      };

      await salvarBanco(parser);
    } catch (error) {
      universidadesErro.push(universidade);
    }
  }

  if (universidadesErro.length > 0) {
    for (let universidade of universidadesErro) {
      try {
        let parser = {
          name: universidade.name,
          webPage: universidade.web_pages[0],
          country: universidade.country,
        };

        await salvarBanco(parser);
      } catch (error) {
        console.log('Falha para pesquisar universidade novamente');
      }
    }
  }
}

async function salvarBanco(universidade) {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/universidades', {
      useNewUrlParser: true,
    });

    const instance = new MyModel(universidade);
    await instance.save();

    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

async function start() {
  await busca();
  console.log('Importção de univercidades finalizada');
}

start();
