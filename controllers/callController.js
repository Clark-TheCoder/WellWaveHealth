import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import {
  createCall,
  getCurrentCalls,
  updateCallStatus,
} from "../models/callModel.js";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
import { generatePatientAlias } from "../utils/generatePatientAlias.js";
import express from "express";

const createLink = async (req, res) => {
  const userId = req.user.id;

  const { firstname, dayOfBirth, email, phone } = req.body;
  const patientAlias = generatePatientAlias(firstname, dayOfBirth);

  const roomId = uuidv4();
  const accessToken = crypto.randomBytes(16).toString("hex");

  try {
    const link = `http://localhost:3000/join/${accessToken}`;

    if (email) {
      const sentEmail = await emailCallLink(email, link);
      if (!sentEmail || sentEmail.error) {
        return res.status(500).json({
          message: "Link failed to send to this email address",
        });
      }
    }
    const newLink = await createCall(roomId, userId, patientAlias, accessToken);
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

async function changeCallStatus(req, res) {
  const { updatedStatus, callAccessToken } = req.body;

  console.log("Received status value:", updatedStatus);

  if (!updatedStatus || !callAccessToken) {
    return res.status(400).json({ message: "Missing value in request body." });
  }
  const updatedCall = await updateCallStatus(callAccessToken, updatedStatus);
  if (!updatedCall) {
    return res.status(400).json({ message: "Could not find call" });
  }
  return res
    .status(200)
    .json({ message: "Great Success!", newCallStatus: updatedStatus });
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

export { createLink, changeCallStatus, fetchCurrentCalls };
