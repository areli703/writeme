const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Generated_textsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const generated_texts = await db.generated_texts.create(
      {
        id: data.id || undefined,

        prompt: data.prompt || null,
        generated_text: data.generated_text || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await generated_texts.setUser(data.user || null, {
      transaction,
    });

    await generated_texts.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return generated_texts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const generated_textsData = data.map((item, index) => ({
      id: item.id || undefined,

      prompt: item.prompt || null,
      generated_text: item.generated_text || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const generated_texts = await db.generated_texts.bulkCreate(
      generated_textsData,
      { transaction },
    );

    // For each item created, replace relation files

    return generated_texts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const generated_texts = await db.generated_texts.findByPk(
      id,
      {},
      { transaction },
    );

    await generated_texts.update(
      {
        prompt: data.prompt || null,
        generated_text: data.generated_text || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await generated_texts.setUser(data.user || null, {
      transaction,
    });

    await generated_texts.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return generated_texts;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const generated_texts = await db.generated_texts.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of generated_texts) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of generated_texts) {
        await record.destroy({ transaction });
      }
    });

    return generated_texts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const generated_texts = await db.generated_texts.findByPk(id, options);

    await generated_texts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await generated_texts.destroy({
      transaction,
    });

    return generated_texts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const generated_texts = await db.generated_texts.findOne(
      { where },
      { transaction },
    );

    if (!generated_texts) {
      return generated_texts;
    }

    const output = generated_texts.get({ plain: true });

    output.user = await generated_texts.getUser({
      transaction,
    });

    output.organization = await generated_texts.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.prompt) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('generated_texts', 'prompt', filter.prompt),
        };
      }

      if (filter.generated_text) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'generated_texts',
            'generated_text',
            filter.generated_text,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.generated_texts.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.generated_texts.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('generated_texts', 'prompt', query),
        ],
      };
    }

    const records = await db.generated_texts.findAll({
      attributes: ['id', 'prompt'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['prompt', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.prompt,
    }));
  }
};
