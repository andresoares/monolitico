import { SequelizeStorage, Umzug } from "umzug"
import { join } from "path"
import { DataTypes, Sequelize } from "sequelize"

export const migrator = (
  sequelize: Sequelize
) => {
  const umzug = new Umzug({
    migrations: [
      {
        name: '2024.04.19T09.46.22.client-migration',
        async up({context}) {
          await sequelize.getQueryInterface().createTable('client', {
            id: {
              type: DataTypes.STRING(255),
              primaryKey: true,
              allowNull: false
            },
            name: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            email: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            document: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            street: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            number: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            complement: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            city: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            state: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            zipcode: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            createdAt: {
              type: DataTypes.DATE,
              allowNull: true
            },
            updatedAt: {
              type: DataTypes.DATE,
              allowNull: true
            }
          })
        },
        async down({context}) {
          await sequelize.getQueryInterface().dropTable('client');
        },
      },

      {
        name: '2024.04.19T09.04.22.product-migration',
        async up({context}) {
          await sequelize.getQueryInterface().createTable('products', {
            id: {
              type: DataTypes.STRING(255),
              primaryKey: true,
              allowNull: false
            },
            name: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            description: {
              type: DataTypes.STRING(255),
              allowNull: false
            },
            stock: {
              type: DataTypes.NUMBER,
              allowNull: true
            },
            purchasePrice: {
              type: DataTypes.NUMBER,
              allowNull: true
            },
            salePrice: {
              type: DataTypes.NUMBER,
              allowNull: true
            },
            createdAt: {
              type: DataTypes.DATE,
              allowNull: true
            },
            updatedAt: {
              type: DataTypes.DATE,
              allowNull: true
            }
          })
        },
        async down({context}) {
          await sequelize.getQueryInterface().dropTable('products');
        },
      }

    ],
    
    //{
      // glob: [
      //   "*/migrations/*.{js,ts}",
      //   {
      //     cwd: join(__dirname, "../../../"),
      //     ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
      //   },
      // ],
    //},
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });

  return umzug;
}