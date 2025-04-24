const createLink = async (req, res) => {
  try {
    const user = req.user;

    // Perform logic for creating the call
    console.log(user); // Example: user info decoded from the token

    res.status(200).json({ message: "Call created successfully!" });
  } catch (error) {}
};

export { createLink };
