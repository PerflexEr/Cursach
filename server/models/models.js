const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Medicine = sequelize.define("Medicine", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  expiration_date: { type: DataTypes.DATE },
  cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});


const Purchase = sequelize.define("Purchase", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_of_purchase: { type: DataTypes.DATE },
  FamilyMemberId: { type: DataTypes.INTEGER }, 
});

const PurchaseMedicine = sequelize.define("PurchaseMedicine", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

const FamilyMember = sequelize.define("FamilyMember", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true },
});

const MedicineUsage = sequelize.define("MedicineUsage", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pills_used: { type: DataTypes.INTEGER, allowNull: false },
  result: { type: DataTypes.STRING },
  comments: { type: DataTypes.TEXT },
});

const IllnessPrescription = sequelize.define("IllnessPrescription", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  diagnosis: { type: DataTypes.STRING, allowNull: false },
  reason_for_medications: { type: DataTypes.TEXT },
  period_of_illness: { type: DataTypes.DATE },
  medications: { type: DataTypes.TEXT },
  prescribed_by: { type: DataTypes.STRING, allowNull: false },
  amount_of_prescriptions: { type: DataTypes.INTEGER, allowNull: false },
  note: { type: DataTypes.TEXT },
});


Medicine.belongsToMany(Purchase, { through: PurchaseMedicine });
Purchase.belongsToMany(Medicine, { through: PurchaseMedicine });

FamilyMember.hasMany(Purchase);
Purchase.belongsTo(FamilyMember);

Purchase.hasOne(MedicineUsage);
MedicineUsage.belongsTo(Purchase);

FamilyMember.hasMany(IllnessPrescription);
IllnessPrescription.belongsTo(FamilyMember);

module.exports = {
  User,
  FamilyMember,
  Medicine,
  Purchase,
  PurchaseMedicine,
  MedicineUsage,
  IllnessPrescription,
};
