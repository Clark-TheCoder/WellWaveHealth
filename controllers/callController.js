import { v4 as uuidv4 } from "uuid";
import { createCall } from "../models/callModel.js";
import { generatePatientAlias } from "../utils/generatePatientAlias.js";

const createLink = async (req, res) => {
  const userId = req.user.id;

  const { firstname, dayOfBirth } = req.body;
  const patientAlias = generatePatientAlias(firstname, dayOfBirth);

  const roomId = uuidv4();
  const link = `http://localhost:3000/call/${roomId}`;

  try {
    const newLink = await createCall(roomId, userId, patientAlias);
    res.status(200).json({ link });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Cannot generate link. Sign back in an try again." });
  }
};

const contactPatient = async (req, res) => {
  try {
    const { phoneNumber, email } = req.body;
  } catch (error) {
    return res.status(400).json({ message: "Cannot message user" });
  }
};

export { createLink, contactPatient };
