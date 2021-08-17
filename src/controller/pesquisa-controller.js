const pool = require("../database/conexao");

// const getPesquisa = async (req, res) => {
//   const response = await pool.query("select * from pesquisa");
//   res.status(200).json(response.rows);
// };

// const getClienteById = async (req, res) => {
//   const response = await pool.query(
//     "select * from cliente where id_cliente = $1",
//     [req.params.id_cliente]
//   );
//   res.json(response.rows);
//   // res.send('Cliente ID ' + req.params.id_cliente);
// };

const postPesquisa = async (req, res) => {
  const { fk_cliente, fk_unidades, fk_respostas } = req.body;
  const response = await pool.query(
    "insert into pesquisa (fk_cliente, fk_unidades, fk_respostas) values ( $1, $2, $3);",
    [fk_cliente, fk_unidades, fk_respostas]
  );
  console.log(response);

  res.json({
    mensagem: "Pesquisa Respondida com sucesso",
    body: {
      cliente: { fk_cliente, fk_unidades, fk_respostas },
    },
  });
};

// const deleteCliente = async (req, res) => {
//   const response = await pool.query(
//     "select * from cliente where id_cliente = $1",
//     [req.params.id_cliente]
//   );
//   res.json(response.rows);
//   // res.send('Cliente ID ' + req.params.id_cliente);
// };

module.exports = {
  // getPesquisa,
  postPesquisa,
};
