/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions, config} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";
import * as nodemailer from "nodemailer";

// Initialize Firebase Admin
initializeApp();

const db = getFirestore();
const auth = getAuth();

// Email configuration
const createTransporter = () => {
  const smtpConfig = config().smtp;
  if (!smtpConfig) {
    throw new Error("SMTP configuration not found");
  }
  
  return nodemailer.createTransporter({
    host: smtpConfig.host,
    port: parseInt(smtpConfig.port),
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });
};

// Types
interface BetaSignup {
  id?: string;
  email: string;
  name?: string;
  discord?: string;
  experience?: string;
  interests?: string[];
  timestamp: Date;
}

interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: Date;
}

interface NewsletterSubscription {
  id?: string;
  email: string;
  name?: string;
  timestamp: Date;
}

// Set global options for cost control and region
setGlobalOptions({
  maxInstances: 10,
  region: "us-east1", // Try a different region
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * Verifies Firebase Auth token from request headers
 * @param {any} req - The request object
 * @return {Promise<any>} The decoded token or null if invalid
 */
async function verifyAuthToken(req: any): Promise<any> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    logger.error("Token verification failed:", error);
    return null;
  }
}

// Beta Signup Function
export const betaSignup = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    const {email, name, discord, experience, interests} = req.body;

    // Basic validation
    if (!email || !email.includes("@")) {
      res.status(400).json({error: "Valid email is required"});
      return;
    }

    const docRef = await db.collection("beta-signups").add({
      email,
      name: name || "",
      discord: discord || "",
      experience: experience || "",
      interests: interests || [],
      timestamp: new Date(),
    });

    res.status(200).json({
      message: "Successfully joined the beta waitlist!",
      id: docRef.id,
    });
  } catch (error) {
    logger.error("Beta signup error:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Contact Form Function
export const contact = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    const {name, email, company, subject, message} = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      res.status(400).json({error: "All required fields must be filled"});
      return;
    }

    if (!email.includes("@")) {
      res.status(400).json({error: "Valid email is required"});
      return;
    }

    // Store message in database
    const docRef = await db.collection("contact-messages").add({
      name,
      email,
      company: company || "",
      subject,
      message,
      timestamp: new Date(),
    });

    // Send email notifications
    try {
      const transporter = createTransporter();
      const smtpConfig = config().smtp;
      
      if (!smtpConfig?.recipient_email) {
        throw new Error("Recipient email not configured");
      }

      // Email to company
      const companyEmailOptions = {
        from: smtpConfig.user,
        to: smtpConfig.recipient_email,
        subject: `New Contact Form Message: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        `,
      };

      // Confirmation email to user
      const userEmailOptions = {
        from: smtpConfig.user,
        to: email,
        subject: `Thank you for contacting Sybertnetics AI Solutions`,
        html: `
          <h2>Thank you for your message!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p>Best regards,<br>
          The Sybertnetics AI Solutions Team</p>
        `,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(companyEmailOptions),
        transporter.sendMail(userEmailOptions),
      ]);

      logger.info(`Contact form emails sent for message ID: ${docRef.id}`);

    } catch (emailError) {
      logger.error("Email sending failed:", emailError);
      // Don't fail the request if email fails - message is still stored
    }

    res.status(200).json({
      message: "Message sent successfully!",
      id: docRef.id,
    });
  } catch (error) {
    logger.error("Contact form error:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Get Beta Signups Function (Admin only)
export const getBetaSignups = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    // Check if user is authenticated
    const user = await verifyAuthToken(req);
    if (!user) {
      res.status(401).json({error: "Unauthorized"});
      return;
    }

    const querySnapshot = await db.collection("beta-signups")
      .orderBy("timestamp", "desc")
      .get();

    const signups: BetaSignup[] = [];
    querySnapshot.forEach((doc) => {
      signups.push({id: doc.id, ...doc.data()} as BetaSignup);
    });

    res.status(200).json({signups});
  } catch (error) {
    logger.error("Get beta signups error:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Get Contact Messages Function (Admin only)
export const getContactMessages = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    // Check if user is authenticated
    const user = await verifyAuthToken(req);
    if (!user) {
      res.status(401).json({error: "Unauthorized"});
      return;
    }

    const querySnapshot = await db.collection("contact-messages")
      .orderBy("timestamp", "desc")
      .get();

    const messages: ContactMessage[] = [];
    querySnapshot.forEach((doc) => {
      messages.push({id: doc.id, ...doc.data()} as ContactMessage);
    });

    res.status(200).json({messages});
  } catch (error) {
    logger.error("Get contact messages error:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Content Management Functions (Firestore-based)
export const getContent = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      res.status(401).json({error: "Unauthorized"});
      return;
    }

    const {path: pagePath} = req.query;
    if (!pagePath || typeof pagePath !== "string") {
      res.status(400).json({error: "Path parameter is required"});
      return;
    }

    const docRef = db.collection("page-content").doc(pagePath);
    const doc = await docRef.get();

    if (doc.exists) {
      res.status(200).json({content: doc.data()?.content || ""});
    } else {
      res.status(200).json({content: ""});
    }
  } catch (error) {
    logger.error("Error getting content:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

export const saveContent = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "PUT") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    const user = await verifyAuthToken(req);
    if (!user) {
      res.status(401).json({error: "Unauthorized"});
      return;
    }

    const {path: pagePath} = req.query;
    const {content} = req.body;

    if (!pagePath || typeof pagePath !== "string") {
      res.status(400).json({error: "Path parameter is required"});
      return;
    }

    if (!content) {
      res.status(400).json({error: "Content is required"});
      return;
    }

    await db.collection("page-content").doc(pagePath).set({
      content,
      lastModified: new Date(),
      modifiedBy: user.uid,
    });

    res.status(200).json({message: "Content saved successfully"});
  } catch (error) {
    logger.error("Error saving content:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Newsletter Signup Function
export const newsletterSignup = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    const {email, name} = req.body;

    // Basic validation
    if (!email || !email.includes("@")) {
      res.status(400).json({error: "Valid email is required"});
      return;
    }

    const docRef = await db.collection("newsletter-subscriptions").add({
      email,
      name: name || "",
      timestamp: new Date(),
    });

    res.status(200).json({
      message: "Successfully subscribed to newsletter!",
      id: docRef.id,
    });
  } catch (error) {
    logger.error("Newsletter signup error:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Get Newsletter Subscriptions Function (Admin only)
export const getNewsletterSubscriptions = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    // Check if user is authenticated
    const user = await verifyAuthToken(req);
    if (!user) {
      res.status(401).json({error: "Unauthorized"});
      return;
    }

    const querySnapshot = await db.collection("newsletter-subscriptions")
      .orderBy("timestamp", "desc")
      .get();

    const subscriptions: NewsletterSubscription[] = [];
    querySnapshot.forEach((doc) => {
      subscriptions.push({id: doc.id, ...doc.data()} as NewsletterSubscription);
    });

    res.status(200).json({subscriptions});
  } catch (error) {
    logger.error("Get newsletter subscriptions error:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Get Discord Member Count Function
export const getDiscordMemberCount = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    // Discord API endpoint to get guild (server) information
    const guildId = config().discord?.guild_id;
    const botToken = config().discord?.bot_token;

    if (!guildId || !botToken) {
      res.status(500).json({error: "Discord configuration missing"});
      return;
    }

    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
      headers: {
        "Authorization": `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    const guildData = await response.json();

    // Return both total members and approximate member count
    res.status(200).json({
      memberCount: guildData.approximate_member_count || 0,
      totalMembers: guildData.member_count || 0,
      onlineMembers: guildData.approximate_presence_count || 0,
    });
  } catch (error) {
    logger.error("Error fetching Discord member count:", error);
    res.status(500).json({error: "Failed to fetch Discord member count"});
  }
});

// Create Admin User Function (run once to set up admin)
export const createAdminUser = onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    const adminEmail = config().admin?.email;
    const adminPassword = config().admin?.password;

    if (!adminEmail || !adminPassword) {
      res.status(500).json({error: "Admin configuration missing"});
      return;
    }

    // Create user with email (using the username as email)
    const userRecord = await auth.createUser({
      email: `${adminEmail}@sybertnetics.com`,
      password: adminPassword,
      displayName: adminEmail,
    });

    // Set custom claims for admin role
    await auth.setCustomUserClaims(userRecord.uid, {
      admin: true,
      role: "admin",
    });

    res.status(200).json({
      message: "Admin user created successfully",
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error: any) {
    if (error.code === "auth/email-already-exists") {
      res.status(200).json({
        message: "Admin user already exists",
        email: `${config().admin?.email}@sybertnetics.com`,
      });
    } else {
      logger.error("Error creating admin user:", error);
      res.status(500).json({error: "Failed to create admin user"});
    }
  }
});
