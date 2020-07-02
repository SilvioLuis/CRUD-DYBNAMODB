const express = require("express");
const router = express.Router();

const crud = require("../util/crud");

/* QUANTO PRECISA CRIAR UM ITEM APENAS */
router.post("/create", async (req, res) => {
	try {
		const results = await crud.create({
			TableName: "TEST_Posts",
			Item: {
				Id: "19238912839123",
				Title: "Filme 2",
				Active: true,
				Year: 2020,
				Actors: ["Silvio", "Mikael"],
				Owner: {
					Name: "Warner",
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
router.get("/:id", async (req, res) => {
	try {
		const item = await crud.get({
			TableName: "TEST_Posts",
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
router.post("/scan", async (req, res) => {
	try {
		const results = await crud.scan({
			TableName: "TEST_Posts",
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
router.put("/:id", async (req, res) => {
	try {
		const updated = await crud.update({
			TableName: "TEST_Posts",
			ReturnValues: "UPDATED_NEW",
			Key: {
				Id: req.params.id,
			},
			UpdateExpression: "set Title = :title, Active = :active",
			ExpressionAttributeValues: {
				":title": req.body.title,
				":active": req.body.active,
			},
		});

		res.json({ error: false, item: updated });
	} catch (err) {
		res.json({ error: false, message: err.message });
	}
});

/* QUANTO PRECISA DELETAR UM OU VÁRIOS ÍTENS */
router.delete("/:id", async (req, res) => {
	try {
		const deleted = await crud.delete({
			TableName: "TEST_Posts",
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

module.exports = router;
