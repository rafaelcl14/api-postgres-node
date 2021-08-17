const pool = require("../database/conexao");
const jwt = require("jsonwebtoken");

const getClientes = async (req, res) => {
  const response = await pool.query("select * from cliente");
  res.status(200).json(response.rows);
};
// pool.connect((error, conn) => {
//   if(error) { return res.status(500).send({error: error}); }

//   conn.query(
//     'SELECT * FROM cliente;',
//     (error, result, fields) => {
//         if(error){ return res.status(500).send({error: error})}
//         const response = {
//             quantidade: result.length,
//             produtos: result(data).map(prod =>{
//                 return {
//                     id_cliente: prod.id_cliente,
//                     nome: prod.nome,
//                     email: prod.email,
//                     email: resultado.email,
//                     telefone: resultado.telefone,
//                     cidade: resultado.cidade,
//                     regras: resultado.regras,
//                     termos: resultado.termos,
//                     genero: resultado.genero
//                 }
//             })
//         }
//         return res.status(200).send(response.json());
//     }
// );

// conn.query("select * from cliente", (error, results, fields) => {
//   if(error) { return res.status(500).send({error: error}); }
//   const response = results.map(resultado => {
//        return {
//         nome: resultado.nome,
//         email: resultado.email,
//         telefone: resultado.telefone,
//         cidade: resultado.cidade,
//         regras: resultado.regras,
//         termos: resultado.termos,
//         genero: resultado.genero
//     }
//   })
//   return res.status(200).send(response);
//   // })
// })
// };

// const getClienteById = async (req, res) => {
//   const response = await pool.query(
//     "select * from cliente where id_cliente = $1",
//     [req.params.id_cliente]
//   );

//   res.json(response.rows);
//   // res.send('Cliente ID ' + req.params.id_cliente);
// };

const postClientes = async (req, res) => {
  const { nome, email, telefone, cidade, regras, termos, genero } = req.body;
  const response = await pool.query(
    "insert into cliente (nome, email, telefone, cidade, regras, termos, genero ) values ( $1, $2, $3, $4, $5, $6, $7) RETURNING id_cliente;",
    [nome, email, telefone, cidade, regras, termos, genero]
  );
  const id_cliente = response.rows[0].id_cliente;

  const token = jwt.sign({ id_cliente: id_cliente }, process.env.SECRET_KEY, {
    expiresIn: 300,
  });

  res.json({
    mensagem: "Cliente Cadastrado com sucesso",
    auth: { auth: true, token: token },
    cliente: {
      id_cliente,
      nome,
      email,
      telefone,
      cidade,
      regras,
      termos,
      genero,
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
  getClientes,
  postClientes,
  // getClienteById,
  // deleteCliente,
  // loginCliente,
};
