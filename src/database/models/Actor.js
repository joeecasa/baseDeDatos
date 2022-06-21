



module.exports = (sequelize, dataTypes) => {
    const alias = "Actor",//// el alias es el nombre del modelo y se crea en singular y mayuscula
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
            first_name: {
                type: dataTypes.STRING(100),
                allowNull: false
            },
            last_name: {
                type: dataTypes.STRING(100),
                allowNull: false

            },
            rating: {
                type: dataTypes.DECIMAL(3,1),
                allowNull: true,
                defaultValue : 1
            },
            favorite_movie_id : {
                type: dataTypes.INTEGER,
                allowNull: true
                 
            }
        }
        let config = {
            timestamps : true,
            underscored : true // tiraba error entonces pusimos estas dos cosas en config
                
        }

const Actor = sequelize.define(alias,cols,config)

Actor.associate = function(models){
    Actor.belongsToMany(models.Movie,
        {
            as : "peliculas",
            through : "actor_movie",
            foreignKey : "actor_id",
            otherKey : "movie_id",
            timestamps : true
        })
}

    return Actor;
}