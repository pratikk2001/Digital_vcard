
const tempaltesModel = require('./templates.model');

class templatesController {

    async getAllTemplates(req, res) {
        try {
        const templates = await tempaltesModel.find();
        res.status(200).json({massaage:"templates fetch Successfully ", status_code:200,  data:templates});
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    async createTemplate(req, res) {
        try {
        const newTemplate = await tempaltesModel.create(req.body);
        res.status(201).json({massaage:"Template Created Successfully", status_code:201, data:newTemplate});
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    async getTemplateById(req, res) {
        try {
        const template = await tempaltesModel.findById(req.params.id);
        res.status(200).json({massaage:"Template fetch Successfully", status_code:200, data:template});
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    async updateTemplate(req, res) {
        try {
        const updatedTemplate = await tempaltesModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({massaage:"Template Updated Successfully", status_code:200, data:updatedTemplate});
        } catch (error) {   
        res.status(500).json({ error: error.message });
        }
    }

    async deleteTemplate(req, res) {
        try {
        await tempaltesModel.findByIdAndDelete(req.params.id);  
        res.status(200).json({massaage:"Template Deleted Successfully", status_code:200});
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new templatesController();