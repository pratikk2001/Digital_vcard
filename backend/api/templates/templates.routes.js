const express = require('express');
const router = express.Router();
const TemplateController = require('./templates.controller');


router.post("/create", TemplateController.createTemplate);
router.get("getAll", TemplateController.getTemplates);
router.get("getById/:id", TemplateController.getTemplateById);
router.put("update/:id", TemplateController.updateTemplate);
router.delete("delete/:id", TemplateController.deleteTemplate);

module.exports = router;