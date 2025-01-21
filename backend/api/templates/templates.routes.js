const express = require('express');
const router = express.Router();
const themeController = require('./templates.controller');


// Get all themes
router.get('/getAll', themeController.getAllTemplates);

// // Get a theme by ID
router.get('/getById/:id', themeController.getTemplateById);

// Create a new theme
router.post('/create', themeController.createTemplate);

//  Update a theme
router.put('/update/:id', themeController.updateTemplate);

//  Delete a theme
router.delete('/delete/:id', themeController.deleteTemplate);

module.exports = router;