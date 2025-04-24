const createLink = async (req, res) => {
  try {
    return res.status(200).json({ message: "Success" });
  } catch (error) {}
};

export { createLink };
