const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');
const donorRoutes = require('./routes/donorRoutes');
const recipientRoutes = require('./routes/recipientRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve routes
app.use('/api/donor', donorRoutes);
app.use('/api/recipient', recipientRoutes);

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'claude.html'));
});

// Neo4j driver setup
const driver = neo4j.driver(
  'bolt://localhost:7687', // Neo4j connection URL
  neo4j.auth.basic('neo4j', 'organdonation') // Replace with your Neo4j credentials
);

const session = driver.session();

app.get('/test', (req, res) => {
  res.send('Organdonation Backend is working!');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { session };
