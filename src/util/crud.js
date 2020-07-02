const AWS = require("aws-sdk");

AWS.config.update({
	region: "us-east-1",
	endpoint: "http://dynamodb.us-east-1.amazonaws.com",
	accessKeyId: "AKIAS3VS222HKIX27DH2",
	secretAccessKey: "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",
});

const crud = {
	onScan: (err, data) => {
		if (err) {
			return err;
		} else {
			return data;
		}
	},
	scan: (params) => {
		return new Promise((resolveAll, reject) => {
			try {
				var db = new AWS.DynamoDB.DocumentClient();
				let promises = [];
				let datas = [];

				let onScan = (err, data) => {
					promises.push(
						new Promise((resolve, reject) => {
							if (err) {
								reject();
							} else {
								data.Items.map((r) => {
									datas.push(r);
								});

								if (
									typeof data.LastEvaluatedKey != "undefined"
								) {
									params.ExclusiveStartKey =
										data.LastEvaluatedKey;
									db.scan(params, onScan);
									resolve();
								} else {
									resolveAll(datas);
								}
							}
						})
					);
				};
				db.scan(params, onScan);
			} catch (err) {
				console.log(err);
				reject(err);
			}
		});
	},
	delete: (params) => {
		var db = new AWS.DynamoDB.DocumentClient();
		return db.delete(params).promise();
	},
	update: (params) => {
		var db = new AWS.DynamoDB.DocumentClient();
		return db.update(params).promise();
	},
	create: (params) => {
		var db = new AWS.DynamoDB.DocumentClient();
		return db.put(params).promise();
	},
	get: (params) => {
		var db = new AWS.DynamoDB.DocumentClient();
		return db.get(params).promise();
	},
};

module.exports = crud;
