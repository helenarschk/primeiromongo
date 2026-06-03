import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
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

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
