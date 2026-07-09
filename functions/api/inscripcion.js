export async function onRequestPost({ request, env }) {
  const data = await request.json();
  const correo  = data.correo?.toString().trim();
  const alias   = data.alias?.toString().trim();
  const fetlife = data.fetlife?.toString().trim() || '—';

  if (!correo || !alias) {
    return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:     'Fragua47 <noreply@fragua47.org>',
      to:       'contacto@fragua47.org',
      reply_to: correo,
      subject:  `Inscripción evento · ${alias}`,
      text:     `Alias: ${alias}\nCorreo: ${correo}\nFetLife: ${fetlife}`,
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Error al enviar la inscripción' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
