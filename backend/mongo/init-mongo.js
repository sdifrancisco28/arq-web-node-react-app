db = db.getSiblingDB('NodeAppDB');
db.createUser({
  user: "dbMongoUser",
  pwd: "LwPgCa8Cc8JD81x1u",
  roles: [{ role: 'readWrite', db: 'NodeAppDB' }]
});