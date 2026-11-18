/* Jiya Tours & Travels: change this one number before publishing.
   Use country code +91, without + or spaces. Example: 919876543210 */
const OWNER_WHATSAPP = "919801483637";

const $ = id => document.getElementById(id);
const tabs = document.querySelectorAll('.tab');
const tripType = $('tripType');
const form = $('bookingForm');
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth()+1).padStart(2,'0');
const dd = String(today.getDate()).padStart(2,'0');
$('date').min = `${yyyy}-${mm}-${dd}`;
$('year').textContent = yyyy;

function waUrl(message){ return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`; }
function basicQuoteMessage(){
  return `Hello Jiya Tours & Travels, I would like to request a cab quotation.\n\nPlease share the best available fare and vehicle option.\n\nThank you.`;
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  tripType.value = tab.dataset.trip;
}));

document.querySelectorAll('[data-quote]').forEach(el => el.addEventListener('click', () => {
  // Scroll to the booking form; the customer can fill details before sending.
  setTimeout(() => $('name').focus(), 350);
}));

form.addEventListener('submit', e => {
  e.preventDefault();
  if(!form.checkValidity()){ form.reportValidity(); return; }
  const message = `🚕 *New Cab Booking / Quote Request*\n\n` +
    `*Trip Type:* ${tripType.value}\n` +
    `*Pickup:* ${$('pickup').value.trim()}\n` +
    `*Drop:* ${$('drop').value.trim()}\n` +
    `*Date:* ${$('date').value}\n` +
    `*Time:* ${$('time').value}\n` +
    `*Cab Type:* ${$('cab').value}\n` +
    `*Passengers:* ${$('passengers').value}\n` +
    `*Name:* ${$('name').value.trim()}\n` +
    `*Mobile:* ${$('phone').value.trim()}\n` +
    `*Special Requirement:* ${$('notes').value.trim() || 'None'}\n\n` +
    `Please share the best quotation and availability.`;
  window.open(waUrl(message), '_blank', 'noopener');
});

$('navWhatsapp').addEventListener('click', e => { e.preventDefault(); window.location.hash='booking'; });
$('bottomWhatsapp').addEventListener('click', e => { e.preventDefault(); window.location.hash='booking'; setTimeout(() => $('pickup').focus(), 350); });
