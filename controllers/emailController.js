const sendEmail = async (req, res) => {
  try {
    const sentMessage = await req.nylas.messages.send({
      identifier: process.env.USER_GRANT_ID,
      requestBody: {
        to: [{ name: "Name", email: process.env.EMAIL }],
        replyTo: [{ name: "Name", email: process.env.EMAIL }],
        subject: "Your Subject Here",
        body: "Your email body here.",
      },
    });

    res.json(sentMessage);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

const getRecentEmails = async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 5, 50);

  try {
    const identifier = process.env.USER_GRANT_ID;
    const messages = await req.nylas.messages.list({
      identifier,
      queryParams: {
        limit,
      },
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
};

export { sendEmail, getRecentEmails };
