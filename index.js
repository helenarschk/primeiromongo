import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
import Artista from './models/Artista.js';
const app = express();
const PORT = 3000;

// Configura o EJS como motor de views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// pasta onde ficam os arquivos .ejs
app.set("views", "./views"); 
//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("index");
});

//rotas do gênero

app.get("/generos", async (req, res) => {
  const generos = await Genero.find();
  res.render("genero/lst", {generos});
});

app.get("/generos/add", (req, res) => {
    res.render("genero/add");
});

app.post("/generos/add", async (req, res) => {
  const nome = req.body.nome;
  await Genero.create({nome});
  res.render("genero/addok");
});

//rotas da música

app.get("/musicas", async (req, res) => {
  const musicas = await Musica.find()
  res.render("musica/lst", { musicas });
});

//rotas do artista
app.get("/artistas", async (req, res) => {
  const artistas = await Artista.find()
  res.render("artista/lst", { artistas });
});

app.get("/artistas/add", (req, res) => {
    res.render("artista/add");
});

app.post("/artistas/add", async (req, res) => {
  const {nome, pais, anoNascimento} = req.body;
  await Artista.create({nome, pais, anoNascimento});
  res.render("artista/addok");
});

//excluir
app.get('/musicas/del/:id', async (req, res) => {
const musicas = await Musica.findByIdAndDelete(req.params.id)
res.redirect("/musica/lst")
})

app.get("/musicas/add", (req, res) => {
    res.render("musica/add");
});

app.post("/musicas/add", async (req, res) => {
  const {nome, duracao, artista, anoLancamento} = req.body;
  await Musica.create({nome, duracao, artista, anoLancamento});
  res.render("musica/addok");
});

app.get('/generos/del/:id', async (req, res) => {
const generos = await Genero.findByIdAndDelete(req.params.id)
res.redirect("/generos/lst")
})

app.get("/generos/add", (req, res) => {
    res.render("genero/add");
});

app.post("/generos/add", async (req, res) => {
  const {nome} = req.body;
  await Genero.create({nome});
  res.render("genero/addok");
});

app.get('/artistas/del/:id', async (req, res) => {
const artistas = await Artista.findByIdAndDelete(req.params.id)
res.redirect("/artista/lst")
})

app.get("/artistas/add", (req, res) => {
    res.render("artista/add");
});

app.post("/artistas/add", async (req, res) => {
  const {nome, pais, anoNascimento} = req.body;
  await Artista.create({nome, pais, anoNascimento});
  res.render("artista/addok");
});

//editar
app.get('/musicas/edt/:id', async (req, res) => {
const musica = await Musica.findById(req.params.id)
res.render("musica/edt", {musica})
})

app.post('/musicas/edt/:id', async (req, res) => {
const musica = await Musica.findByIdAndUpdate(req.params.id, req.body)
res.render("musica/edtok")
})

app.get('/generos/edt/:id', async (req, res) => {
const genero = await Genero.findById(req.params.id)
res.render("genero/edt", {genero})
})

app.post('/generos/edt/:id', async (req, res) => {
const genero = await Genero.findByIdAndUpdate(req.params.id, req.body)
res.render("genero/edtok")
})

app.get('/artistas/edt/:id', async (req, res) => {
const artista = await Artista.findById(req.params.id)
res.render("artista/edt", {artista})
})

app.post('/artistas/edt/:id', async (req, res) => {
const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)
res.render("artista/edtok")
})

//filtrar e pesquisar
app.post('/musicas/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const musicas = await Musica.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("musica/lst", { musicas });
})

app.post('/generos/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const generos = await Genero.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("genero/lst", { generos });
})

app.post('/artistas/lst', async (req, res) => {
  const { pesquisar } = req.body;
  const artistas = await Artista.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("artista/lst", { artistas });
})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
