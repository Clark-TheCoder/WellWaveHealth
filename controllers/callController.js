import { v4 as uuidv4 } from "uuid";

const createLink = async (req, res) => {
  try {
    const providerId = req.user.id;

    const roomId = uuidv4();
    const link = `http://localhost:3000/call/${roomId}`;

    return res.status(200).json({
      link: link,
      roomId: roomId,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to generate token at this time." });
  }
};

export { createLink };
