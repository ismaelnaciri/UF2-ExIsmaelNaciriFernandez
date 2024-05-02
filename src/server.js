const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require("cors");

app.use(cors(), express.json());

port = 3080;

app.listen(port, () => {
  console.log(`Port::${port}`);
});

//----------------------- CONNECTORS

//connexio a BBDD
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'isma',
  password: 'patata1234',
  database: 'universitat',
  port: 3308
})

//connectar-se
connection.connect((err) => {
  if (err) throw err;
  console.log("Connectat a MySQL")
});


app.get("/llistaAssigNaciriFernandez", async (req, res) => {

  connection.query('SELECT assig_codi, assig_nom\n' +
    'FROM professor, departament, assignatures_professor, assignatures\n' +
    'WHERE assig_codi=assigprof_assig_codi\n' +
    'AND prof_dni=assigprof_prof_dni\n' +
    'AND prof_dept_codi=dept_codi\n' +
    'AND dept_nom=\'INFORMATICA I MATEMATICA APLICADA\'\n' +
    'GROUP BY assig_codi, assig_nom', (err, rows) => {
    if (err) throw err;
    console.log("info: ", rows);
    connection.end();
    res.json(rows);
  });
});


app.put("/vergeNaciriFernandez", async (req, res) => {
  if (req.body) {
    connection.execute(`ALTER TABLE alumnes ADD ALUMN_VIRGEN INTEGER DEFAULT ${req.body.value}`,
      (error, rows) => {
        if (error) {
          console.log("Ave María, ¿cuándo serás mía?");
          res.send({
            code: 500,
            message: "Ave María, ¿cuándo serás mía?",
            error: error
          })
        } else
          res.status(200).send({
            code: 200,
            message: "added column correctly!",
            data: rows
          })
      })
  }
});


//-----------------------------ORM
const {crearConfigBD} = require('./db.config.js');
const db = crearConfigBD();

let initModels = require("./models/init-models");
let models = initModels(db);


app.get("/naiDe10NaciriFernandez", async (req, res) => {
  const matr_alum_dnii = await models.matricula.findOne({
    attributes:
      ['MATR_ALUM_DNI'], where: {MATR_NOTA: 10}
  }).then((h) => {
    return h.MATR_ALUM_DNI;
  })
  const p = await models.alumnes.findAll({
    where:
      {ALUMN_DNI: matr_alum_dnii}
  });
  res.send(p)
  console.log(p);
});


app.post("/nouDeptNaciriFernandez", async (req, res) => {
  if (req.body) {
    const attr = {
      DEPT_CODI: req.body.dept_codi,
      DEPT_NOM: req.body.dept_nom,
      DEPT_UBICACIO: req.body.dept_ubicacio,
      DEPT_TELEFON: req.body.dept_telefon,
      DEPT_PROF_DNI: req.body.dept_prof_dni
    }
    const nouDept = await models.departament.create(attr).catch((error) => {
      console.log("")
      res.status(500).send({
        code: 500,
        message: error
      });
    })

    res.status(200).send({
      code: 200,
      message: "Everything went right",
      dataAdded: nouDept
    });
  }
});
