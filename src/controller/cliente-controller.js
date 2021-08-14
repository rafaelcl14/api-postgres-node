const pool = require("../database/conexao");

const getClientes = async (req, res) => {
  const response = await pool.query("select * from cliente");
  res.status(200).json(response.rows);
};

const getClienteById = async (req, res) => {
  const response = await pool.query(
    "select * from cliente where id_cliente = $1",
    [req.params.id_cliente]
  );
  res.json(response.rows);
  // res.send('Cliente ID ' + req.params.id_cliente);
};

const postClientes = async (req, res) => {
  const { nome, email, telefone, cidade, regras, termos, genero } = req.body;
  const response = await pool.query(
    "insert into cliente (nome, email, telefone, cidade, regras, termos, genero ) values ( $1, $2, $3, $4, $5, $6, $7);",
    [nome, email, telefone, cidade, regras, termos, genero]
  );
  console.log(response);

  res.json({
    mensagem: "Cliente Cadastrado com sucesso",
    body: {
      cliente: { nome, email, telefone, cidade, regras, termos, genero },
    },
  });
};

const deleteCliente = async (req, res) => {
  const response = await pool.query(
    "select * from cliente where id_cliente = $1",
    [req.params.id_cliente]
  );
  res.json(response.rows);
  // res.send('Cliente ID ' + req.params.id_cliente);
};

module.exports = {
  getClientes,
  postClientes,
  getClienteById,
  deleteCliente,
};
