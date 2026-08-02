// Shared contact endpoints.
//
// CTA buttons open WhatsApp with a prefilled message (English , it is read by
// the Coral Gables desk). Displayed phone numbers keep tel: so clicking a
// number still places a call.
//
// NOTE: confirm with the client which line has WhatsApp Business enabled ,
// this uses the Coral Gables office number as a placeholder.
export const PHONE = "+13054447401";
export const PHONE_DISPLAY = "305-444-7401";
export const TOLL_FREE = "+18887764678";
export const TOLL_FREE_DISPLAY = "1-888-776-4678";

const WHATSAPP_NUMBER = "13054447401";
const WHATSAPP_MESSAGE =
  "Hi Brandon Brokerage Group, I'm a licensed agent and I'd like to discuss a case.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// The Coral Gables line has no WhatsApp account yet, so CTAs fall back to tel:.
// Flip this to true once the client confirms a WhatsApp Business number.
export const WHATSAPP_ENABLED = false;
export const CTA_HREF = WHATSAPP_ENABLED ? WHATSAPP_URL : `tel:${PHONE}`;

// The group's real AI platform , the assistant entry points hand off here.
export const NETWORK_URL = "https://www.brandonlatamnetwork.com/";
