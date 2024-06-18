const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Generated_imagesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const generated_images = await db.generated_images.create(
      {
        id: data.id || undefined,

        prompt: data.prompt || null,
        image_url: data.image_url || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await generated_images.setUser(data.user || null, {
      transaction,
    });

    await generated_images.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    return generated_images;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const generated_imagesData = data.map((item, index) => ({
      id: item.id || undefined,

      prompt: item.prompt || null,
      image_url: item.image_url || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const generated_images = await db.generated_images.bulkCreate(
      generated_imagesData,
      { transaction },
    );

    // For each item created, replace relation files

    return generated_images;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const generated_images = await db.generated_images.findByPk(
      id,
      {},
      { transaction },
    );

    await generated_images.update(
      {
        prompt: data.prompt || null,
        image_url: data.image_url || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await generated_images.setUser(data.user || null, {
      transaction,
    });

    await generated_images.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return generated_images;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const generated_images = await db.generated_images.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of generated_images) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of generated_images) {
        await record.destroy({ transaction });
      }
    });

    return generated_images;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const generated_images = await db.generated_images.findByPk(id, options);

    await generated_images.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await generated_images.destroy({
      transaction,
    });

    return generated_images;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const generated_images = await db.generated_images.findOne(
      { where },
      { transaction },
    );

    if (!generated_images) {
      return generated_images;
    }

    const output = generated_images.get({ plain: true });

    output.user = await generated_images.getUser({
      transaction,
    });

    output.organization = await generated_images.getOrganization({
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
          [Op.and]: Utils.ilike('generated_images', 'prompt', filter.prompt),
        };
      }

      if (filter.image_url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'generated_images',
            'image_url',
            filter.image_url,
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
          count: await db.generated_images.count({
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
      : await db.generated_images.findAndCountAll({
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
          Utils.ilike('generated_images', 'prompt', query),
        ],
      };
    }

    const records = await db.generated_images.findAll({
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
