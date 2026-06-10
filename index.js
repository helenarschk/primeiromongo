import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
import Artista from './models/Artista.js';
import Banda from './models/Banda.js';
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

//gêneros

app.get("/generos", async (req, res) => {
  const generos = await Genero.find();
  res.render("genero/lst", {generos});
});

app.get("/generos/add", (req, res) => {
    res.render("genero/add");
});

app.post("/generos/add", async (req, res) => {
  const {nome} = req.body;
  await Genero.create({nome});
  res.render("genero/addok");
});

app.get('/generos/del/:id', async (req, res) => {
const generos = await Genero.findByIdAndDelete(req.params.id)
res.redirect("/generos")
})

app.get('/generos/edt/:id', async (req, res) => {
const genero = await Genero.findById(req.params.id)
res.render("genero/edt", {genero})
})

app.post('/generos/edt/:id', async (req, res) => {
const genero = await Genero.findByIdAndUpdate(req.params.id, req.body)
res.render("genero/edtok")
})

app.post('/generos', async (req, res) => {
  const { pesquisar } = req.body;
  const generos = await Genero.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("genero/lst", { generos });
})

//músicas

app.get("/musicas", async (req, res) => {
  const musicas = await Musica.find()
  res.render("musica/lst", { musicas });
});

app.get('/musicas/del/:id', async (req, res) => {
const musicas = await Musica.findByIdAndDelete(req.params.id)
res.redirect("/musicas")
})

app.get("/musicas/add", (req, res) => {
    res.render("musica/add");
});

app.post("/musicas/add", async (req, res) => {
  const {nome, duracao, artista, genero, anoLancamento} = req.body;
  await Musica.create({nome, duracao, artista, genero, anoLancamento});
  res.render("musica/addok");
});

app.get('/musicas/edt/:id', async (req, res) => {
const musica = await Musica.findById(req.params.id)
res.render("musica/edt", {musica})
})

app.post('/musicas/edt/:id', async (req, res) => {
const musica = await Musica.findByIdAndUpdate(req.params.id, req.body)
res.render("musica/edtok")
})

app.post('/musicas', async (req, res) => {
  const { pesquisar } = req.body;
  const musicas = await Musica.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("musica/lst", { musicas });
})

//artistas

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

app.get('/artistas/del/:id', async (req, res) => {
const artistas = await Artista.findByIdAndDelete(req.params.id)
res.redirect("/artistas")
})

app.get("/artistas/add", (req, res) => {
    res.render("artista/add");
});

app.post("/artistas/add", async (req, res) => {
  const {nome, pais, anoNascimento} = req.body;
  await Artista.create({nome, pais, anoNascimento});
  res.render("artista/addok");
});

app.get('/artistas/edt/:id', async (req, res) => {
const artista = await Artista.findById(req.params.id)
res.render("artista/edt", {artista})
})

app.post('/artistas/edt/:id', async (req, res) => {
const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)
res.render("artista/edtok")
})

app.post('/artistas', async (req, res) => {
  const { pesquisar } = req.body;
  const artistas = await Artista.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("artista/lst", { artistas });
})

//bandas

app.get("/bandas", async (req, res) => {
  const bandas = await Banda.find()
  res.render("banda/lst", { bandas });
});

app.get("/bandas/add", (req, res) => {
    res.render("banda/add");
});

app.post("/bandas/add", async (req, res) => {
  const {nome, pais, anoInicio} = req.body;
  await Banda.create({nome, pais, anoInicio});
  res.render("banda/addok");
});

app.get('/bandas/del/:id', async (req, res) => {
const bandas = await Banda.findByIdAndDelete(req.params.id)
res.redirect("/bandas")
})

app.get("/bandas/add", (req, res) => {
    res.render("banda/add");
});

app.post("/bandas/add", async (req, res) => {
  const {nome, pais, anoInicio} = req.body;
  await Banda.create({nome, pais, anoInicio});
  res.render("banda/addok");
});

app.get('/bandas/edt/:id', async (req, res) => {
const banda = await Banda.findById(req.params.id)
res.render("banda/edt", {banda})
})

app.post('/bandas/edt/:id', async (req, res) => {
const banda = await Banda.findByIdAndUpdate(req.params.id, req.body)
res.render("banda/edtok")
})

app.post('/bandas', async (req, res) => {
  const { pesquisar } = req.body;
  const bandas = await Banda.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("banda/lst", { bandas });
})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
