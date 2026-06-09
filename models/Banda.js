import conexao from "../config/conexao.js";

const BandaSchema = new conexao.Schema({
  nome: String,
  pais: String,
  anoInicio: String
});

const Banda = conexao.model("Banda", BandaSchema);

export default Banda;