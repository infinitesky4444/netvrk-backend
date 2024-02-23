
const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const apiController = require('../controllers/apiController')

//------------ Api Route ------------//
router.get('/getapi', (req, res) => res.render('getapi'));

//------------ Api POST Handle ------------//
router.post('/getapi', apiController.apihandle);

//------------ PlayerCount Route ------------//
router.get('/playercount', (req, res) => res.render('playerCount'));

//------------ PlayerCount POST Handle ------------//
router.post('/playercount', apiController.playerhandle);

//------------ Tier Route ------------//
router.get('/tier', (req, res) => res.render('tier'));

//------------ Tier POST Handle ------------//
router.post('/tier', apiController.playerTierHandler);

//------------ Interactions Route ------------//
router.get('/interactions', (req, res) => res.render('interactions'));

//------------ Interaction POST Handle ------------//
router.post('/interactions', apiController.interactionsHandler);

//------------ Update Interaction POST Handle ------------//
router.post('/updateInteractions', apiController.updateInteractionsHandler);

//------------ updateDB POST Handle ------------//
router.post('/updateDB', apiController.updateSchema);

module.exports = router;