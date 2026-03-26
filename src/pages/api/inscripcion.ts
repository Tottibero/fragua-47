import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const correo  = data.get('correo')?.toString().trim();
  const alias   = data.get('alias')?.toString().trim();
  const fetlife = data.get('fetlife')?.toString().trim() || '—';

  if (!correo || !alias) {
    return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from:     'Fragua47 <onboarding@resend.dev>',
    to:       'fragua47000@gmail.com',
    replyTo:  correo,
    subject:  `Inscripción evento · ${alias}`,
    text:     `Alias: ${alias}\nCorreo: ${correo}\nFetLife: ${fetlife}`,
  });

  if (error) {
    return new Response(JSON.stringify({ error: 'Error al enviar la inscripción' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
