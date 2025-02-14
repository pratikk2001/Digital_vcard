// controllers/TemplateController.js
const Template = require("../models/Template");

class TemplateController {
  async createTemplate(req, res) {
    try {
      const template = new Template(req.body);
      await template.save();
      res.status(201).json({ message: "Template created successfully", status_code: 201, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTemplates(req, res) {
    try {
      const templates = await Template.find();
      res.status(200).json({ message: "Templates fetched successfully", status_code: 200, data: templates });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTemplateById(req, res) {
    try {
      const template = await Template.findById(req.params.id);
      if (!template) return res.status(404).json({ message: "Template not found", status_code: 404 });
      res.status(200).json({ message: "Template fetched successfully", status_code: 200, data: template });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTemplate(req, res) {
    try {
      const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ message: "Template updated successfully", status_code: 200, data: updatedTemplate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTemplate(req, res) {
    try {
      await Template.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Template deleted successfully", status_code: 200 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TemplateController();
