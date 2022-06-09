module.exports = (sequelize, dataTypes) => {
    const alias = "Genre",//// el alias es el nombre del modelo y se crea en singular y mayuscula
        cols = {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            created_at: {
                field:"created_at",// tiraba error entonces le pusimos el campo field
                type: dataTypes.DATE,
                allowNull: true
            },
            updated_at: {
                field:"updated_at",
                type: dataTypes.DATE,
                allowNull: true,
            },
            name: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
            ranking: {
                type: dataTypes.INTEGER,
                allowNull: false,

            },
            active: {
                type: dataTypes.INTEGER,
                allowNull: false,
                defaultValue : 1
            }
        }
        let config = {
            timestamps : true,
            underscored : true // tiraba error entonces pusimos estas dos cosas en config
                
        }

const Genre = sequelize.define(alias,cols,config)

    return Genre;
}