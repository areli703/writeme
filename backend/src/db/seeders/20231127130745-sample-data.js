const db = require('../models');
const Users = db.users;

const GeneratedImages = db.generated_images;

const GeneratedTexts = db.generated_texts;

const Organizations = db.organizations;

const Organization = db.organization;

const GeneratedImagesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Generate an image of a futuristic city.',

    image_url: 'https://example.com/images/futuristic_city.jpg',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Create an image of a new gadget.',

    image_url: 'https://example.com/images/new_gadget.jpg',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Generate an image of a tech conference.',

    image_url: 'https://example.com/images/tech_conference.jpg',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Create an image of a startup team.',

    image_url: 'https://example.com/images/startup_team.jpg',
  },
];

const GeneratedTextsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Write a blog post about AI.',

    generated_text: 'Artificial Intelligence (AI) is transforming the world...',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Generate a product description for a new gadget.',

    generated_text: 'Introducing the latest in tech innovation...',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Create a social media post for a new app.',

    generated_text: 'Check out our new app that revolutionizes...',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    prompt: 'Write a press release for a startup.',

    generated_text: 'We are excited to announce the launch of our startup...',
  },
];

const OrganizationsData = [
  {
    name: 'Tech Innovators',
  },

  {
    name: 'Creative Solutions',
  },

  {
    name: 'AI Pioneers',
  },

  {
    name: 'Future Tech',
  },
];

const OrganizationData = [
  {
    name: 'Dmitri Mendeleev',
  },

  {
    name: 'John von Neumann',
  },

  {
    name: 'Ernst Haeckel',
  },

  {
    name: 'Werner Heisenberg',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }
}

async function associateGeneratedImageWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedImage0 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (GeneratedImage0?.setUser) {
    await GeneratedImage0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedImage1 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (GeneratedImage1?.setUser) {
    await GeneratedImage1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedImage2 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (GeneratedImage2?.setUser) {
    await GeneratedImage2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedImage3 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (GeneratedImage3?.setUser) {
    await GeneratedImage3.setUser(relatedUser3);
  }
}

async function associateGeneratedImageWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedImage0 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (GeneratedImage0?.setOrganization) {
    await GeneratedImage0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedImage1 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (GeneratedImage1?.setOrganization) {
    await GeneratedImage1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedImage2 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (GeneratedImage2?.setOrganization) {
    await GeneratedImage2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedImage3 = await GeneratedImages.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (GeneratedImage3?.setOrganization) {
    await GeneratedImage3.setOrganization(relatedOrganization3);
  }
}

async function associateGeneratedTextWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedText0 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (GeneratedText0?.setUser) {
    await GeneratedText0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedText1 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (GeneratedText1?.setUser) {
    await GeneratedText1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedText2 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (GeneratedText2?.setUser) {
    await GeneratedText2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const GeneratedText3 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (GeneratedText3?.setUser) {
    await GeneratedText3.setUser(relatedUser3);
  }
}

async function associateGeneratedTextWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedText0 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (GeneratedText0?.setOrganization) {
    await GeneratedText0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedText1 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (GeneratedText1?.setOrganization) {
    await GeneratedText1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedText2 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (GeneratedText2?.setOrganization) {
    await GeneratedText2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneratedText3 = await GeneratedTexts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (GeneratedText3?.setOrganization) {
    await GeneratedText3.setOrganization(relatedOrganization3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await GeneratedImages.bulkCreate(GeneratedImagesData);

    await GeneratedTexts.bulkCreate(GeneratedTextsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Organization.bulkCreate(OrganizationData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateGeneratedImageWithUser(),

      await associateGeneratedImageWithOrganization(),

      await associateGeneratedTextWithUser(),

      await associateGeneratedTextWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('generated_images', null, {});

    await queryInterface.bulkDelete('generated_texts', null, {});

    await queryInterface.bulkDelete('organizations', null, {});

    await queryInterface.bulkDelete('organization', null, {});
  },
};
