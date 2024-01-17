const db = require("../models");
const config = require("../config/auth.config");
const { Op } = require('sequelize');
const { Query } = require("pg");
const User = db.user;
const Follower = db.follower;

exports.getUsers = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pagination?.pageSize) || 10;
    const currentPage = parseInt(req.query.pagination?.current) || 1;

    const offset = (currentPage - 1) * pageSize;
    const key = req.body.key;
    const value = req.body.value;

    let query = {
      limit: pageSize,
      offset: offset
    }

    if (key !== undefined || value === "") {
      query = {
        ...query,
        where: {
          [key]: {
            [Op.iLike]: `%${value}%`
          }
        }
      }
    }

    let follower = `SELECT
      *
      FROM
        users
      LEFT JOIN
        followers
        ON
        users."id" = followers."followerId"`;

    let following = `SELECT
        *
      FROM
        users
      LEFT JOIN
        followers
      ON 
    		users."id" = followers."followingId"`;

    const follows = await db.sequelize.query(follower)
    // console.log(follows)
    const results = await User.findAndCountAll({
      ...query,
      // include: [{ model: Follower, as: 'follow' }]
      // include: [Follower]
    });

    const totalPages = Math.ceil(results.count / pageSize);

    res.json({
      results: { users: results.rows, follows: follows },
      pagination: {
        total: results.count,
        pageSize: pageSize,
        current: currentPage,
        totalPages: totalPages,
      },
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      // If the user is found, send the user data in the response
      res.status(200).json({ user });
    } else {
      // If the user is not found, send a 404 status with an error message
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const [updatedRowCount, users] = await User.update(updatedData, {
      where: {
        id: userId,
      },
      returning: true, // Include the updated records in the result
    });

    if (updatedRowCount > 0) {
      console.log(`User with id ${userId} updated successfully.`);
      console.log('Updated Users:', users[0].toJSON());
      res.json({ user: users[0].toJSON() });
    } else {
      console.log(`User with id ${userId} not found.`);
      res.json({ error: `User with id ${userId} not found.` });
    }

  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Handle or propagate the error as needed
  }
};

exports.follow = async (req, res) => {
  const payload = req.body;
  const connect = payload.connect;
  delete payload['connect'];

  let following = `SELECT
        *
      FROM
        users
      LEFT JOIN
        followers
      ON 
    		users."id" = followers."followerId"`;
  try {
    let follows = await Follower.create({
      followerId: payload.followerId,
      followingId: payload.followingId
    });
    if (follows) {
      follows = await db.sequelize.query(following);
      console.log(connect, payload.followerId)
      const [updatedRowCount, users] = await User.update({
        connect: parseInt(connect + 1)
      }, {
        where: {
          id: payload.followerId,
        },
        returning: true, // Include the updated records in the result
      });
      console.log('created follower', users);
      res.json({ follows: follows });
    } else {
      console.log(`Follow is not created.`);
      res.json({ error: `Follow is not created.` });
    }

  } catch (error) {
    console.error('Error creating follow:', error);
    throw error; // Handle or propagate the error as needed
  }
};
