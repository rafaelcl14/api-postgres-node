const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

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
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error:
          "Você não possui permição para acesso, tente novamete mais tarde",
      });
    }
    req.id_cliente = decoded.id_cliente;
    next();
  });
}

router.post("/cadastro", postClientes);
router.post("/pesquisa", verifyJWT, postPesquisa);
router.get("/clientes", getClientes);

module.exports = router;

// router.post("/login", loginCliente);
// router.get("/clientes/:id_cliente", getClienteById);
// router.delete("/clientes/:id_cliente", deleteCliente);
