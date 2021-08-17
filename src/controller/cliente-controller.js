const pool = require("../database/conexao");
const jwt = require('jsonwebtoken');
const SECRET = 'segredo'
const getClientes = async (req, res) => {
  console.log(req.id_cliente + 'Deu certo corno');
  const response = await pool.query("select * from cliente");
  res.status(200).json(response.rows);
  
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

};

const getClienteById = async (req, res) => {
  const response = await pool.query(
    "select * from cliente where id_cliente = $1",
    [req.params.id_cliente]
  );

  
  res.json(response.rows);
  // res.send('Cliente ID ' + req.params.id_cliente);
};

const loginCliente = async (req, res) => {
  
  pool.connect((error, conn) => {
    if(error){ return res.status(500).send({error: error})};
        const query = 'SELECT * FROM cliente WHERE email = ?';
        console.log('passou 0');
        conn.query(
            query,
            [req.body.email],
            (error, results, fields) => {
                console.log('passou 1');
                conn.release();
                if(error){ return res.status(500).send({error: error})};
                console.log('passou 2');
                if(results  < 1){
                  console.log('passou 3');
                    return res.status(401).send({
                        mensagem: 'Falha na autenticação'
                    });
                } else {
                  console.log('passou 4');
                  if (results) {
                    console.log('passou 5');
                    const token = jwt.sign({
                        id_cliente: results[0].id_cliente,
                        email: results[0].email,

                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    })
                    console.log('passou 6');
                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso',
                        token: token
                    });
                  }
                console.log('passou 7');
                return res.status(401).send({
                    mensagem: 'Falha na autenticação'
                }); 
                }
            }
        )
  });
  
};

const postClientes = async (req, res) => {
    const { nome, email, telefone, cidade, regras, termos, genero } = req.body;
    const response = await pool.query(
      "insert into cliente (nome, email, telefone, cidade, regras, termos, genero ) values ( $1, $2, $3, $4, $5, $6, $7) RETURNING id_cliente;",
       [nome, email, telefone, cidade, regras, termos, genero]
      );
      const id_cliente = response.rows[0].id_cliente;
      
      const token =  jwt.sign({id_cliente: id_cliente}, SECRET, {expiresIn: 300 })

      res.json({
        mensagem: "Cliente Cadastrado com sucesso",
        auth: { auth: true, token: token},
        cliente: { id_cliente ,nome, email, telefone, cidade, regras, termos, genero },
    
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
  loginCliente,
};
