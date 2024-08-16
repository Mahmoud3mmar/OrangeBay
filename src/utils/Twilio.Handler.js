// import twilio from 'twilio';
// import { twilioConfig } from './Twilio.config.js';

// const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

// const sendConfirmationSMS = async (to, message) => {
//     try {
//         const messageInstance = await client.messages.create({
//             body: message,
//             from: twilioConfig.phoneNumber,
//             to: to
//         });
//         return messageInstance;
//     } catch (error) {
//         throw new Error(`Failed to send SMS: ${error.message}`);
//     }
// }

// export { sendConfirmationSMS }
