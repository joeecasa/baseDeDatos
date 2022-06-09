module.exports = (sequelize, dataTypes) => {
    const alias = "Movie",//// el alias es el nombre del modelo y se crea en singular y mayuscula
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
            title: {
                type: dataTypes.STRING(500),
                allowNull: false
            },
            rating: {
                type: dataTypes.DECIMAL(3,1),
                allowNull: false,

            },
            awards: {
                type: dataTypes.INTEGER,
                allowNull: false,
                defaultValue : 0
            },
            release_date: {
                type: dataTypes.DATE,
                allowNull: false
            },
            length: {
                type: dataTypes.INTEGER,
                allowNull: true
            },
            genre_id: {
                type: dataTypes.INTEGER,
                allowNull: true
            },
        }
        let config = {
            timestamps : true,
            underscored : true // tiraba error entonces pusimos estas dos cosas en config
                
        }

const Movie = sequelize.define(alias,cols,config)

    return Movie;
}