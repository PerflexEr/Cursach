const express = require("express");
const router = express.Router();
const { FamilyMember, sequelize } = require("../models/models");
const ApiError = require("../error/ApiError");

class familyMemberController {
  async addFamilyMember(req, res, next) {
    try {
      const { name, age, status } = req.body;

      const newFamilyMember = await FamilyMember.create({
        name,
        age,
        status,
      });

      return res.json(newFamilyMember);
    } catch (error) {
      return next(ApiError.internal("Error adding a family member"));
    }
  }
  
  async getAllFamilyMembers(req, res, next) {
    try {
      const familyMembers = await FamilyMember.findAll();

      return res.json(familyMembers);
    } catch (error) {
      return next(ApiError.internal("Error retrieving family members"));
    }
  }

  async getFamilyMemberById(req, res, next) {
    const { id } = req.params;
    try {
      const familyMember = await FamilyMember.findByPk(id);
      return res.json(familyMember);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении члена семьи по ID"));
    }
  }

  async deleteFamilyMemberById(req, res, next) {
    const { id } = req.params;
    try {
      const deleteFamilyMember = await FamilyMember.destroy({ where: { id } });
      return res.json(deleteFamilyMember);
    } catch (error) {
      return next(ApiError.internal("Ошибка при удалении члена семьи"));
    }
  }
}
module.exports = new familyMemberController();
