const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const SECRET = 'segredo'

const {
  getClientes,
  postClientes,
  getClienteById,
  deleteCliente,
  loginCliente,
} = require("../controller/cliente-controller");

const {
  getPesquisa,
  postPesquisa,
} = require("../controller/pesquisa-controller");

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if(err){ return res.status(401).send({error: err}); }
    req.id_cliente = decoded.id_cliente;
    next();
  })
}

router.get("/clientes", verifyJWT, getClientes);
router.post("/cadastro", postClientes);
router.post("/pesquisa", postPesquisa);

module.exports = router;


// router.post("/login", loginCliente);
// router.get("/clientes/:id_cliente", getClienteById);
// router.delete("/clientes/:id_cliente", deleteCliente);

// router.get("/pesquisa", getPesquisa);