import { v4 as uuidv4 } from "uuid";
import crypto, { createSecretKey } from "crypto";
import {
  createCall,
  getCurrentCalls,
  updateCallStatus,
  updateCallNotes,
  retrieveCalls,
  retrieveCallNotes,
} from "../models/callModel.js";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
import { generatePatientAlias } from "../utils/generatePatientAlias.js";
import { formatDateQuery } from "../utils/formatDateQuery.js";

const createLink = async (req, res) => {
  const userId = req.user.id;

  const { firstname, dayOfBirth, email, phone } = req.body;
  const patientAlias = generatePatientAlias(firstname, dayOfBirth);

  const roomId = uuidv4();
  const access_token = crypto.randomBytes(16).toString("hex");

  try {
    const link = `http://localhost:3000/join/${access_token}`;

    if (email) {
      const sentEmail = await emailCallLink(email, link);
      if (!sentEmail || sentEmail.error) {
        return res.status(500).json({
          message: "Link failed to send to this email address",
        });
      }
    }
    const newLink = await createCall(
      roomId,
      userId,
      patientAlias,
      access_token
    );
    res.status(200).json({
      message: "Link generated successfully and sent to Patient",
      link: link,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Cannot generate link. Sign back in an try again." });
  }
};

const resend = new Resend(process.env.RESEND_API_KEY);
async function emailCallLink(patientEmail, link) {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: patientEmail,
      subject: "Your Virtual Appointment Link",
      html: `
        <p>Hello,</p>
        <p>Your secure video call link is below. Click the link to join:</p>
        <p><a href="${link}">${link}</a></p>
        <p>This link is private. Do not share it.</p>
      `,
    });

    return data;
  } catch (error) {
    console.error("Failed to send email via resend", error);
    return { error };
  }
}

async function addCallNotes(req, res) {
  const { access_token, visitStatus, summary, plan, notes } = req.body;
  const userId = req.user.id;

  if (!access_token || !visitStatus) {
    return res
      .status(400)
      .json({ error: "Access token and visit status are required." });
  }

  const formData = { summary, plan, notes };

  try {
    // Perform both updates
    const statusUpdated = await updateCallStatus(
      access_token,
      userId,
      visitStatus
    );
    const notesUpdated = await updateCallNotes(access_token, formData);

    if (!statusUpdated && !notesUpdated) {
      return res
        .status(400)
        .json({ error: "Failed to update status and notes." });
    }

    return res.status(200).json({
      message: "Visit summary and call status updated successfully.",
    });
  } catch (error) {
    console.error("Error updating call notes/status:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

async function getCallNotes(req, res) {
  const userId = req.user?.id;
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ message: "Cannot find call." });
  }

  try {
    const call = await retrieveCallNotes(access_token, userId);

    if (!call) {
      return res.status(404).json({ message: "Call not found." });
    }

    console.log(call.call_notes);
    return res
      .status(200)
      .json({ message: "Success", data: { notes: call.call_notes } });
  } catch (error) {
    console.error("Error retrieving call notes:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving notes." });
  }
}

async function changeCallStatus(req, res) {
  const { updatedStatus, access_token } = req.body;
  const userId = req.user.id;

  if (!updatedStatus || !access_token) {
    return res.status(400).json({ message: "Missing value in request body." });
  }
  const updatedCall = await updateCallStatus(
    access_token,
    userId,
    updatedStatus
  );
  if (!updatedCall) {
    return res.status(400).json({ message: "Could not find call" });
  }
  return res.status(200).json({ message: "Success" });
  //,newCallStatus: updatedStatus
}

async function fetchCurrentCalls(req, res) {
  const userId = req.user.id;

  try {
    const todaysCalls = await getCurrentCalls(userId);
    if (!todaysCalls) {
      res
        .status(200)
        .json({ message: "No calls have been created for today's date." });
    } else {
      res.status(200).json({ message: "Success", calls: todaysCalls });
    }
  } catch (error) {
    res.status(400).json({
      message: "Cannot get today's calls. Please sign back in and try again.",
    });
  }
}

async function fetchPastCalls(req, res) {
  const { year, month, day, status, alias } = req.body;
  if (!year && !month && !day && !status && !alias) {
    return res.status(400).json({ message: "No form data received" });
  }

  const filterCriteria = {};

  //add date if it exists and is in it's valid formats
  const date = {};
  if (year) date.year = year;
  if (month) date.month = month;
  if (day) date.day = day;
  const dateQueryParameters = formatDateQuery(date);
  if (dateQueryParameters) {
    if (dateQueryParameters.exactDate)
      filterCriteria.exactDate = dateQueryParameters.exactDate;
    if (dateQueryParameters.startRange)
      filterCriteria.startRange = dateQueryParameters.startRange;
    if (dateQueryParameters.endRange)
      filterCriteria.endRange = dateQueryParameters.endRange;
  }

  //add status if it exists and is valid
  let validStatus = [
    "completed",
    "no_show",
    "cancelled_by_provider",
    "cancelled_by_patient",
  ];
  if (status !== undefined && status !== "") {
    if (validStatus.includes(status)) {
      filterCriteria.status = status;
    } else {
      return res.status(400).json({ message: "Invalid Status." });
    }
  }
  //add alias if there is an alias
  if (alias) {
    filterCriteria.alias = alias;
  }

  try {
    const retrievedCalls = await retrieveCalls(filterCriteria);

    return res.status(200).json({
      calls: retrievedCalls || [],
      message:
        retrievedCalls.length > 0 ? "Calls Found" : "No matching calls found.",
    });
  } catch (error) {
    console.error("Error retrieving calls:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving calls." });
  }
}

async function joinCallAsDoctor(req, res) {
  const { access_token } = req.body;
  const userId = req.user.id;
  try {
    const updatedCallStatus = await updateCallStatus(
      access_token,
      userId,
      "in_progress"
    );
    if (updatedCallStatus) {
      return res.status(200).json({ message: "Call found." });
    } else {
      return res.status(400).json({ message: "Call not found." });
    }
  } catch (error) {
    return res.status(400).json({ message: "Failed to join call" });
  }
}

export {
  createLink,
  changeCallStatus,
  fetchCurrentCalls,
  fetchPastCalls,
  addCallNotes,
  joinCallAsDoctor,
  getCallNotes,
};
