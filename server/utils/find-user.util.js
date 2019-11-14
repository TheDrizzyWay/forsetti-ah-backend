import db from '../models';

const { User } = db;

/**
   * find user function
   * @param {Object} whereClause
   * @returns {Object} user object
   */
const findUser = async (whereClause) => {
  const user = await User.findOne({
    where: whereClause
  });
  return user;
};

export default findUser;
