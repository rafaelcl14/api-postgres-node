const { Router } = require("express");
const router = Router();

const {
  getClientes,
  postClientes,
  getClienteById,
  deleteCliente,
} = require("../controller/cliente-controller");

const {
  getPesquisa,
  postPesquisa,
} = require("../controller/pesquisa-controller");

router.get("/clientes", getClientes);
router.post("/clientes", postClientes);
router.get("/clientes/:id_cliente", getClienteById);
router.delete("/clientes/:id_cliente", deleteCliente);

router.get("/pesquisa", getPesquisa);
router.post("/pesquisa", postPesquisa);

module.exports = router;
