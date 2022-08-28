const validTypes=['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fee']//Nous definissons les types qui doivent etre envoyer aucun type n'appartenant pas a ces sont regeter avec erreur
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:`le pokemon existe deja`
        },
        validate:{
          notEmpty:{msg:'le champs nom ne doit pas etre vide'},
          notNull:{msg:'le chams nom est une propriete requise'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:'seulement les nombres entiers sont autorises'},
          min:{
            args:[0],
            msg:'la valeur du vie doit etre superieur ou egale a 0'
          },
          max:{
            args:[999],
            msg:'la valeur du vie doit etre inferieur ou egale a 999'
          },
          notNull:{msg:'les points de vie sont une propriete requise'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:'seulement les nombres entiers sont autorises'},
          min:{
            args:[0],
            msg:'la valeur du degrer du pokemon doit etre superieur ou egale a 0'
          },
          max:{
            args:[99],
            msg:'la valeur du degrer du pokemon doit etre inferieur ou egale a 99'
          },
          notNull:{msg:'les points de degres sont une propriete requise'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg:'image doit avoir un url valide'},
          notNull:{msg:'image du pokemon est une propriete requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        set(types){
          this.setDataValue('types',types.join())
        },
        get(){
          return this.getDataValue('types').split(',')
        },
        validate:{
          isTypeVlaide(value){//isTypeValide est une fonction que nous avons creer nous mm car il n'est pas natif au sequlaize on appel ce type de validator validator personnaliser
            if(!value){
              throw new Error('Un pokemon doit avoir au moins un type');
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokemon ne doit pas avoir plus de 3 types')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d'un pokemon doit appartenir dans ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }