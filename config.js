const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

module.exports = {
    // Required session ID for the bot to run
    SESSION_ID: process.env.SESSION_ID || "ඔයාගේ session-id එක මෙහි දැමිය යුතුය",

    // Auto status seen (true = automatically view status updates)
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",

    // Auto status react (true = automatically react to statuses)
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true"
};
