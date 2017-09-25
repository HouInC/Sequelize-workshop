const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}


const Page = db.define('Page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
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
}, 
    {
    getterMethods:   {
        getRoute() {
            return '/wiki/' + this.urlTitle; // `/wiki/${this.urlTitle}`
        }
    },
     hooks:{
         beforeValidate(page){
            const urlTitle = generateUrlTitle(page.title);
            page.urlTitle=urlTitle;
         }
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

Page.belongsTo(User, { as: 'author' });

module.exports = {
    db: db,
    Page: Page,
    User: User
}

