const express = require('express');
const connection = require('./config');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.post('/projets', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO projets SET ?', formData, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.status(201).json(formData);
    }
  });
});

app.delete('/projets/:id', (req, res) => {
  const projetsId = req.params.id;

  connection.query('DELETE FROM projets WHERE id = ?', [projetsId], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('😱 Error deleting an projets');
    } else {
      res.status(200).send('🎉 projets deleted!');
    }
  });
});

app.put('/projets/:id', (req, res) => {
  // We get the ID from the url:
  const projetsId = req.params.id;

  // We get the data from the req.body
  const newProjets = req.body;

  // We send a UPDATE query to the DB
  connection.query(
    'UPDATE projets SET ? WHERE id = ?',
    [newProjets, projetsId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a projets');
      } else {
        return connection.query(
          'SELECT * FROM projets WHERE id = ?',
          [projetsId],
          (err2, records) => {
            if (err) {
              res.status(500).send(err.message);
            }
            res.status(200).json(records[0]);
          }
        );
      }
    }
  );
});

app.get('/projets/:id', (req, res) => {
  const projetsId = req.params.id;

  connection.query(
    'SELECT * FROM projets WHERE id = ?',
    [projetsId],
    (err, results) => {
      if (err) {
        return res.status(500).send(`Error retrieving data`);
      }
      if (results.length === 0) {
        return res.status(404).send('projetss not found');
      }
      return res.json(results[0]);
    }
  );
});

app.get('/projets', (req, res) => {
  const projets = req.body;
  connection.query('SELECT * FROM projets', [projets], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred to display all projects');
    } else {
      console.log('results', results);
      res.status(200).json(results);
    }
  });
});

app.post('/admin/projets', (req, res) => {
  const {
    Name,
    Logo,
    Client_Description,
    Projet_Description,
    Methode,
    Details_Client,
    Lien_Client,
    Techno_id,
    Client_name,
    screen1,
    screen2,
    screen3,
    screen4,
    date,
    projet_context,
  } = req.body;
  connection.query(
    'INSERT INTO projets (Name, Logo, Client_Description, Projet_Description, Methode, Details_Client, Lien_Client, Techno_id, Client_name, screen1, screen2, screen3, screen4, date, projet_context) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      Name,
      Logo,
      Client_Description,
      Projet_Description,
      Methode,
      Details_Client,
      Lien_Client,
      Techno_id,
      Client_name,
      screen1,
      screen2,
      screen3,
      screen4,
      date,
      projet_context,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred to add a new project');
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.delete('/admin/projets/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE from projets WHERE id = ?', [id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un Projets");
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/Techno', (req, res) => {
  connection.query('SELECT * FROM Techno', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred to display all Techno');
    } else {
      console.log('results', results);
      res.status(200).json(results);
    }
  });
});

app.listen(5000, () => console.log('server listening on port 5000'));
