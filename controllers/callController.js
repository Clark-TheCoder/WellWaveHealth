import { v4 as uuidv4 } from "uuid";
import { createCall } from "../models/callModel.js";
import { generatePatientAlias } from "../utils/generatePatientAlias.js";

// const createLink = async (req, res) => {
//   try {
//     const { patientFirstname, patientDayOfBirth } = req.body;

//     const providerId = req.user.id;
//     const alias = generatePatientAlias;
//     const roomId = uuidv4();
//     const link = `http://localhost:3000/call/${roomId}`;

//     const logCall = await createCall(roomId, providerId, alias);

//     return res.status(200).json({
//       link: link,
//       roomId: roomId,
//     });
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "Unable to generate token at this time." });
//   }
// };

const createLink = async (req, res) => {
  const userId = req.user.id;

  const { firstname, dayOfBirth } = req.body;
  const patientAlias = generatePatientAlias(firstname, dayOfBirth);

  const roomId = uuidv4();
  const link = `http://localhost:3000/call/${roomId}`;

  try {
    const newLink = await createCall(roomId, userId, patientAlias);
    res.status(200).json({ message: link });
  } catch (error) {
    res.status(400).json({ message: "Bad from the backend" });
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
