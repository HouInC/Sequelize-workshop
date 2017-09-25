const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('Page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            // allowNull: false,
            isUrl: true
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    getterMethods:   {
        getRoute() {
            return '/wiki/' + this.urlTitle; // `/wiki/${this.urlTitle}`
        }
    },
    hooks:{
        beforeCreate()
    }
})



const User = db.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            // allowNull: false,
            isEmail: true
        }
    }
})

module.exports = {
    db: db,
    Page: Page,
    User: User
}

