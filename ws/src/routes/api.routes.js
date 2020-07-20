const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const crud = require('../util/crud');
const util = require('../util/util');

/* QUANTO PRECISA CRIAR UM ITEM APENAS */
router.post('/create', async (req, res) => {
  try {
    const results = await crud.create({
      TableName: 'TEST_Posts',
      Item: {
        Id: '19238912839123',
        Title: 'Filme 2',
        Active: true,
        Year: 2020,
        Actors: ['Silvio', 'Mikael'],
        Owner: {
          Name: 'Warner',
          Active: true,
        },
      },
    });

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

/* QUANTO PRECISA RECUPERAR UM ITEM APENAS */
router.get('/:id', async (req, res) => {
  try {
    const item = await crud.get({
      TableName: 'TEST_Posts',
      Key: {
        Id: req.params.id,
      },
    });

    res.json({ error: false, item: item.Item });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

/* QUANTO PRECISA FAZER LEITURA DE VÁRIOS ITENS */
router.post('/scan', async (req, res) => {
  try {
    const results = await crud.scan({
      TableName: 'TEST_Posts',
      /*FilterExpression: "Active = :active",
			ExpressionAttributeValues: {
				":active": req.body.active,
			},*/
    });

    res.json(results);
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

/* QUANTO PRECISA ATUALIZAR UM OU VÁRIOS ÍTENS */
router.put('/:id', async (req, res) => {
  try {
    const updated = await crud.update({
      TableName: 'TEST_Posts',
      ReturnValues: 'UPDATED_NEW',
      Key: {
        Id: req.params.id,
      },
      UpdateExpression: 'set Title = :title, Active = :active',
      ExpressionAttributeValues: {
        ':title': req.body.title,
        ':active': req.body.active,
      },
    });

    res.json({ error: false, item: updated });
  } catch (err) {
    res.json({ error: false, message: err.message });
  }
});

/* QUANTO PRECISA DELETAR UM OU VÁRIOS ÍTENS */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await crud.delete({
      TableName: 'TEST_Posts',
      Key: {
        Id: req.params.id,
      },
      /*ConditionExpression: "Owner.Active = :ownerActive",
			ExpressionAttributeValues: {
				":ownerActive": req.body.ownerActive,
			},*/
    });

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

/* UPLOAD */
router.post('/upload', async (req, res) => {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('finish', async function () {
    try {
      // ARQUIVOS: req.files
      // DADOS: req.body

      /////////// INICIO DO UPLOAD EM SÍ /////////
      let extDoc = req.files.arquivo.name.split('.'); //[nome, ext]
      extDoc = extDoc[extDoc.length - 1]; //png, jpg, pdf
      const imageName = `miakel_test.${extDoc}`;

      let responseDoc = await util.uploadToS3(
        req.files.arquivo, // ARQUIVO EM SI
        imageName // NOME PARA SALVAR O ARQUIVO
      );

      if (responseDoc.error) {
        res.json({ error: true, message: responseDoc.message });
        return false;
      }
      /////////// FINAL DO UPLOAD EM SÍ /////////

      // DEPOIS DO UPLOAD
      // SALVAR NO BANCO imageName
      /*{
			pergunta_1_nome: req.body.pergunta_1,
			pergunta_1_image: keys.bucket_url + '/' + imageName
		}*/

      res.json({ error: false, message: 'Upload concluido com sucesso' });
    } catch (err) {
      res.json({ error: false, message: err.message });
    }
  });
  req.pipe(busboy);
});

module.exports = router;
