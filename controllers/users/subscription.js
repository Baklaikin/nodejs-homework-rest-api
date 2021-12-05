const { User } = require("../../schemas/users");

const subscription = async (req, res) => {
  const { _id, subscription } = req.user;
  const newSubscription = req.body.subscription;

  const user = await User.findByIdAndUpdate(
    { _id: _id },
    { subscription: newSubscription }
  );

  const subscriptions = ["starter", "pro", "business"];

  if (!subscriptions.includes(newSubscription)) {
    res.status(200).json({
      status: "success",
      code: 200,
      messsage: `Choose your subscription: ${subscriptions})`,
    });
  }

  if (subscription === newSubscription) {
    res.status(200).json({
      status: "success",
      code: 200,
      messsage: `Previous subscription (${subscription}) is equal to a new subscription (${newSubscription})`,
    });
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      messsage: `Subscription has changed to ${newSubscription}`,
    },
  });
};

module.exports = subscription;
