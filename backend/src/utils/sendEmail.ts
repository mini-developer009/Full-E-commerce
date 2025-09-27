import axios from 'axios';
import config from '../config';

// Brevo API key from config
const BREVO_API_KEY = config.brevo.api_key;

if (!BREVO_API_KEY) {
  throw new Error('Missing Brevo API Key in .env');
}

// ======== Types ========
interface EmailContact {
  email: string;
  name?: string;
}

export async function sendEmail(
  to: EmailContact[],
  subject: string,
  htmlContent: string,
  textContent?: string,
): Promise<void> {
  const endpoint = 'https://api.brevo.com/v3/smtp/email';

  const payload = {
    sender: {
      name: 'Inventory Team',
      email: 'jakuanultimate777@gmail.com',
    },
    to,
    subject,
    htmlContent,
    textContent: textContent || htmlContent.replace(/<[^>]+>/g, ''), // fallback text
  };

  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        'api-key': config.brevo.api_key,
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    if (error.response) {
    } else {
    }
  }
}
