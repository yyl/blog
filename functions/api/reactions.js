export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
        return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const data = await env.REACTIONS.get(`reactions:${slug}`, 'json');
    const reactions = data || { likes: 0, dislikes: 0 };

    return new Response(JSON.stringify(reactions), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { slug, type, undo } = body;

    if (!slug || !['like', 'dislike'].includes(type)) {
        return new Response(
            JSON.stringify({ error: 'Invalid slug or type (must be "like" or "dislike")' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const key = `reactions:${slug}`;
    const data = await env.REACTIONS.get(key, 'json');
    const reactions = data || { likes: 0, dislikes: 0 };

    if (undo) {
        // Undo a previous reaction (decrement)
        if (type === 'like') {
            reactions.likes = Math.max(0, reactions.likes - 1);
        } else {
            reactions.dislikes = Math.max(0, reactions.dislikes - 1);
        }
    } else {
        if (type === 'like') {
            reactions.likes += 1;
        } else {
            reactions.dislikes += 1;
        }
    }

    await env.REACTIONS.put(key, JSON.stringify(reactions));

    return new Response(JSON.stringify(reactions), {
        headers: { 'Content-Type': 'application/json' },
    });
}
