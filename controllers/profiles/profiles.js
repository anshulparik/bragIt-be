const Profile = require("../../models/Profile");
const { createError } = require("../../errors/Error");
const { ACCOUNT_TYPE } = require("../../utils/constant");

const addProfile = async (req, res, next) => {
  try {
    const { userId } = req?.params;
    const {
      followers,
      following,
      followerRequests,
      followingRequests,
      profilePic,
      isPremium,
      user,
      ...otherDetails
    } = req?.body;

    if (!userId) {
      const err = createError(400, "UserId is required!");
      next(err);
      return;
    }

    const foundProfile = await Profile.findOne({ user: userId });
    if (!foundProfile) {
      const err = createError(404, "User doesn't exist!");
      next(err);
      return;
    }

    const upatedProfile = await Profile.findByIdAndUpdate(
      foundProfile?._id,
      { ...otherDetails },
      { new: true }
    );

    res.status(201).send(upatedProfile);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const sendFollowRequest = async (req, res, next) => {
  try {
    const { followerId } = req?.params;
    const { followeeId } = req?.body;

    if (!followerId) {
      const err = createError(400, "FollowerId is required!");
      next(err);
      return;
    }

    if (!followeeId) {
      const err = createError(400, "FolloweeId is required!");
      next(err);
      return;
    }

    if (followerId === followeeId) {
      const err = createError(400, "Bad request!");
      next(err);
      return;
    }

    const followerProfile = await Profile.findOne({ _id: followerId });
    if (!followerProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    const followeeProfile = await Profile.findOne({ _id: followeeId });
    if (!followeeProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    if (followerProfile?.accountType === ACCOUNT_TYPE.PUBLIC) {
      await Profile.findByIdAndUpdate(
        followerProfile?._id,
        {
          followers: [...followerProfile?.followers, followeeId],
        },
        { new: true }
      );

      await Profile.findByIdAndUpdate(
        followeeProfile?._id,
        {
          following: [...followeeProfile?.following, followerId],
        },
        { new: true }
      );

      res
        .status(200)
        .send(`You started following ${followerProfile?.username}`);
      return;
    } else {
      await Profile.findByIdAndUpdate(
        followerProfile?._id,
        {
          followerRequests: [...followerProfile?.followerRequests, followeeId],
        },
        { new: true }
      );

      await Profile.findByIdAndUpdate(
        followeeProfile?._id,
        {
          followingRequests: [
            ...followeeProfile?.followingRequests,
            followerId,
          ],
        },
        { new: true }
      );

      res.status(200).send("Follow request sent successfully!");
      return;
    }
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const sendUnfollowRequest = async (req, res, next) => {
  try {
    const { followerId } = req?.params;
    const { followeeId } = req?.body;

    if (!followerId) {
      const err = createError(400, "FollowerId is required!");
      next(err);
      return;
    }

    if (!followeeId) {
      const err = createError(400, "FolloweeId is required!");
      next(err);
      return;
    }

    if (followerId === followeeId) {
      const err = createError(400, "Bad request!");
      next(err);
      return;
    }

    const followerProfile = await Profile.findOne({ _id: followerId });
    if (!followerProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    const followeeProfile = await Profile.findOne({ _id: followeeId });
    if (!followeeProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    const followeeIndex = followerProfile?.followers?.indexOf(followeeId);
    if (followeeIndex > -1) {
      followerProfile?.followers?.splice(followeeIndex, 1);
    }

    const followerIndex = followeeProfile?.following?.indexOf(followerId);
    if (followerIndex > -1) {
      followeeProfile?.following?.splice(followerIndex, 1);
    }

    await Profile.findByIdAndUpdate(
      followerProfile?._id,
      {
        followers: followerProfile?.followers,
      },
      { new: true }
    );

    await Profile.findByIdAndUpdate(
      followeeProfile?._id,
      {
        following: followeeProfile?.following,
      },
      { new: true }
    );

    res.status(200).send(`You unfollowed ${followerProfile?.username}!`);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const acceptFollowRequest = async (req, res, next) => {
  try {
    const { followerId } = req?.body;
    const { followeeId } = req?.params;

    if (!followerId) {
      const err = createError(400, "FollowerId is required!");
      next(err);
      return;
    }

    if (!followeeId) {
      const err = createError(400, "FolloweeId is required!");
      next(err);
      return;
    }

    if (followerId === followeeId) {
      const err = createError(400, "Bad request!");
      next(err);
      return;
    }

    const followerProfile = await Profile.findOne({ _id: followerId });
    if (!followerProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    const followeeProfile = await Profile.findOne({ _id: followeeId });
    if (!followeeProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    const followeeIndex =
      followerProfile?.followerRequests?.indexOf(followeeId);
    if (followeeIndex > -1) {
      followerProfile?.followerRequests?.splice(followeeIndex, 1);
    }

    const followerIndex =
      followeeProfile?.followingRequests?.indexOf(followerId);
    if (followeeIndex > -1) {
      followeeProfile?.followingRequests?.splice(followerIndex, 1);
    }

    await Profile.findByIdAndUpdate(
      followerProfile?._id,
      {
        followers: [...followerProfile?.followers, followeeId],
        followerRequests: followerProfile?.followerRequests,
      },
      { new: true }
    );

    await Profile.findByIdAndUpdate(
      followeeProfile?._id,
      {
        following: [...followeeProfile?.following, followerId],
        followingRequests: followeeProfile?.followerRequests,
      },
      { new: true }
    );

    res.status(200).send(`${followeeProfile?.username} started following you!`);
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

const cancelFollowRequest = async (req, res, next) => {
  try {
    const { followerId } = req?.body;
    const { followeeId } = req?.params;

    if (!followerId) {
      const err = createError(400, "FollowerId is required!");
      next(err);
      return;
    }

    if (!followeeId) {
      const err = createError(400, "FolloweeId is required!");
      next(err);
      return;
    }

    if (followerId === followeeId) {
      const err = createError(400, "Bad request!");
      next(err);
      return;
    }

    const followerProfile = await Profile.findOne({ _id: followerId });
    if (!followerProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    const followeeProfile = await Profile.findOne({ _id: followeeId });
    if (!followeeProfile) {
      const err = createError(404, "Profile doesn't exists!");
      next(err);
      return;
    }

    const followeeIndex =
      followerProfile?.followerRequests?.indexOf(followeeId);
    if (followeeIndex > -1) {
      followerProfile?.followerRequests?.splice(followeeIndex, 1);
    }

    const followerIndex =
      followeeProfile?.followingRequests?.indexOf(followerId);
    if (followeeIndex > -1) {
      followeeProfile?.followingRequests?.splice(followerIndex, 1);
    }

    await Profile.findByIdAndUpdate(
      followerProfile?._id,
      {
        followerRequests: followerProfile?.followerRequests,
      },
      { new: true }
    );

    await Profile.findByIdAndUpdate(
      followeeProfile?._id,
      {
        followingRequests: followeeProfile?.followerRequests,
      },
      { new: true }
    );

    res.status(200).send("Follow request cancelled!");
  } catch (error) {
    const err = createError(500, error.message);
    next(err);
  }
};

module.exports = {
  addProfile,
  sendFollowRequest,
  sendUnfollowRequest,
  acceptFollowRequest,
  cancelFollowRequest,
};
