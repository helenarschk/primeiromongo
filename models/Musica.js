import conexao from "../config/conexao.js";

const MusicaSchema = new conexao.Schema({
  nome: String,
  duracao: String,
  artista: String,
  anoLancamento: Number
});

const Musica = conexao.model("Musica", MusicaSchema);

export default Musica;