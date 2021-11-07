const users = require("../models/users");
const profiles = require('../models/profiles');
const groups = require('../models/groups');
const coders = require('../models/coders');
const relations = require('../models/relations');
const permits = require('../models/permits');

users.hasMany(profiles);
users.hasMany(groups);

profiles.belongsTo(users);
profiles.hasMany(coders);
profiles.hasMany(relations);

groups.belongsTo(users);
groups.hasMany(relations);

coders.belongsTo(profiles);

relations.belongsTo(profiles);
relations.belongsTo(groups);




