const path = require('path');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

// Adjust to match your Sequelize config
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'your_user',
  password: 'your_password',
  database: 'your_db_name',
  logging: false,
});

const modelsDir = path.join(__dirname, 'models');

// Recursively load models, including subfolders
function loadModels(dir) {
  const models = {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      Object.assign(models, loadModels(fullPath));
        } else if (entry.name.endsWith('.js')) {
            try {
                const imported = require(fullPath);
                const model = typeof imported === 'function'
                ? imported(sequelize, DataTypes)
                : imported;

                models[model.name] = model;
            } catch (err) {
                console.error(`❌ Failed to load model at ${fullPath}:`, err.message);
            }
        }
  }

  return models;
}

// Load and initialize models
const models = loadModels(modelsDir);

// Setup associations (if defined)
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

(async () => {
  console.log('🔍 Inspecting Sequelize Models:\n');
            for (const [modelName, model] of Object.entries(models)) {
            if (!model || !model.rawAttributes) {
                console.warn(`⚠️ Skipping invalid or unloaded model: ${modelName}`);
                continue;
            }

            console.log(`📦 Model: ${modelName}`);
            console.log('Fields:');
            for (const field in model.rawAttributes) {
                const attr = model.rawAttributes[field];
                console.log(` - ${field}: ${attr.type?.key || 'Unknown'}`);
            }

            if (model.associations && Object.keys(model.associations).length > 0) {
                console.log('Associations:');
                for (const assoc of Object.keys(model.associations)) {
                const assocType = model.associations[assoc].associationType;
                const target = model.associations[assoc].target.name;
                console.log(` - ${assocType} → ${target}`);
                }
            }
    console.log('---\n');
  }

  await sequelize.close();
})();
